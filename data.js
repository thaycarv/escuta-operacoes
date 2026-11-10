// Base de dados operacional do RadarSocial Escuta
// Ouvidoria Ativa, Voz do Beneficiário (VoC/VoB) e Melhoria Contínua de Processos

export const initialCases = [
  {
    id: "ESC-101",
    channel: "WhatsApp do Polo",
    customer: "Marina Santos (Aluna)",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4021",
    rating: 2,
    text: "Cheguei para a aula do curso de TI e os computadores estavam sem energia e sem internet. Ninguém avisou antes e tivemos que esperar mais de 40 minutos.",
    type: "Reclamação",
    theme: "Infraestrutura e Conectividade",
    severity: "Moderada",
    status: "Em análise",
    time: "14:20",
    responseMinutes: 15,
    rootCause: "Pane pontual no quadro de disjuntores da sala 2 durante pico de calor com ar-condicionado sobrecarregado.",
    immediateAction: "Comutação emergencial para circuito reserva + aula prática estendida em 30 min.",
    contingencyCost: 45.00,
    history: [
      "14:20 · Manifestação recebida via WhatsApp do Polo Digital Norte",
      "14:35 · Triagem técnica identificou desarmamento de disjuntor de 30A",
      "14:40 · Eletricista de manutenção preventiva acionado para balancear a carga",
    ],
  },
  {
    id: "ESC-102",
    channel: "Ouvidoria Central",
    customer: "Rafael Torres (Cooperado)",
    unit: "Cooperativa Terra Viva",
    serviceCode: "AGR-1046",
    rating: 2,
    text: "A remessa de mudas e adubos para o plantio após o vendaval atrasou dois dias em relação ao cronograma pactuado, atrasando o preparo do solo.",
    type: "Reclamação",
    theme: "Logística e Suprimentos",
    severity: "Moderada",
    status: "Em análise",
    time: "10:15",
    responseMinutes: 28,
    rootCause: "Atraso no frete terceirizado da distribuidora agrícola devido a obras na rodovia de acesso.",
    immediateAction: "Remessa prioritária emergencial via caminhão da cooperativa local sem custos aos produtores.",
    contingencyCost: 120.00,
    history: [
      "10:15 · Relato registrado na Ouvidoria Central",
      "10:43 · Contato realizado com o setor de logística da Cooperativa Terra Viva",
      "11:00 · Plano de entrega emergencial acionado para regularizar os canteiros",
    ],
  },
  {
    id: "ESC-103",
    channel: "Balcão / Polo",
    customer: "Júlia Mendes (Mãe de aluno)",
    unit: "Cozinha Comunitária",
    serviceCode: "ALIM-2051",
    rating: 1,
    text: "Lote de pães artesanais distribuídos aos alunos da creche comunitária veio sem rótulo de alérgenos (glúten/leite), em desacordo com a RDC 727 da Anvisa.",
    type: "Incidente Crítico",
    theme: "Segurança Nutricional e Alérgenos",
    severity: "Crítica",
    status: "Aberto",
    time: "11:30",
    responseMinutes: 5,
    rootCause: "Impressora térmica de etiquetas da bancada de embalagem ficou sem bobina adesiva no turno da manhã.",
    immediateAction: "Recolhimento preventivo do lote pela Nutricionista Responsável Técnica e reetiquetagem imediata.",
    contingencyCost: 60.00,
    history: [
      "11:30 · Alerta sanitário registrado no balcão da Cozinha Comunitária",
      "11:35 · Intervenção imediata da Responsável Técnica (Nutricionista Thayâne Carvalho)",
      "11:45 · 100% das unidades inspecionadas e carimbadas com declaração de alérgenos",
    ],
  },
  {
    id: "ESC-104",
    channel: "WhatsApp do Polo",
    customer: "Bruno Alencar (Beneficiário)",
    unit: "Ateliê Comunitário",
    serviceCode: "EMP-3054",
    rating: 1,
    text: "Solicitei inscrição na turma noturna de costura para mães trabalhadoras há duas semanas e até agora não recebi retorno sobre vagas ou início.",
    type: "Reclamação",
    theme: "Planejamento e Matrícula",
    severity: "Alta",
    status: "Em análise",
    time: "16:40",
    responseMinutes: 35,
    rootCause: "Lista de espera mantida em planilha manual descentralizada sem sincronização com o banco central de alunos.",
    immediateAction: "Confirmação de matrícula imediata na turma piloto com envio de guia de boas-vindas.",
    contingencyCost: 0.00,
    history: [
      "16:40 · Reclamação recebida no canal WhatsApp",
      "17:15 · Coordenação de empreendedorismo localizou o cadastro e validou a vaga",
      "17:20 · Mensagem de confirmação de matrícula enviada ao beneficiário",
    ],
  },
  {
    id: "ESC-105",
    channel: "Balcão / Polo",
    customer: "Carlos Prado (Aluno)",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4031",
    rating: 3,
    text: "Faltou a apostila impressa do módulo de lógica de programação na minha bancada, mas o monitor do laboratório me emprestou uma cópia na hora.",
    type: "Solicitação",
    theme: "Equipamentos e Informática",
    severity: "Moderada",
    status: "Resolvido",
    time: "15:10",
    responseMinutes: 6,
    rootCause: "Lote impresso da gráfica entregue com 5 apostilas a menos do que o total de alunos matriculados.",
    immediateAction: "Impressão avulsa imediata na secretaria do polo e entrega em mãos.",
    contingencyCost: 15.00,
    history: [
      "15:10 · Ocorrência registrada no balcão do laboratório",
      "15:16 · Cópia adicional impressa e entregue ao aluno",
      "15:30 · Aluno confirmou resolução satisfatória",
    ],
  },
  {
    id: "ESC-106",
    channel: "WhatsApp do Polo",
    customer: "Renata Lemos (Aluna)",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4048",
    rating: 3,
    text: "O curso de formação digital é excelente, mas o ar-condicionado da sala 1 estava pingando água perto das tomadas dos computadores.",
    type: "Reclamação",
    theme: "Infraestrutura e Conectividade",
    severity: "Moderada",
    status: "Em análise",
    time: "16:20",
    responseMinutes: 20,
    rootCause: "Dreno do ar-condicionado obstruído por folhagem externa na calha do telhado.",
    immediateAction: "Isolamento das 3 tomadas próximas e desobstrução imediata do dreno pela equipe predial.",
    contingencyCost: 50.00,
    history: [
      "16:20 · Mensagem com foto enviada pela aluna",
      "16:40 · Manutenção predial realizou a limpeza do dreno",
      "17:00 · Circuito elétrico liberado com segurança",
    ],
  },
  {
    id: "ESC-107",
    channel: "Balcão / Polo",
    customer: "Paulo Nogueira (Conselheiro)",
    unit: "Cozinha Comunitária",
    serviceCode: "ALIM-2028",
    rating: 2,
    text: "A taxa social de manutenção da horta comunitária foi debitada duas vezes na conta da cooperativa por erro de sistema.",
    type: "Solicitação",
    theme: "Pagamento Social e Cobrança",
    severity: "Alta",
    status: "Resolvido",
    time: "12:45",
    responseMinutes: 12,
    rootCause: "Instabilidade na integração do terminal de recebimento durante oscilação de sinal 4G.",
    immediateAction: "Conferência de extrato da conta bancária do projeto e estorno imediato via PIX.",
    contingencyCost: 35.00,
    history: [
      "12:45 · Cobrança em duplicidade identificada no balcão",
      "12:57 · Comprovante conferido no extrato financeiro do projeto",
      "13:05 · Estorno de R$ 35,00 efetuado e comprovante enviado ao usuário",
    ],
  },
  {
    id: "ESC-108",
    channel: "WhatsApp do Polo",
    customer: "Ana Carolina (Mãe de aluna)",
    unit: "Cozinha Comunitária",
    serviceCode: "ALIM-2058",
    rating: 1,
    text: "Minha filha tem alergia alimentar severa a amendoim e nozes. Preciso confirmar formalmente se a sopa servida hoje tem risco de contaminação cruzada.",
    type: "Incidente Crítico",
    theme: "Segurança Nutricional e Alérgenos",
    severity: "Crítica",
    status: "Aberto",
    time: "11:55",
    responseMinutes: 2,
    rootCause: "Dúvida crítica de segurança alimentar e rotulagem preventiva (Anvisa RDC 727 / RDC 26).",
    immediateAction: "Contato telefônico imediato da Nutricionista confirmando ficha técnica sem risco de alérgenos.",
    contingencyCost: 0.00,
    history: [
      "11:55 · Sinal crítico de alérgeno identificado via WhatsApp",
      "11:57 · Nutricionista de plantão acionada com prioridade máxima",
      "12:00 · Ficha técnica do lote conferida: ausência de traços confirmada e mãe orientada",
    ],
  },
  {
    id: "ESC-109",
    channel: "Totem / QR Code",
    customer: "Diego Fonseca (Aluno)",
    unit: "Ateliê Comunitário",
    serviceCode: "EMP-3019",
    rating: 5,
    text: "Excelente oficina de corte e costura! As máquinas industriais estão bem reguladas e o acompanhamento técnico da instrutora foi nota 10.",
    type: "Elogio",
    theme: "Qualidade do Serviço",
    severity: "Informativa",
    status: "Resolvido",
    time: "17:15",
    responseMinutes: 45,
    rootCause: "Padrão de excelência na regulagem das máquinas e mentoria presencial de alta qualidade.",
    immediateAction: "Registro de depoimento para o relatório trimestral aos financiadores do RadarSocial.",
    contingencyCost: 0.00,
    history: [
      "17:15 · Elogio registrado no totem pós-oficina",
      "18:00 · Feedback repassado à instrutora e arquivado como evidência de impacto",
    ],
  },
  {
    id: "ESC-110",
    channel: "Totem / QR Code",
    customer: "Bianca Rocha (Voluntária)",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4038",
    rating: 4,
    text: "Seria excelente termos mais tomadas para carregamento de notebooks trazidos pelos próprios alunos nas oficinas avançadas.",
    type: "Sugestão",
    theme: "Infraestrutura e Conectividade",
    severity: "Baixa",
    status: "Resolvido",
    time: "18:10",
    responseMinutes: 50,
    rootCause: "Aumento da adesão de alunos trazendo computadores portáteis próprios (BYOD).",
    immediateAction: "Instalação de 2 réguas de tomada protegidas com filtro de linha na bancada lateral.",
    contingencyCost: 80.00,
    history: [
      "18:10 · Sugestão registrada no totem de saída",
      "19:00 · Filtros de linha instalados pela equipe predial",
    ],
  },
  {
    id: "ESC-111",
    channel: "WhatsApp do Polo",
    customer: "Marcos Vinicius (Líder comunitário)",
    unit: "Polo Digital Leste",
    serviceCode: "TI-4050",
    rating: 3,
    text: "Jovens que trabalham no comércio local só chegam após as 19h30 e não conseguem frequentar as turmas da tarde. A comunidade solicita uma turma noturna.",
    type: "Solicitação",
    theme: "Planejamento e Matrícula",
    severity: "Moderada",
    status: "Em análise",
    time: "18:30",
    responseMinutes: 25,
    rootCause: "Demanda não atendida de trabalhadores informais diurnos no bairro.",
    immediateAction: "Readequação da grade horária dos instrutores para abertura de turma das 20h às 21h30.",
    contingencyCost: 0.00,
    history: [
      "18:30 · Demanda formalizada pelo líder comunitário",
      "18:55 · Planejamento operacional acatou a solicitação para o próximo ciclo",
    ],
  },
  {
    id: "ESC-112",
    channel: "Ouvidoria Central",
    customer: "Felipe Gomes (Produtor)",
    unit: "Cooperativa Terra Viva",
    serviceCode: "AGR-1024",
    rating: 4,
    text: "Seria muito positivo receber aviso no WhatsApp na véspera da entrega dos insumos agrícolas para organizarmos a recepção comunitária.",
    type: "Sugestão",
    theme: "Logística e Suprimentos",
    severity: "Baixa",
    status: "Resolvido",
    time: "11:20",
    responseMinutes: 30,
    rootCause: "Falta de notificação preventiva automatizada no roteiro de despacho da cooperativa.",
    immediateAction: "Inclusão do número de WhatsApp na lista de transmissão com aviso automático 24h antes da saída do caminhão.",
    contingencyCost: 0.00,
    history: [
      "11:20 · Sugestão registrada na ouvidoria",
      "11:50 · Procedimento de aviso prévio de 24h ativado pela equipe de logística",
    ],
  },
];

