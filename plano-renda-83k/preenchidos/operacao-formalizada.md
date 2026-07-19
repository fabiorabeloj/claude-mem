# Operação Formalizada — todas as formas de lucro, todas as etapas

Este é o documento-mestre da operação: cada forma de lucro do plano, formalizada de ponta a ponta.

## Seus dois trunfos (advogada + contador na família)

Você tem de graça o que a maioria paga caro. Use com pedidos específicos:

**Para o contador da família (leva a Parte 1 e a linha do tempo da Parte 4):**
1. "Preciso abrir um CNPJ para prestar serviços de desenvolvimento de sites, automação e consultoria em TI. MEI cabe nessas atividades ou vou direto de ME no Simples? Quais CNAEs você usaria?"
2. "Qual o % real de imposto que devo reservar de cada recebimento no meu enquadramento?"
3. "Como configuro a emissão de NFS-e na minha cidade, e como emito nota de exportação de serviço quando atender cliente dos EUA (tem benefício fiscal nisso)?"
4. "A partir de que faturamento vale definir pró-labore e revisar o anexo do Simples?"

**Para sua mãe (leva o contrato da Parte 3):**
1. "Revisa e ajusta este modelo de contrato de prestação de serviços para eu usar como padrão? Meus projetos são de R$ 1.200 a 8.000, prazo de 1 a 3 semanas, pagamento 50/50."
2. "Me faz também o termo de 1 página da mensalidade (escopo mensal, cobrança recorrente, cancelamento com 30 dias)?"
3. "Aceite por e-mail/assinatura digital resolve nesses valores, ou você recomenda plataforma de assinatura?"

Com os dois, a formalização inteira (Partes 1 e 3) sai em poucos dias e custo ~zero.

---

# PARTE 1 — Formalização legal (fazer 1 vez, semana 1–2)

## Etapa 1.1 — Abrir o CNPJ

| Opção | Para quem | Limite/ano | Custo mensal aprox. |
|-------|-----------|-----------|---------------------|
| **MEI** | Só se sua atividade estiver na lista permitida do MEI (muitas atividades de TI/desenvolvimento **não** estão) | R$ 81 mil (~R$ 6,7 mil/mês) | ~R$ 75 fixo (DAS) |
| **ME no Simples Nacional** (recomendado) | Serviços de TI/desenvolvimento — é o enquadramento normal para o que você fará | R$ 4,8 milhões | 6%–15,5% do faturamento + contador |

**Recomendação prática:** vá direto de **ME no Simples Nacional** com um contador digital (Contabilizei, Agilize ou contador local — R$ 150–400/mês). Motivos: sua meta estoura o teto do MEI ainda no primeiro ano bom, e as atividades de desenvolvimento geralmente não são elegíveis a MEI de qualquer forma. O contador escolhe os CNAEs certos (desenvolvimento de sites/sistemas, suporte, consultoria em TI) e o anexo do Simples.

**Checklist da etapa:**
- [ ] Contratar contador digital (ele abre o CNPJ para você, geralmente grátis na adesão)
- [ ] CNPJ aberto com CNAEs de desenvolvimento/consultoria em TI
- [ ] Conta bancária PJ (Inter/Nubank/C6 PJ — grátis) — **nunca misturar com a conta pessoal**
- [ ] Emissor de NFS-e configurado na prefeitura (o contador faz)

## Etapa 1.2 — Receber dinheiro

| De quem | Como receber | Custo |
|---------|-------------|-------|
| Cliente BR | Pix na conta PJ (à vista) ou boleto/cartão via gateway (Asaas, InfinitePay, Stripe BR) para mensalidades | Pix: grátis · gateway: ~1–4% |
| Cliente US direto | Wise Business ou Husky (recebe em USD, converte com taxa boa) | ~1–2% |
| Cliente US via Upwork | A própria plataforma paga (desconta 10%) | 10% |

- [ ] Conta Wise ou Husky aberta (para o canal US)
- [ ] Gateway com cobrança recorrente configurado (Asaas é o mais simples para mensalidade por Pix/boleto)

## Etapa 1.3 — Rotina de dinheiro (regra fixa, todo recebimento)

```
100% entra na conta PJ →
  ├─ ~10–16% reservado para imposto (o contador te dá o % exato do seu anexo)
  ├─ 20% investido automaticamente (cesto 5 do 09-cestos-de-ovos.md)
  └─ o resto: pró-labore/salário para sua conta pessoal + caixa da empresa
```

- [ ] Transferência automática mensal configurada (investimento) 
- [ ] Nota fiscal emitida para TODO recebimento, sem exceção — é o que te deixa dormir tranquilo e permite atender empresa grande depois

