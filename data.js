// Base de dados operacional do RadarSocial Escuta
// Ouvidoria Ativa, Voz do Usuário/Beneficiário (VoC/VoB) e Melhoria Contínua de Processos

export const initialCases = [
  {
    id: "ESC-101",
    channel: "WhatsApp do Polo",
    customer: "Marina S.",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4021",
    rating: 2,
    nps: 4,
    text: "Cheguei para a aula do curso de TI e os computadores estavam sem energia e sem internet. Ninguém avisou antes e tivemos que esperar mais de 40 minutos.",
    type: "Reclamação Operacional",
    theme: "Atendimento e Comunicação",
    severity: "Moderada",
    status: "Em análise",
    time: "14:20",
    responseMinutes: 15,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: false,
    aiConfidence: 92,
    aiStatus: "pending",
    operational: {
      triage: 8,
      serviceWait: 42,
      resolution: 18,
      concurrent: 36,
    },
    history: [
      "Manifestação recebida via WhatsApp do Polo Digital Norte",
      "Triagem técnica identificou pane elétrica no quadro de disjuntores",
      "Aguardando parecer da coordenação de operações",
    ],
  },
  {
    id: "ESC-102",
    channel: "Ouvidoria Central",
    customer: "Rafael T.",
    unit: "Cooperativa Terra Viva",
    serviceCode: "AGR-1046",
    rating: 2,
    nps: 5,
    text: "A remessa de mudas e adubos para o plantio após o vendaval atrasou dois dias em relação ao cronograma pactuado, atrasando o preparo do solo.",
    type: "Reclamação Operacional",
    theme: "Logística e Distribuição",
    severity: "Moderada",
    status: "Aguardando ação interna",
    time: "10:15",
    responseMinutes: 28,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: false,
    aiConfidence: 94,
    aiStatus: "validated",
    operational: {
      triage: 12,
      serviceWait: 48,
      resolution: 24,
      concurrent: 28,
    },
    history: [
      "Relato registrado na Ouvidoria Central",
      "Contato com o setor de logística da Cooperativa Terra Viva",
      "Plano de entrega emergencial acionado",
    ],
  },
  {
    id: "ESC-103",
    channel: "Balcão / Polo",
    customer: "Júlia M.",
    unit: "Cozinha Comunitária",
    serviceCode: "ALIM-2051",
    rating: 1,
    nps: 2,
    text: "Lote de pães artesanais distribuídos aos alunos da creche comunitária veio sem rótulo de alérgenos (glúten/leite), em desacordo com a RDC 727 da Anvisa.",
    type: "Incidente Crítico Sanitário",
    theme: "Segurança Nutricional e Alérgenos",
    severity: "Crítica",
    status: "Novo",
    time: "11:30",
    responseMinutes: 5,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: true,
    aiConfidence: 98,
    aiStatus: "pending",
    operational: {
      triage: 5,
      serviceWait: 15,
      resolution: 0,
      concurrent: 40,
    },
    history: [
      "Alerta sanitário registrado no balcão da Cozinha Comunitária",
      "Intervenção imediata da Responsável Técnica (Nutricionista)",
      "Recolhimento preventivo do lote para adequação de rotulagem",
    ],
  },
  {
    id: "ESC-104",
    channel: "WhatsApp do Polo",
    customer: "Bruno A.",
    unit: "Ateliê Comunitário",
    serviceCode: "EMP-3054",
    rating: 1,
    nps: 1,
    text: "Solicitei inscrição na turma noturna de costura para mães trabalhadoras há duas semanas e até agora não recebi retorno sobre vagas ou início.",
    type: "Reclamação Operacional",
    theme: "Planejamento e Matrícula",
    severity: "Alta",
    status: "Aguardando ação interna",
    time: "16:40",
    responseMinutes: 35,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: false,
    aiConfidence: 89,
    aiStatus: "validated",
    operational: {
      triage: 15,
      serviceWait: 35,
      resolution: 10,
      concurrent: 22,
    },
    history: [
      "Manifestação recebida pelo canal de matrículas do Ateliê",
      "Demanda de expansão noturna registrada para análise de capacidade",
    ],
  },
  {
    id: "ESC-105",
    channel: "Totem / QR Code",
    customer: "Carlos P.",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4015",
    rating: 3,
    nps: 7,
    text: "Faltavam fones de ouvido na bancada 4 na aula de programação, mas a monitora do polo substituiu em menos de 10 minutos. Atendimento atencioso.",
    type: "Reclamação Resolvida",
    theme: "Infraestrutura de TI",
    severity: "Baixa",
    status: "Resolvido",
    time: "09:50",
    responseMinutes: 8,
    resolvedConfirmed: true,
    duplicateOf: null,
    critical: false,
    aiConfidence: 95,
    aiStatus: "validated",
    operational: {
      triage: 4,
      serviceWait: 10,
      resolution: 6,
      concurrent: 18,
    },
    history: [
      "Avaliação no totem do laboratório",
      "Monitora do polo realizou a troca imediata",
      "Usuário confirmou a resolução no encerramento da aula",
    ],
  },
  {
    id: "ESC-106",
    channel: "Ouvidoria Central",
    customer: "Renata L.",
    unit: "Cooperativa Terra Viva",
    serviceCode: "AGR-1048",
    rating: 2,
    nps: 4,
    text: "Pedido de adiantamento financeiro para mudas foi retido pela coordenação. Faltou orientação prévia sobre a exigência de 3 cotações do MROSC.",
    type: "Reclamação Operacional",
    theme: "Conformidade MROSC e Finanças",
    severity: "Alta",
    status: "Em análise",
    time: "15:10",
    responseMinutes: 20,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: false,
    aiConfidence: 91,
    aiStatus: "pending",
    operational: {
      triage: 10,
      serviceWait: 40,
      resolution: 15,
      concurrent: 30,
    },
    history: [
      "Manifestação sobre glosa preventiva de adiantamento",
      "Enviado modelo padrão de formulário de 3 cotações do MROSC",
    ],
  },
  {
    id: "ESC-107",
    channel: "Balcão / Polo",
    customer: "Paulo N.",
    unit: "Restaurante Comunitário",
    serviceCode: "ALIM-2028",
    rating: 2,
    nps: 3,
    text: "A taxa social da refeição subsidiada foi debitada duas vezes no cartão da cooperativa de crédito comunitária.",
    type: "Incidente Financeiro",
    theme: "Pagamento Social e Cobrança",
    severity: "Alta",
    status: "Aguardando cliente",
    time: "12:45",
    responseMinutes: 12,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: false,
    aiConfidence: 96,
    aiStatus: "validated",
    operational: {
      triage: 6,
      serviceWait: 20,
      resolution: 14,
      concurrent: 45,
    },
    history: [
      "Cobrança em duplicidade identificada no balcão",
      "Comprovante solicitado ao usuário para estorno na folha do projeto",
    ],
  },
  {
    id: "ESC-108",
    channel: "WhatsApp do Polo",
    customer: "Ana C.",
    unit: "Cozinha Comunitária",
    serviceCode: "ALIM-2058",
    rating: 1,
    nps: 0,
    text: "Minha filha tem alergia alimentar severa a amendoim e nozes. Preciso confirmar formalmente se a sopa servida hoje tem risco de contaminação cruzada.",
    type: "Incidente Crítico Sanitário",
    theme: "Segurança Nutricional e Alérgenos",
    severity: "Crítica",
    status: "Novo",
    time: "11:55",
    responseMinutes: 2,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: true,
    aiConfidence: 99,
    aiStatus: "pending",
    operational: {
      triage: 3,
      serviceWait: 10,
      resolution: 0,
      concurrent: 38,
    },
    history: [
      "Sinal crítico de alérgeno identificado via WhatsApp",
      "Nutricionista responsável técnica acionada imediatamente",
      "Ficha técnica do lote conferida: ausência de traços confirmada",
    ],
  },
  {
    id: "ESC-109",
    channel: "Totem / QR Code",
    customer: "Diego F.",
    unit: "Ateliê Comunitário",
    serviceCode: "EMP-3019",
    rating: 5,
    nps: 10,
    text: "Excelente oficina de corte e costura! As máquinas industriais estão bem reguladas e o acompanhamento técnico da instrutora foi nota 10.",
    type: "Elogio",
    theme: "Qualidade do Serviço",
    severity: "Informativa",
    status: "Resolvido",
    time: "17:15",
    responseMinutes: 45,
    resolvedConfirmed: true,
    duplicateOf: null,
    critical: false,
    aiConfidence: 99,
    aiStatus: "validated",
    operational: {
      triage: 2,
      serviceWait: 5,
      resolution: 0,
      concurrent: 14,
    },
    history: [
      "Elogio registrado no totem pós-oficina",
      "Feedback repassado à coordenação pedagógica do polo",
    ],
  },
  {
    id: "ESC-110",
    channel: "Totem / QR Code",
    customer: "Bianca R.",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4038",
    rating: 2,
    nps: 3,
    text: "",
    type: "Informação Insuficiente",
    theme: "Acolhimento Comunitário",
    severity: "Baixa",
    status: "Aguardando cliente",
    time: "16:05",
    responseMinutes: 50,
    resolvedConfirmed: false,
    duplicateOf: null,
    critical: false,
    aiConfidence: 30,
    aiStatus: "pending",
    operational: {
      triage: 6,
      serviceWait: 25,
      resolution: 0,
      concurrent: 26,
    },
    history: [
      "Nota 2/5 registrada no totem sem comentário escrito",
      "Equipe de serviço social enviou mensagem para apurar o motivo",
    ],
  },
  {
    id: "ESC-111",
    channel: "WhatsApp do Polo",
    customer: "Marina S.",
    unit: "Polo Digital Norte",
    serviceCode: "TI-4021",
    rating: 2,
    nps: null,
    text: "Demora excessiva para iniciar a turma de TI por falta de energia.",
    type: "Reclamação Operacional",
    theme: "Atendimento e Comunicação",
    severity: "Moderada",
    status: "Vinculado",
    time: "14:45",
    responseMinutes: 0,
    resolvedConfirmed: false,
    duplicateOf: "ESC-101",
    critical: false,
    aiConfidence: 96,
    aiStatus: "validated",
    operational: {
      triage: 8,
      serviceWait: 42,
      resolution: 18,
      concurrent: 36,
    },
    history: [
      "Segundo contato identificado da mesma usuária sobre o mesmo fato",
      "Vinculado ao chamado principal ESC-101 para evitar duplicidade de apuração",
    ],
  },
  {
    id: "ESC-112",
    channel: "Ouvidoria Central",
    customer: "Felipe G.",
    unit: "Cooperativa Terra Viva",
    serviceCode: "AGR-1024",
    rating: 4,
    nps: 8,
    text: "Seria muito positivo receber aviso no WhatsApp na véspera da entrega dos insumos agrícolas para organizarmos a recepção comunitária.",
    type: "Sugestão de Melhoria",
    theme: "Atendimento e Comunicação",
    severity: "Baixa",
    status: "Resolvido",
    time: "11:20",
    responseMinutes: 30,
    resolvedConfirmed: true,
    duplicateOf: null,
    critical: false,
    aiConfidence: 90,
    aiStatus: "validated",
    operational: {
      triage: 5,
      serviceWait: 15,
      resolution: 12,
      concurrent: 20,
    },
    history: [
      "Sugestão registrada pela equipe de campo",
      "Integrada ao plano de comunicação preventiva do RadarSocial",
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
    experience: "CSAT dos Cursos",
    operational: "Tempo de espera inicial e estabilidade elétrica",
  },
  {
    id: "AC-02",
    title: "Comunicação preventiva de logística de insumos",
    problem:
      "Agricultores e cooperativas só descobrem atrasos de transporte quando cobram a coordenação.",
    owner: "Logística & Suprimentos",
    due: "20/11",
    status: "Em andamento",
    experience: "Contatos por atraso de entrega",
    operational: "Remessas com aviso prévio de 24h",
  },
  {
    id: "AC-03",
    title: "Dupla checagem de rotulagem e alérgenos (RDC 727 Anvisa)",
    problem:
      "Lotes de alimentos artesanais das cozinhas comunitárias sem conferência de declaração de alérgenos.",
    owner: "Nutrição & Garantia da Qualidade",
    due: "15/11",
    status: "Verificação",
    experience: "Incidentes de segurança alimentar",
    operational: "100% dos lotes com ficha técnica assinada",
  },
  {
    id: "AC-04",
    title: "Checklist simplificado de cotações para o MROSC",
    problem:
      "Retenção de adiantamentos por falta das 3 cotações de mercado exigidas pela Lei 13.019/2014.",
    owner: "Governança & PMO Social",
    due: "18/11",
    status: "Planejada",
    experience: "Reclamações de liberação financeira",
    operational: "Taxa de primeiras submissões aprovadas",
  },
];

export function cloneInitialState() {
  return {
    cases: structuredClone(initialCases),
    actions: structuredClone(initialActions),
    selectedCase: "ESC-101",
  };
}

export function uniqueCases(cases) {
  return cases.filter((item) => !item.duplicateOf);
}

export function calculateMetrics(cases) {
  const unique = uniqueCases(cases);
  const rated = unique.filter((item) => Number.isFinite(item.rating));
  const csat = rated.length
    ? rated.reduce((sum, item) => sum + item.rating, 0) / rated.length
    : 0;
  const resolved = unique.filter((item) => item.resolvedConfirmed).length;
  const responses = unique.filter((item) => item.responseMinutes > 0);
  const avgResponse = responses.length
    ? responses.reduce((sum, item) => sum + item.responseMinutes, 0) /
      responses.length
    : 0;
  const npsResponses = unique.filter((item) => Number.isFinite(item.nps));
  const promoters = npsResponses.filter((item) => item.nps >= 9).length;
  const detractors = npsResponses.filter((item) => item.nps <= 6).length;
  const nps = npsResponses.length
    ? Math.round(
        (promoters / npsResponses.length - detractors / npsResponses.length) * 100
      )
    : 0;
  return {
    csat: Number(csat.toFixed(1)),
    resolvedRate: Math.round((resolved / unique.length) * 100),
    avgResponse: Math.round(avgResponse),
    nps,
    npsResponses: npsResponses.length,
    open: unique.filter(
      (item) => !["Resolvido", "Vinculado"].includes(item.status)
    ).length,
  };
}

export function themeCounts(cases) {
  const counts = {};
  uniqueCases(cases).forEach((item) => {
    counts[item.theme] = (counts[item.theme] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export function canValidateAI(item) {
  return item.aiConfidence >= 50 && item.theme !== "Não identificado";
}

export function canVerifyAction(action) {
  return Boolean(action.experience && action.operational);
}
