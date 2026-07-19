// Chatbot de atendimento com IA real (Claude) — servidor completo.
// Uso: ANTHROPIC_API_KEY=sk-... node server.js  → abre http://localhost:3000
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
// claude-opus-4-8 = máxima qualidade. Para reduzir custo por conversa,
// rode com MODEL=claude-haiku-4-5 (suficiente para FAQ/agendamento simples).
const MODEL = process.env.MODEL || "claude-opus-4-8";

const client = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente

const negocio = fs.readFileSync(path.join(__dirname, "negocio.md"), "utf-8");

const SYSTEM = `Você é o assistente virtual de atendimento do negócio descrito abaixo.

REGRAS:
- Responda SOMENTE com base nas informações do negócio abaixo. Se a informação não estiver lá, diga que vai passar a pergunta para a equipe humana, que responde no horário comercial — e ofereça ajudar com o que você sabe (agendamento, preços, horários, endereço).
- Nunca invente preços, serviços, horários ou promoções.
- Estilo WhatsApp: mensagens curtas (no máximo ~4 linhas), tom simpático e natural em português brasileiro, no máximo 1 emoji por mensagem.
- Seu objetivo principal é converter a conversa em agendamento/contato: sempre que fizer sentido, conduza para coletar nome, telefone e preferência de horário.
- Quando o cliente fornecer nome e telefone, confirme os dados repetindo-os e diga que a equipe confirmará em seguida.
- Siga à risca a seção "O que o bot NUNCA deve fazer".

INFORMAÇÕES DO NEGÓCIO:
${negocio}`;

// Histórico por sessão, em memória (suficiente para demo e clientes pequenos).
const sessions = new Map();
const MAX_TURNS = 30;

async function chat(sessionId, userText) {
  const history = sessions.get(sessionId) ?? [];
  history.push({ role: "user", content: userText });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1000,
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: history,
  });

  const reply = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim() || "Um momento, vou passar você para a nossa equipe. 🙂";

  history.push({ role: "assistant", content: reply });
  sessions.set(sessionId, history.slice(-MAX_TURNS * 2));
  return reply;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 100_000) reject(new Error("payload too large"));
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(path.join(__dirname, "public", "index.html")));
    return;
  }

  if (req.method === "POST" && req.url === "/chat") {
    try {
      const { sessionId, message } = JSON.parse(await readBody(req));
      if (!sessionId || typeof message !== "string" || !message.trim()) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "sessionId e message são obrigatórios" }));
        return;
      }
      const reply = await chat(sessionId, message.trim().slice(0, 2000));
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ reply }));
    } catch (error) {
      let status = 500;
      let msg = "Tivemos uma instabilidade. Tente de novo em instantes.";
      if (
        error instanceof Anthropic.AuthenticationError ||
        /authentication method/i.test(error?.message ?? "")
      ) {
        status = 500;
        msg = "Configuração pendente: ANTHROPIC_API_KEY inválida ou ausente.";
        console.error("ERRO DE CHAVE: defina ANTHROPIC_API_KEY corretamente.");
      } else if (error instanceof Anthropic.RateLimitError) {
        status = 503;
        msg = "Estamos com muitas conversas agora. Tente de novo em 1 minuto.";
      } else if (error instanceof Anthropic.APIError) {
        console.error(`Erro da API (${error.status}):`, error.message);
      } else {
        console.error("Erro:", error);
      }
      res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ reply: msg }));
    }
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Não encontrado");
});

server.listen(PORT, () => {
  console.log(`✅ Chatbot no ar: http://localhost:${PORT}`);
  console.log(`   Modelo: ${MODEL}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("⚠️  ANTHROPIC_API_KEY não definida — o chat vai falhar até você configurá-la.");
  }
});