export const initialActions = [
  {
    id: "AC-01",
    title: "Escalonamento de turmas por capacidade física",
    problem:
      "Atrasos no início das oficinas coincidem com picos de mais de 30 jovens simultâneos no Polo Digital Norte.",
    owner: "Coordenação Operacional",
    due: "25/11",
    status: "Em andamento",
    metric: "Tempo de espera inicial < 10 min e zero quedas de disjuntor",
  },
  {
    id: "AC-02",
    title: "Comunicação preventiva de logística de insumos",
    problem:
      "Agricultores e cooperativas só descobrem atrasos de transporte quando cobram a coordenação.",
    owner: "Logística & Suprimentos",
    due: "20/11",
    status: "Em andamento",
    metric: "100% das remessas com aviso prévio de 24h via WhatsApp",
  },
  {
    id: "AC-03",
    title: "Dupla checagem de rotulagem e alérgenos (RDC 727 Anvisa)",
    problem:
      "Lotes de alimentos artesanais das cozinhas comunitárias sem conferência de declaração de alérgenos.",
    owner: "Thayâne Carvalho (Nutricionista/PMO)",
    due: "15/11",
    status: "Concluída",
    metric: "100% dos lotes inspecionados com rotulagem conforme RDC 727",
  },
  {
    id: "AC-04",
    title: "Guia simplificado de cotações e compras para polos",
    problem:
      "Retenção de adiantamentos por falta das 3 cotações de fornecedores e notas fiscais exigidas pelo projeto.",
    owner: "Coordenação Administrativa",
    due: "18/11",
    status: "Planejada",
    metric: "Zero retenções fiscais em prestações de contas",
  },
];