---

# PARTE 2 — As formas de lucro, cada uma com todas as etapas

## Forma 1 — Sites profissionais (porta de entrada)

**Preço:** R$ 1.200–2.500 (início) → R$ 2.500–5.000 · **Detalhes:** `oferta-sites.md`

| # | Etapa | Ferramenta/modelo |
|---|-------|------------------|
| 1 | Prospectar (rede + negócios locais + Instagram de comércios) | `outreach-drafts.md` A e C |
| 2 | Call de 15 min — briefing de 7 perguntas | `oferta-sites.md` passo 1 |
| 3 | Proposta de 1 página com preço fechado (enviar em 24h) | `03` simplificado |
| 4 | Cliente aceita → contrato assinado + 50% de entrada | contrato da Parte 3 + Pix PJ |
| 5 | Produzir com IA + revisar tudo + publicar no ar | `oferta-sites.md` passos 2–3 |
| 6 | Call de entrega + 50% final + **oferecer mensalidade** | — |
| 7 | Emitir NFS-e | contador/prefeitura |
| 8 | Semana seguinte: pedir depoimento + case com número | vira arma do `posicionamento` |

## Forma 2 — Chatbots de atendimento (WhatsApp/site)

**Preço:** R$ 1.500–6.000 + custo de API repassado · mesmas 8 etapas da Forma 1, com estas diferenças:

- Etapa 2: a pergunta-chave é *"quais as 20 perguntas que seus clientes mais fazem?"* — esse material do cliente é 80% do chatbot
- Etapa 5: montar com a stack que você domina via vibecoding (Claude API + WhatsApp via API oficial/Z-API, ou plataformas como Chatwoot/Typebot) e **testar 1 semana em paralelo ao atendimento humano antes de virar oficial**
- Etapa 6: mensalidade aqui é quase obrigatória (R$ 300–1.500/mês — o bot precisa de ajuste contínuo) e inclui o custo de API com margem

## Forma 3 — Automação de processos internos

**Preço:** R$ 1.500–8.000 · mesmas 8 etapas, com estas diferenças:

- Etapa 2: pedir para GRAVAR a tela da pessoa fazendo a tarefa manual — o vídeo é a especificação
- Etapa 5: automatizar com o que for mais simples e manutenível (scripts + IA, n8n/Make quando couber); documentar num PDF de 1 página "o que faz e o que fazer se parar"
- Etapa 8: perguntar *"qual a próxima tarefa mais chata?"* — cliente de automação compra de novo

## Forma 4 — Mensalidades (a forma de lucro mais importante)

**Preço:** R$ 150–1.500/mês por cliente · **é ela que constrói a renda estável**

| # | Etapa |
|---|-------|
| 1 | Oferecer na entrega de TODO projeto (etapa 6 acima) — nunca esquecer |
| 2 | Escopo claro por escrito: o que inclui (hospedagem, ajustes até X h/mês, suporte por WhatsApp em horário comercial) e o que não inclui |
| 3 | Cobrança recorrente automática no gateway (Asaas) — nunca cobrar "na mão" |
| 4 | Rotina mensal de 30 min por cliente: verificar que tudo roda + 1 melhoria pequena + mensagem com o que foi feito (cliente que recebe relatório não cancela) |
| 5 | A cada 6 meses: revisar preço e oferecer upgrade (novo módulo, nova automação) |

**Conta:** 25 clientes × R$ 500 médio = R$ 12,5 mil/mês fixos. É o piso que paga suas contas enquanto os projetos variam.

## Forma 5 — Clientes US (mesmos serviços, em dólar)

**Preço:** US$ 500–2.500/projeto + US$ 50–300/mês · seu inglês fluente é o diferencial

| # | Etapa |
|---|-------|
| 1 | Perfil Upwork caprichado (bio EN do `posicionamento-draft.md`) + portfólio com o próprio site |
| 2 | 10 propostas/semana em jobs pequenos de AI chatbot/automation (`outreach-drafts.md` B) — preço competitivo até as 5 primeiras avaliações |
| 3 | Entregar rápido e comunicar demais (updates diários curtos — é o que gera 5 estrelas) |
| 4 | Avaliação 5★ + pedir trabalho recorrente ao mesmo cliente |
| 5 | Após 5–10 jobs: subir preço 30–50% e migrar melhores clientes para contrato direto (Wise, sem os 10% do Upwork) |
| 6 | Nota fiscal de exportação de serviço (o contador emite — geralmente com benefícios fiscais) |

