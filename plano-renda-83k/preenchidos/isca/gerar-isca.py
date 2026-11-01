# Gera o PDF da isca gratuita da Facility SaaS.
# Uso: python3 gerar-isca.py  →  isca-facility-saas.pdf
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak,
)

BG = HexColor("#0b1220")
CARD = HexColor("#141e33")
TX = HexColor("#e8edf5")
MUT = HexColor("#9fb0c7")
AC = HexColor("#3ea6ff")
AC2 = HexColor("#7cf5c8")

W, H = A4

def fundo(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(MUT)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(18 * mm, 12 * mm, "Facility SaaS · Automação com IA para negócios")
    canvas.drawRightString(W - 18 * mm, 12 * mm, f"{doc.page}")
    canvas.setStrokeColor(AC)
    canvas.setLineWidth(2)
    canvas.line(18 * mm, H - 14 * mm, 40 * mm, H - 14 * mm)
    canvas.restoreState()

def capa(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(AC)
    canvas.setFont("Helvetica-Bold", 13)
    canvas.drawString(20 * mm, H - 40 * mm, "FACILITY SAAS")
    canvas.setFillColor(MUT)
    canvas.setFont("Helvetica", 10)
    canvas.drawString(20 * mm, H - 46 * mm, "GUIA PRÁTICO · GRATUITO")
    canvas.setFillColor(TX)
    canvas.setFont("Helvetica-Bold", 34)
    y = H - 80 * mm
    for linha in ["7 tarefas que seu", "negócio pode", "automatizar com IA", "esta semana"]:
        canvas.drawString(20 * mm, y, linha)
        y -= 14 * mm
    canvas.setFillColor(AC2)
    canvas.setFont("Helvetica", 13)
    canvas.drawString(20 * mm, y - 4 * mm, "Sem programar nada. Sem projeto gigante.")
    canvas.drawString(20 * mm, y - 11 * mm, "Cada tarefa: o que é, como automatizar hoje e quanto tempo devolve.")
    canvas.setFillColor(MUT)
    canvas.setFont("Helvetica", 10)
    canvas.drawString(20 * mm, 24 * mm, "facilitysaas · WhatsApp (11) 98212-3896")
    canvas.restoreState()

est_titulo = ParagraphStyle("t", fontName="Helvetica-Bold", fontSize=20, leading=25, textColor=TX, spaceAfter=6)
est_num = ParagraphStyle("n", fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=AC, spaceAfter=2)
est_sub = ParagraphStyle("s", fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=AC2, spaceBefore=10, spaceAfter=3)
est_corpo = ParagraphStyle("c", fontName="Helvetica", fontSize=10.5, leading=15.5, textColor=TX)
est_mut = ParagraphStyle("m", fontName="Helvetica", fontSize=10.5, leading=15.5, textColor=MUT)

TAREFAS = [
    ("TAREFA 1", "Responder as mesmas perguntas todo dia",
     "“Qual o horário?”, “quanto custa?”, “vocês atendem sábado?” — 70% das mensagens que seu negócio recebe são variações das mesmas 15 perguntas. Alguém do time para o que está fazendo para digitar a mesma resposta pela milésima vez.",
     "Abra o WhatsApp Business → Ferramentas comerciais → Respostas rápidas. Cadastre suas 10 perguntas mais comuns com atalhos (ex.: digitar /preço puxa a resposta pronta). Custo: zero. Tempo de configurar: 30 minutos.",
     "Um atendente de IA responde TODAS as variações dessas perguntas sozinho, 24h, com naturalidade — e ainda coleta nome e telefone de quem quer comprar. As respostas rápidas exigem um humano apertando o atalho; a IA não.",
     "1 a 2 horas por dia do seu atendimento"),
    ("TAREFA 2", "Confirmar horários e reduzir os furos de agenda",
     "Cliente que marca e não aparece custa caro: o horário fica vazio e você não vende duas vezes. A maioria dos furos acontece porque ninguém lembrou o cliente na véspera.",
     "Google Agenda com convite por e-mail já envia lembrete automático. Para WhatsApp, crie uma mensagem padrão de confirmação e envie manualmente todo fim de tarde para os horários do dia seguinte (15 min/dia).",
     "Confirmação automática por WhatsApp na véspera + reagendamento na mesma conversa quando o cliente não pode. Clínicas que implantam isso reduzem faltas de forma perceptível já no primeiro mês.",
     "Cada furo evitado é venda que não se perdeu"),
    ("TAREFA 3", "Parar de digitar pedido/cadastro em planilha",
     "Pedido chega pelo WhatsApp, alguém copia para a planilha. Cliente novo chega, alguém digita o cadastro. Todo dia. Além do tempo, cada digitação manual é uma chance de erro.",
     "Crie um Google Forms para pedidos/cadastros e mande o link — as respostas caem sozinhas numa planilha organizada. Custo: zero. Tempo: 40 minutos para montar.",
     "A automação lê a conversa do WhatsApp e preenche a planilha/sistema sozinha — o cliente escreve como sempre escreveu, sem formulário, e o dado chega estruturado onde você precisa.",
     "30 a 60 minutos por dia de digitação"),
    ("TAREFA 4", "Saber como o negócio foi na semana (sem montar relatório)",
     "Quantos atendimentos? Quanto vendeu? Qual serviço mais saiu? Se responder isso exige abrir 3 lugares e somar na calculadora, você acaba decidindo no achismo.",
     "Reserve 20 min toda sexta e preencha uma planilha simples com 4 números da semana (vendas, atendimentos, novos clientes, faltas). Só o hábito de olhar já melhora as decisões.",
     "Relatório automático toda segunda de manhã no seu WhatsApp: os números da semana, comparação com a anterior e 1 destaque — gerado sozinho a partir dos seus dados.",
     "Decisão com número em vez de achismo"),
    ("TAREFA 5", "Cobrar sem constrangimento (e sem esquecer)",
     "Mensalidade atrasada, orçamento sem resposta, pagamento pendente. Cobrar manualmente é chato, então adia-se — e o caixa sente.",
     "Bancos PJ e ferramentas como Asaas enviam cobrança por Pix/boleto com lembrete automático antes e depois do vencimento. Configurar leva 1 hora e remove o constrangimento: quem cobra é o sistema.",
     "Régua completa: lembrete amigável antes de vencer, cobrança educada depois, aviso para você só quando precisa de decisão humana — no tom da sua marca.",
     "Menos inadimplência, zero saia justa"),
    ("TAREFA 6", "Responder avaliações e comentários (Google e Instagram)",
     "Avaliação no Google sem resposta afasta cliente novo — quem pesquisa lê tudo. Comentário e direct sem resposta é venda escapando. Mas ninguém tem tempo de responder um a um, todos os dias.",
     "Separe 15 min, 2x por semana, só para isso. Responda TODAS as avaliações (as boas agradecem, as ruins mostram profissionalismo para quem está lendo). Modelinho: agradecer + citar algo específico + convite para voltar.",
     "A IA rascunha as respostas no tom da sua marca para você só aprovar — e sinaliza qual comentário é lead querendo comprar (esses, você responde na hora).",
     "Reputação que trabalha por você no Google"),
    ("TAREFA 7", "Separar curioso de comprador no WhatsApp",
     "No meio de 50 conversas por dia, o cliente pronto para fechar fica esperando atrás de 49 curiosos. Quando você chega nele, esfriou — ou comprou do concorrente.",
     "Crie etiquetas no WhatsApp Business (Novo / Quente / Aguardando / Fechado) e etiquete toda conversa na hora. Ritual de 10 min por dia: responder primeiro os Quentes.",
     "O atendente de IA faz a triagem sozinho: responde todo mundo na hora, identifica intenção de compra e te entrega só os quentes, com nome, telefone e o que a pessoa quer. Você fala apenas com quem está pronto para fechar.",
     "Os quentes atendidos em minutos, não em horas"),
]

def pagina_tarefa(story, num, titulo, problema, diy, pro, ganho):
    story.append(Paragraph(num, est_num))
    story.append(Paragraph(titulo, est_titulo))
    story.append(Paragraph(problema, est_mut))
    story.append(Paragraph("FAÇA HOJE, SOZINHO (grátis):", est_sub))
    story.append(Paragraph(diy, est_corpo))
    story.append(Paragraph("NÍVEL AUTOMÁTICO (o que implantamos):", est_sub))
    story.append(Paragraph(pro, est_corpo))
    story.append(Paragraph("O QUE VOCÊ RECUPERA:", est_sub))
    story.append(Paragraph(ganho, est_corpo))
    story.append(PageBreak())

doc = BaseDocTemplate(
    "isca-facility-saas.pdf", pagesize=A4,
    leftMargin=20 * mm, rightMargin=20 * mm, topMargin=24 * mm, bottomMargin=22 * mm,
    title="7 tarefas que seu negócio pode automatizar com IA esta semana",
    author="Facility SaaS",
)
frame = Frame(20 * mm, 22 * mm, W - 40 * mm, H - 46 * mm, id="f")
doc.addPageTemplates([
    PageTemplate(id="capa", frames=[frame], onPage=capa),
    PageTemplate(id="conteudo", frames=[frame], onPage=fundo),
])

story = [Spacer(1, 1), PageBreak()]  # capa é toda desenhada no canvas

# Introdução
story.append(Paragraph("Antes de começar", est_titulo))
story.append(Paragraph(
    "Este guia é prático de propósito. Cada uma das 7 tarefas tem: o problema, um jeito de resolver "
    "HOJE, sozinho e de graça — e o “nível automático”, quando a IA passa a fazer o trabalho por você.", est_corpo))
story.append(Paragraph(
    "Regra honesta: as versões “faça hoje” funcionam de verdade e não custam nada. Use-as. "
    "O nível automático é para quando o tempo economizado valer mais que o investimento — "
    "e é exatamente isso que fazemos na Facility SaaS, com preço fechado combinado antes.", est_mut))
story.append(Paragraph("Como usar", est_sub))
story.append(Paragraph(
    "Escolha UMA tarefa — a que mais rouba tempo do seu dia — e implemente a versão gratuita esta semana. "
    "Uma tarefa automatizada e funcionando vale mais que sete começadas.", est_corpo))
story.append(PageBreak())

for t in TAREFAS:
    pagina_tarefa(story, *t)

# Fechamento
story.append(Paragraph("E agora?", est_titulo))
story.append(Paragraph(
    "Se você implementar UMA versão gratuita deste guia, já recupera horas do seu mês. "
    "Se quiser o nível automático — a IA trabalhando sozinha nas 7 frentes — a conversa é rápida:", est_corpo))
story.append(Paragraph("Conversa gratuita de 15 minutos", est_sub))
story.append(Paragraph(
    "Você conta qual tarefa mais toma tempo do seu negócio; dizemos na hora se dá para automatizar, "
    "quanto custa (preço fechado, a partir de R$ 1.200) e em quanto tempo fica pronto (1 a 3 semanas). "
    "Sem compromisso e sem tecniquês.", est_corpo))
story.append(Paragraph("WhatsApp: (11) 98212-3896", est_sub))
story.append(Paragraph(
    "Mande a palavra GUIA e diga qual das 7 tarefas você quer tirar da sua frente primeiro.", est_corpo))
story.append(Spacer(1, 10 * mm))
story.append(Paragraph(
    "Facility SaaS — automação com IA para pequenos e médios negócios. "
    "Atendimento em português e inglês. Preço fechado, entrega em semanas, suporte de verdade.", est_mut))

def escolhe_template(story):
    pass

doc.build(story)
print("OK: isca-facility-saas.pdf gerado")
