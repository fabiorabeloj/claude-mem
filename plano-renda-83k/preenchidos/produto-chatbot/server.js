// Chatbot de atendimento com IA real (Claude) — servidor completo da Facility SaaS.
// Uso: ANTHROPIC_API_KEY=sk-... ADMIN_TOKEN=umasenha node server.js
//  → chat:   http://localhost:3000
//  → leads:  http://localhost:3000/admin?token=umasenha
// WhatsApp real (opcional, via Z-API): defina ZAPI_URL e ZAPI_CLIENT_TOKEN (ver README).
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
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

const client = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente

// ---------- Persistência em disco (sobrevive a reinícios) ----------
const DATA = path.join(__dirname, "data");
const CONVERSAS = path.join(DATA, "conversas");
const LEADS = path.join(DATA, "leads.jsonl");
fs.mkdirSync(CONVERSAS, { recursive: true });

const somenteSeguro = (id) => String(id).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);

function carregarHistorico(sessionId) {
  const arq = path.join(CONVERSAS, somenteSeguro(sessionId) + ".json");
  try { return JSON.parse(fs.readFileSync(arq, "utf-8")); } catch { return []; }
}
function salvarHistorico(sessionId, historico) {
  const arq = path.join(CONVERSAS, somenteSeguro(sessionId) + ".json");
  fs.writeFileSync(arq, JSON.stringify(historico.slice(-60)));
}
function salvarLead(lead) {
  fs.appendFileSync(LEADS, JSON.stringify(lead) + "\n");
  console.log(`🎯 LEAD CAPTURADO: ${lead.nome} · ${lead.whatsapp} · ${lead.interesse}`);
}
function listarLeads() {
  try {
    return fs.readFileSync(LEADS, "utf-8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch { return []; }
}

// ---------- Prompt e ferramenta de captura de lead ----------
const negocio = fs.readFileSync(path.join(__dirname, "negocio.md"), "utf-8");

const SYSTEM = `Você é o assistente virtual de atendimento do negócio descrito abaixo.

REGRAS:
- Responda SOMENTE com base nas informações do negócio abaixo. Se a informação não estiver lá, diga que vai passar a pergunta para a equipe humana, que responde no horário comercial — e ofereça ajudar com o que você sabe (agendamento, preços, horários).
- Nunca invente preços, serviços, horários ou promoções.
- Estilo WhatsApp: mensagens curtas (no máximo ~4 linhas), tom simpático e natural em português brasileiro, no máximo 1 emoji por mensagem.
- Seu objetivo principal é converter a conversa em agendamento/contato: conduza para coletar nome, WhatsApp e o que a pessoa quer.
- ASSIM QUE tiver nome + WhatsApp do cliente, chame a ferramenta registrar_lead — sem anunciar que está registrando. Depois confirme os dados repetindo-os e diga que a equipe retorna em breve.
- Siga à risca a seção "O que o bot NUNCA deve fazer".

INFORMAÇÕES DO NEGÓCIO:
${negocio}`;

const FERRAMENTAS = [{
  name: "registrar_lead",
  description: "Registra um lead no painel da equipe. Chame assim que tiver nome e WhatsApp do cliente — mesmo que a conversa continue depois.",
  input_schema: {
    type: "object",
    properties: {
      nome: { type: "string", description: "Nome do cliente" },
      whatsapp: { type: "string", description: "WhatsApp/telefone informado pelo cliente" },
      interesse: { type: "string", description: "Resumo em 1 frase do que o cliente quer" },
    },
    required: ["nome", "whatsapp", "interesse"],
    additionalProperties: false,
  },
  strict: true,
}];

// ---------- Conversa (com loop de ferramentas) ----------
async function chat(sessionId, userText, canal = "site") {
  const historico = carregarHistorico(sessionId);
  historico.push({ role: "user", content: userText });

  let resposta = "";
  for (let volta = 0; volta < 4; volta++) {
    const r = await client.messages.create({
      model: MODEL,
      max_tokens: 1000,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      tools: FERRAMENTAS,
      messages: historico,
    });

    historico.push({ role: "assistant", content: r.content });
    resposta = r.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();

    if (r.stop_reason !== "tool_use") break;

    const resultados = [];
    for (const bloco of r.content) {
      if (bloco.type !== "tool_use") continue;
      if (bloco.name === "registrar_lead") {
        salvarLead({ ...bloco.input, canal, sessionId, quando: new Date().toISOString() });
        resultados.push({ type: "tool_result", tool_use_id: bloco.id, content: "Lead registrado com sucesso." });
      } else {
        resultados.push({ type: "tool_result", tool_use_id: bloco.id, content: "Ferramenta desconhecida.", is_error: true });
      }
    }
    historico.push({ role: "user", content: resultados });
  }

  salvarHistorico(sessionId, historico);
  return resposta || "Um momento, vou passar você para a nossa equipe. 🙂";
}

// ---------- WhatsApp real via Z-API (opcional) ----------
// Configure no Z-API o webhook "ao receber" apontando para  https://SEU-SERVIDOR/webhook/zapi
// e defina: ZAPI_URL=https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN
//           ZAPI_CLIENT_TOKEN=seu_client_token (header de segurança da conta)
async function responderWhatsApp(telefone, texto) {
  const res = await fetch(`${process.env.ZAPI_URL}/send-text`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "client-token": process.env.ZAPI_CLIENT_TOKEN ?? "",
    },
    body: JSON.stringify({ phone: telefone, message: texto }),
  });
  if (!res.ok) console.error("Z-API falhou:", res.status, await res.text().catch(() => ""));
}