## Forma 6 — Consultoria de maior porte (ativa no degrau 3, mês 18+)

**Preço:** R$ 8–80 mil/projeto · **pré-requisito:** 10+ casos documentados + fundamentos sólidos
Etapas completas já formalizadas nos modelos `02`, `03`, `04` (tabela estágio 2) e `05`. Não ativar antes do pré-requisito — proposta grande sem lastro quebra na entrega.

## Forma 7 — Agência (rota de escala do degrau 3, mês 18+)

Etapas: (1) padronizar entregas em playbooks (você já terá, são os arquivos deste kit) → (2) subcontratar 1 freelancer nos picos → (3) primeiro contratado fixo quando a agenda lotar 2 meses seguidos → (4) você vira vendedor/arquiteto; margem-alvo de 40–50%. Formalização: contrato de prestação de serviço com os freelancers + ajuste do CNPJ com o contador.

## Forma 8 — Investimentos (cesto 5 — lucro sobre o lucro)

Etapas: (1) 20% de todo recebimento, automático, no dia → (2) reserva de emergência primeiro (6 meses de custo) em CDB liquidez diária/Tesouro Selic → (3) depois, aporte mensal em carteira simples e diversificada → (4) nunca pausar o aporte para "investir no negócio" sem decisão consciente. Aos R$ 40 mil/mês de renda, são R$ 8 mil/mês virando patrimônio.

---

# PARTE 3 — Contrato padrão de prestação de serviços

Modelo mínimo para as Formas 1–3 (adapte; para valores altos ou cliente exigente, revisão de advogado — R$ 300–800 uma vez, reutiliza sempre):

```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATADA: [SUA EMPRESA LTDA], CNPJ [X], e-mail [X]
CONTRATANTE: [EMPRESA/NOME], CNPJ/CPF [X], e-mail [X]

1. OBJETO — Desenvolvimento e entrega de: [descrição exata do que será
   entregue, igual à proposta aceita, anexada a este contrato].
2. PRAZO — [N] dias corridos a partir do pagamento da entrada e do envio
   dos materiais listados na proposta pelo CONTRATANTE.
3. VALOR E PAGAMENTO — R$ [X], sendo 50% na assinatura e 50% na entrega,
   via Pix/transferência à conta PJ da CONTRATADA, com emissão de NFS-e.
4. ESCOPO — Inclui somente o descrito no item 1. Alterações e adições
   serão orçadas à parte. Até [2] rodadas de ajustes estão incluídas.
5. GARANTIA — [30] dias após a entrega para correção, sem custo, de
   defeitos no que foi entregue.
6. RESPONSABILIDADES DO CONTRATANTE — Fornecer materiais, acessos e
   aprovações em até [5] dias úteis quando solicitado; atrasos estendem
   o prazo na mesma medida.
7. PROPRIEDADE — Após a quitação, o que foi entregue pertence ao
   CONTRATANTE. Ferramentas, bibliotecas e conhecimentos gerais
   permanecem da CONTRATADA, que pode citar o projeto em portfólio
   (salvo pedido de confidencialidade por escrito).
8. CONFIDENCIALIDADE — As partes manterão sigilo sobre dados e
   informações internas uma da outra.
9. RESCISÃO — Qualquer parte pode rescindir com aviso de [15] dias;
   serviços executados até a data são devidos proporcionalmente.
10. FORO — Comarca de [SUA CIDADE/UF].

[Local, data] · Assinaturas (aceite por e-mail/assinatura digital vale)
```

Para a **mensalidade**, um termo de 1 página: escopo mensal (item 4 adaptado), valor, cobrança recorrente, cancelamento com 30 dias de aviso.

---

# PARTE 4 — Linha do tempo da formalização

| Quando | O quê |
|--------|-------|
| Semana 1 | Contratar contador digital · iniciar abertura do CNPJ · abrir conta PJ |
| Semana 2 | NFS-e configurada · gateway de cobrança · Wise/Upwork (canal US) |
| Primeiro fechamento | Contrato assinado + 50% antes de começar + NFS-e no recebimento — **desde o cliente nº 1** |
| Mês 3 | Revisar com o contador: enquadramento, pró-labore, % de imposto real |
| Mês 12 | Planejamento tributário do ano 2 (o faturamento crescendo muda o anexo/estratégia) |

**A regra que resume a operação inteira:** proposta por escrito → contrato assinado → entrada paga → entrega → nota fiscal → depoimento → mensalidade. Nenhum cliente, nem amigo, fora desse trilho — é o trilho que transforma "fazer uns trabalhos com IA" em empresa que chega a R$ 83 mil/mês.
