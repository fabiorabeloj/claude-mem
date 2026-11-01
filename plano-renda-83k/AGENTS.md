# AGENTS.md — briefing para agentes de IA (Codex, Claude, etc.)

Se você é um agente de IA trabalhando neste diretório, leia isto antes de qualquer coisa.

## O que é isto

Este diretório (`plano-renda-83k/`) NÃO faz parte do plugin claude-mem (o restante do repositório). É o **workspace de negócio do dono do fork**: o projeto completo da **Facility SaaS** — uma micro-agência de automação com IA para pequenos e médios negócios (Brasil e EUA), operada por uma única pessoa (Fabio) com apoio de agentes de IA, sob uma marca **sem rosto** (o dono não aparece publicamente; a marca fala por si).

**Objetivo do projeto:** renda de R$ 83 mil/mês. Trajetória honesta planejada: R$ 15–25 mil/mês ao fim do ano 1 (Jul/2027), meta cheia entre o mês 30 e 42. Sem promessas de enriquecimento rápido — este projeto rejeita explicitamente o estilo "guru de infoproduto".

## Estado atual (resumo executivo)

- **Construído e testado:** site institucional, chatbot com IA real (Claude API) com captura de leads + painel + conector WhatsApp (Z-API), demo de vendas, isca em PDF, sistema de personas, plano anual adaptativo, operação formalizada.
- **Pendente (ações humanas do dono):** publicar site/bot, abrir CNPJ (contador da família), revisar contrato (mãe advogada), primeira lista de prospecção.
- **Nenhum cliente PAGANTE ainda** — mas existe um em fechamento: o **Colégio Pietra (E1)**, aprovado internamente, P0 global da operação. Não escreva casos, números de clientes ou depoimentos — ainda não existem. Isso é regra, não detalhe.
- **Existe um sistema irmão fora deste repositório:** o **FabioOS** (vault local no PC do dono, `Desktop/FabioOs/`), com projetos próprios (Colégio Pietra, Escola, PRIMUS, triagem n8n) e documentos canônicos (`60_Sistemas/FabioOS/STATUS.md`, `NEXT_ACTIONS.md`). Este diretório e o FabioOS são complementares — não duplique nem contradiga o que estiver canônico lá.

## Mapa do diretório

| Caminho | O que é |
|---|---|
| `README.md` | Guia mestre com ordem de leitura |
| `01–09*.md` | Modelos universais de venda (posicionamento, outreach, proposta, preços, follow-up, conteúdo, currículo, pipeline, diversificação) |
| `preenchidos/` | Versões preenchidas e específicas da Facility SaaS |
| `preenchidos/site-fabio/` | Site institucional (HTML único, estático; nome da pasta é legado — a marca é Facility SaaS) |
| `preenchidos/produto-chatbot/` | **O produto principal**: servidor Node 20+ (`server.js`) com Claude API, ferramenta `registrar_lead`, persistência em `data/`, painel `/admin?token=`, webhook Z-API. Rodar: `npm install && ANTHROPIC_API_KEY=... ADMIN_TOKEN=... node server.js`. `negocio.md` é o único arquivo que muda por cliente. |
| `preenchidos/demos/` | Demo de venda (chat roteirizado, sem API) |
| `preenchidos/isca/` | PDF gratuito de captação + script gerador (`python3 gerar-isca.py`, reportlab) |
| `preenchidos/personas-ia.md` | 8 personas de IA com prompts (PROSPECTA, FECHA, CONTEÚDO, etc.) — se te pedirem para "ser" uma delas, use o prompt correspondente |
| `preenchidos/plano-anual-adaptativo.md` | Plano Ago/26–Jul/27 com regras SE→ENTÃO e painel mensal |
| `preenchidos/operacao-formalizada.md` | CNPJ, impostos, contrato padrão, 8 formas de lucro com etapas |
| `preenchidos/plano-visual.html` | Painel de uma página com a visão geral |

## Regras que você DEVE seguir ao editar qualquer coisa aqui

1. **Honestidade absoluta em material público:** nunca inventar depoimentos, casos, números de clientes ou credenciais. O bot/personas nunca fingem ser humanos quando perguntados.
2. **Marca sem rosto:** todo material voltado a cliente fala como "Facility SaaS" (nós/a gente), nunca em nome pessoal do dono. O nome "Fabio" não aparece em material público.
3. **Preços — fonte da verdade:** `04-precificacao.md` (estágio 1: sites R$ 1.200–5.000, chatbots R$ 1.500–6.000, automações R$ 1.500–8.000; mensalidades Essencial R$ 197–397 / Operação R$ 497–997 / Completa R$ 1.500–3.000). Se alterar preços, altere também `preenchidos/produto-chatbot/negocio.md` e o site.
4. **Idioma:** PT-BR em tudo, exceto material do canal US (persona GRINGA), que é em inglês.
5. **Não tocar** no restante do repositório (plugin claude-mem) por causa deste projeto — os dois não se misturam.
6. **Automação existente em outra sessão:** há uma revisão mensal agendada numa sessão do Claude (todo dia 1º) que atualiza o plano anual e um monitoramento do PR #1. Não duplique essas automações.
7. **Branch de trabalho:** `claude/plano-renda-83mil-tup82e` (PR #1, draft). Commits pequenos e descritivos em PT.

## Como testar o chatbot (obrigatório antes de commitar mudanças nele)

```bash
cd preenchidos/produto-chatbot
node --check server.js
ADMIN_TOKEN=teste node server.js &   # sobe mesmo sem ANTHROPIC_API_KEY
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/     # espera 200
curl -s http://localhost:3000/leads                                # espera 401
curl -s "http://localhost:3000/leads?token=teste"                  # espera {"total":0,...}
```

## O espírito do projeto (para decisões ambíguas)

Preparação está completa; o gargalo é execução humana no mundo real. Na dúvida entre "criar mais um documento" e "tornar algo existente mais executável/testado", escolha a segunda. Na dúvida entre uma promessa maior e uma verificável, escolha a verificável.
