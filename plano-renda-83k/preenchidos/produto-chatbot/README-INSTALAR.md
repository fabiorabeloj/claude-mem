# Chatbot com IA real — como rodar (10 minutos)

Este é o **produto que você entrega ao cliente**: um chatbot com IA de verdade (Claude), que responde qualquer pergunta com base nas informações do negócio — sem roteiro fixo. Para atender outro cliente, você só troca o arquivo `negocio.md`.

## Rodar no seu computador

1. **Instale o Node.js** (versão 20+): https://nodejs.org → botão verde "LTS".
2. **Pegue sua chave da API da Anthropic:** crie conta em https://console.anthropic.com → API Keys → Create Key. (Precisa adicionar um cartão; veja custos abaixo.)
3. **No terminal, dentro desta pasta:**

```bash
npm install
```

4. **Inicie o servidor com a sua chave:**

```bash
# Mac/Linux:
ANTHROPIC_API_KEY=sk-ant-SUACHAVE node server.js

# Windows (PowerShell):
$env:ANTHROPIC_API_KEY="sk-ant-SUACHAVE"; node server.js
```

5. Abra **http://localhost:3000** e converse. É IA real, e o cliente exemplo é **o seu próprio negócio**: o bot explica seus serviços, seus preços e agenda a conversa de 15 min coletando nome + WhatsApp. Pergunte qualquer coisa — inclusive fora do roteiro — e veja como ele conduz.

## Trocar para o negócio de um cliente

Edite **apenas** o `negocio.md` (nome, serviços, preços, horários, regras) e reinicie o servidor. Pronto — é assim que a mesma base vira entrega para qualquer cliente.

## Custos da IA (o que embutir na mensalidade)

- O padrão usa o modelo de máxima qualidade (`claude-opus-4-8`). Uma conversa típica de atendimento custa alguns centavos de dólar.
- Para custo mínimo, rode com `MODEL=claude-haiku-4-5` (mais que suficiente para FAQ + agendamento; ~5x mais barato).
- Regra prática de precificação: estime o nº de conversas/mês do cliente, calcule o custo e **embuta com folga de 3x na mensalidade** (R$ 300+/mês cobre com sobra um negócio pequeno).

## Colocar no ar para o cliente (deploy)

Railway (railway.app) ou Render (render.com) — planos gratuitos/baratos:

1. Suba esta pasta num repositório GitHub (privado)
2. No Railway: New Project → Deploy from GitHub → selecione o repo
3. Em Variables, adicione `ANTHROPIC_API_KEY` (e `MODEL`, se quiser)
4. Deploy → você recebe uma URL pública para embutir no site do cliente (iframe ou link)

## Limites desta versão (evolução cobrada à parte)

- **WhatsApp de verdade:** esta versão roda no site. Conectar ao número de WhatsApp do cliente exige a API oficial do WhatsApp (Meta) ou um provedor (Z-API, Twilio) — é o upgrade natural do projeto, cobrado como fase 2.
- **Memória entre reinícios:** o histórico das conversas vive em memória; reiniciou, zerou. Suficiente para começar; banco de dados entra na fase 2.
- **Painel do cliente:** relatório de conversas/leads é outro upgrade vendável.

## Conectar ao seu site (depois do deploy)

Com o bot no ar (Railway/Render), adicione um botão "🤖 Fale com meu assistente de IA" no `site-fabio/index.html` apontando para a URL pública do bot. Assim todo visitante do seu site vive a demonstração sozinho — o site vende, o bot atende, e os dois provam o produto.

## Roteiro de demonstração na call de venda

1. Abra o chat e diga: *"conversa com ele — esse é o assistente que atende o MEU negócio"*
2. Deixe o dono do negócio testar — inclusive pegadinhas (o bot não inventa; encaminha para humano)
3. Mostre o `negocio.md`: *"tudo que ele sabe está neste arquivo — no seu caso, serão as SUAS informações"*
4. Feche com: *"em 2 semanas, um igual a esse está respondendo os seus clientes"*