// ---------- HTTP ----------
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => { data += c; if (data.length > 200_000) reject(new Error("payload grande")); });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}
const json = (res, status, obj) => {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
};
const autorizado = (url) => ADMIN_TOKEN && url.searchParams.get("token") === ADMIN_TOKEN;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(path.join(__dirname, "public", "index.html")));
    return;
  }

  // Painel de leads (HTML) e API de leads (JSON) — protegidos por token
  if (req.method === "GET" && (url.pathname === "/admin" || url.pathname === "/leads")) {
    if (!autorizado(url)) return json(res, 401, { error: "Acesso negado. Use ?token=SEU_ADMIN_TOKEN" });
    const leads = listarLeads().reverse();
    if (url.pathname === "/leads") return json(res, 200, { total: leads.length, leads });
    const linhas = leads.map((l) =>
      `<tr><td>${l.quando?.slice(0, 16).replace("T", " ") ?? ""}</td><td>${l.nome ?? ""}</td><td>${l.whatsapp ?? ""}</td><td>${l.interesse ?? ""}</td><td>${l.canal ?? ""}</td></tr>`).join("");
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><meta charset="utf-8"><title>Leads — Facility SaaS</title>
<style>body{font-family:system-ui;background:#0b1220;color:#e8edf5;padding:24px}h1{font-size:1.2rem}
table{border-collapse:collapse;width:100%;margin-top:14px}td,th{border-bottom:1px solid #2a3950;padding:8px;text-align:left;font-size:.9rem}
th{color:#3ea6ff;text-transform:uppercase;font-size:.75rem}</style>
<h1>🎯 Leads capturados (${leads.length})</h1>
<table><tr><th>Quando</th><th>Nome</th><th>WhatsApp</th><th>Interesse</th><th>Canal</th></tr>${linhas}</table>`);
    return;
  }

  if (req.method === "POST" && url.pathname === "/chat") {
    try {
      const { sessionId, message } = JSON.parse(await readBody(req));
      if (!sessionId || typeof message !== "string" || !message.trim()) {
        return json(res, 400, { error: "sessionId e message são obrigatórios" });
      }
      const reply = await chat(somenteSeguro(sessionId), message.trim().slice(0, 2000), "site");
      return json(res, 200, { reply });
    } catch (error) {
      return trataErro(res, error);
    }
  }

  // Webhook do WhatsApp (Z-API): responde no próprio WhatsApp do cliente
  if (req.method === "POST" && url.pathname === "/webhook/zapi") {
    try {
      const evento = JSON.parse(await readBody(req));
      const texto = evento?.text?.message;
      const telefone = evento?.phone;
      if (!texto || !telefone || evento?.fromMe) return json(res, 200, { ok: true, ignorado: true });
      json(res, 200, { ok: true }); // responde o webhook já; a IA processa em seguida
      const reply = await chat("wa-" + telefone, String(texto).slice(0, 2000), "whatsapp");
      if (process.env.ZAPI_URL) await responderWhatsApp(telefone, reply);
    } catch (error) {
      console.error("Webhook erro:", error?.message ?? error);
      if (!res.headersSent) json(res, 200, { ok: false });
    }
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Não encontrado");
});

function trataErro(res, error) {
  let status = 500;
  let msg = "Tivemos uma instabilidade. Tente de novo em instantes.";
  if (error instanceof Anthropic.AuthenticationError || /authentication method/i.test(error?.message ?? "")) {
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
  return json(res, status, { reply: msg });
}

server.listen(PORT, () => {
  console.log(`✅ Facility SaaS — bot no ar: http://localhost:${PORT}`);
  console.log(`   Modelo: ${MODEL}`);
  console.log(`   Painel de leads: http://localhost:${PORT}/admin?token=${ADMIN_TOKEN || "(defina ADMIN_TOKEN)"}`);
  console.log(`   WhatsApp (Z-API): ${process.env.ZAPI_URL ? "configurado" : "não configurado (opcional)"}`);
  if (!process.env.ANTHROPIC_API_KEY) console.warn("⚠️  ANTHROPIC_API_KEY não definida — o chat vai falhar até você configurá-la.");
});