export function cloneInitialState() {
  return {
    cases: structuredClone(initialCases),
    actions: structuredClone(initialActions),
    selectedCaseId: "ESC-103",
  };
}

export function calculateMetrics(cases) {
  const total = cases.length;
  const openCases = cases.filter((c) => c.status === "Aberto").length;
  const inProgress = cases.filter((c) => c.status === "Em análise").length;
  const resolved = cases.filter((c) => c.status === "Resolvido").length;
  const resolvedRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  const responses = cases.filter((c) => c.responseMinutes > 0);
  const avgResponse = responses.length
    ? Math.round(responses.reduce((sum, c) => sum + c.responseMinutes, 0) / responses.length)
    : 0;

  const rated = cases.filter((c) => Number.isFinite(c.rating));
  const csat = rated.length
    ? (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1)
    : "0.0";

  const totalCost = cases.reduce((sum, c) => sum + (c.contingencyCost || 0), 0);

  return {
    total,
    openCases,
    inProgress,
    resolved,
    resolvedRate,
    avgResponse,
    csat,
    totalCost,
  };
}

export function themeCounts(cases) {
  const counts = {};
  cases.forEach((item) => {
    counts[item.theme] = (counts[item.theme] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export function unitCounts(cases) {
  const counts = {};
  cases.forEach((item) => {
    counts[item.unit] = (counts[item.unit] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}
