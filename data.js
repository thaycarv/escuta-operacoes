export const initialCases = [
  {
    id: 'ESC-101',
    channel: 'WhatsApp Comunitário',
    beneficiary: 'Dona Maria Clara (Mãe de aluno)',
    hub: 'Polo Comunitário Norte',
    projectName: 'Laboratórios Comunitários de Inclusão Digital',
    date: '2026-08-24',
    time: '14:30',
    text: 'Boa tarde, meu filho foi para a aula hoje no Polo Norte e os computadores estavam sem conexão com a internet. A professora precisou passar atividade teórica no quadro e eles não conseguiram praticar no laboratório.',
    category: 'Conectividade & Infraestrutura',
    severity: 'Alta',
    sector: 'Infraestrutura & Redes',
    rootCause: 'Rompimento de fibra óptica na entrada da comunidade por obras na rede de drenagem municipal.',
    immediateAction: 'Modem 4G de redundância acionado no polo em 40 minutos + Reposição prática agendada no sábado.',
    contingencyCost: 85.00,
    status: 'Em tratamento',
    slaHours: 0.7,
    history: [
      '24/08 14:30 · Ocorrência registrada via canal comunitário',
      '24/08 14:45 · Coordenação de infraestrutura acionou operadora e liberou roteador reserva',
      '24/08 15:10 · Conexão provisória restabelecida para os 24 alunos da turma'
    ]
  },
  {
    id: 'ESC-102',
    channel: 'Formulário de Aluno/Turma',
    beneficiary: 'Lucas Ferreira (Aluno Bolsista)',
    hub: 'Polo Regional Centro',
    projectName: 'Programa Bootcamp Dev e Dados para a Juventude',
    date: '2026-08-23',
    time: '19:15',
    text: 'O ritmo das aulas de banco de dados e APIs está muito acelerado para quem não tinha base de lógica. Estamos com receio de não entregar o projeto prático final e perder a bolsa de apoio.',
    category: 'Pedagógico & Nivelamento',
    severity: 'Média',
    sector: 'Coordenação Pedagógica',
    rootCause: 'Descompasso na formação básica inicial de programação entre bolsistas recém-ingressos.',
    immediateAction: 'Plantão de monitoria técnica aos sábados com instrutores locais + prorrogação de 5 dias no prazo de entrega.',
    contingencyCost: 150.00,
    status: 'Resolvido',
    slaHours: 2.5,
    history: [
      '23/08 19:15 · Formulário de avaliação de módulo recebido',
      '23/08 20:30 · Coordenadora Juliana Duarte reuniu equipe de instrutores',
      '24/08 09:00 · Calendário de monitorias aos sábados publicado para as 4 turmas'
    ]
  },
  {
    id: 'ESC-103',
    channel: 'Reunião de Polo / Presencial',
    beneficiary: 'Dona Tereza (Liderança do Coletivo de Mães)',
    hub: 'Cozinha Solidária Esperança',
    projectName: 'Cozinhas Comunitárias e Segurança Alimentar',
    date: '2026-08-22',
    time: '10:00',
    text: 'Quatro crianças atendidas na distribuição de almoço têm diagnóstico médico de alergia severa a leite e derivados. Precisamos garantir que não haja contaminação cruzada no preparo dos caldos.',
    category: 'Segurança Sanitária & Alérgenos',
    severity: 'Crítica',
    sector: 'Qualidade & Nutrição (Thayâne Carvalho)',
    rootCause: 'Necessidade de protocolo operacional rigoroso conforme RDC 216 / RDC 727 para manipulação comunitária de alérgenos.',
    immediateAction: 'Visita técnica da nutricionista com cartilha de boas práticas, rotulagem e kit de panelas e tábuas exclusivas identificadas.',
    contingencyCost: 120.00,
    status: 'Resolvido',
    slaHours: 1.0,
    history: [
      '22/08 10:00 · Demanda apresentada na roda de alinhamento com a comunidade',
      '22/08 11:30 · Nutricionista Thayâne realizou auditoria in loco na bancada',
      '22/08 14:00 · Procedimento padrão RDC 727 fixado e equipe treinada'
    ]
  },
  {
    id: 'ESC-104',
    channel: 'Ouvidoria Digital',
    beneficiary: 'Camila Rocha (Educadora Voluntária)',
    hub: 'Polo Comunitário Sul',
    projectName: 'Laboratórios Comunitários de Inclusão Digital',
    date: '2026-08-21',
    time: '16:40',
    text: 'Três teclados e dois mouses da bancada de atendimento infantil estão com defeito e cabos rompidos após as oficinas do fim de semana.',
    category: 'Equipamentos & Suprimentos',
    severity: 'Média',
    sector: 'Infraestrutura & TI',
    rootCause: 'Desgaste natural de uso contínuo em bancadas comunitárias sem checklist de fechamento diário.',
    immediateAction: 'Reposição imediata a partir do estoque de reserva técnica do projeto + implantação de checklist diário.',
    contingencyCost: 0.00,
    status: 'Resolvido',
    slaHours: 3.0,
    history: [
      '21/08 16:40 · Chamado aberto na ouvidoria',
      '21/08 18:00 · Peças substituídas com garantia de lote homologado',
      '21/08 18:30 · Checklist de vistoria diária entregue ao responsável do polo'
    ]
  },
  {
    id: 'ESC-105',
    channel: 'WhatsApp Comunitário',
    beneficiary: 'Gabriel Souza (Bolsista do Programa)',
    hub: 'Polo Regional Norte',
    projectName: 'Programa Bootcamp Dev e Dados para a Juventude',
    date: '2026-08-20',
    time: '11:20',
    text: 'Gostaria de registrar um agradecimento! Fui contratado como Desenvolvedor Júnior na empresa parceira do projeto após a apresentação do projeto de conclusão de curso na semana passada.',
    category: 'Elogio & Impacto Social',
    severity: 'Baixa',
    sector: 'Parcerias & Empregabilidade',
    rootCause: 'Eficácia da metodologia prática e da ponte direta com o setor produtivo.',
    immediateAction: 'Registro do depoimento para o relatório trimestral aos financiadores e convite para mentoria com novos alunos.',
    contingencyCost: 0.00,
    status: 'Resolvido',
    slaHours: 4.0,
    history: [
      '20/08 11:20 · Mensagem de agradecimento recebida',
      '20/08 12:00 · Caso de sucesso documentado no portfólio de impacto'
    ]
  },
  {
    id: 'ESC-106',
    channel: 'Reunião de Polo / Presencial',
    beneficiary: 'Marcos Vinicius (Líder Comunitário)',
    hub: 'Polo Digital Leste',
    projectName: 'Laboratórios Comunitários de Inclusão Digital',
    date: '2026-08-19',
    time: '18:00',
    text: 'Jovens do bairro que trabalham no comércio só chegam em casa após as 19h30 e não conseguem frequentar as turmas da tarde. A comunidade solicita uma turma noturna de informática básica.',
    category: 'Acesso & Grade Horária',
    severity: 'Média',
    sector: 'Planejamento & Operações',
    rootCause: 'Pesquisa diagnóstica inicial subdimensionou a demanda de trabalhadores diurnos.',
    immediateAction: 'Readequação da grade de instrutores para abertura de turma das 20h às 21h30 a partir de setembro.',
    contingencyCost: 0.00,
    status: 'Em tratamento',
    slaHours: 5.0,
    history: [
      '19/08 18:00 · Demanda acolhida no conselho comunitário',
      '20/08 14:00 · Ajuste de escala de instrutores planejado com a gerência do projeto'
    ]
  }
];

export const initialActions = [
  {
    id: 'ACT-COM-01',
    title: 'Contingência 4G Redundante nos 5 Polos Comunitários',
    projectName: 'Laboratórios Comunitários de Inclusão Digital',
    problem: 'Quedas de fibra óptica em bairros periféricos interrompem aulas práticas dos jovens.',
    action: 'Instalação de roteadores com chip de dados de comutação automática para contingência imediata.',
    sector: 'Infraestrutura & Redes',
    owner: 'Coord. de Infraestrutura',
    deadline: '30/08/2026',
    metric: 'Disponibilidade de conexão nos laboratórios > 98,5%',
    status: 'Em andamento'
  },
  {
    id: 'ACT-COM-02',
    title: 'Plantão de Monitoria Pedagógica aos Sábados',
    projectName: 'Programa Bootcamp Dev e Dados para a Juventude',
    problem: 'Evasão e descompasso de alunos com menor base de lógica de programação.',
    action: '2 turmas presenciais de reforço aos sábados lideradas por monitores bolsistas seniores.',
    sector: 'Coordenação Pedagógica',
    owner: 'Juliana Duarte',
    deadline: '25/08/2026',
    metric: 'Reduzir taxa de desistência dos módulos técnicos para < 5%',
    status: 'Em andamento'
  },
  {
    id: 'ACT-COM-03',
    title: 'Protocolo de Alérgenos e Boas Práticas (RDC 727)',
    projectName: 'Cozinhas Comunitárias e Segurança Alimentar',
    problem: 'Risco de contaminação cruzada para crianças alérgicas atendidas nas cozinhas comunitárias.',
    action: 'Treinamento presencial de voluntárias, cartilha plastificada e segregação de utensílios exclusivos.',
    sector: 'Qualidade & Nutrição',
    owner: 'Thayâne Carvalho (Nutricionista/PMO)',
    deadline: '20/08/2026',
    metric: '100% de conformidade com os requisitos da RDC 727 / RDC 26',
    status: 'Concluída'
  },
  {
    id: 'ACT-COM-04',
    title: 'Abertura de Turma Noturna para Trabalhadores',
    projectName: 'Laboratórios Comunitários de Inclusão Digital',
    problem: 'Jovens inseridos no comércio informal não conseguiam frequentar turmas vespertinas.',
    action: 'Remanejamento de escala para ofertar turma das 20h às 21h30 no Polo Digital Leste.',
    sector: 'Planejamento & Operações',
    owner: 'Carlos Mendonça',
    deadline: '05/09/2026',
    metric: 'Ocupação de 25 vagas para trabalhadores no turno da noite',
    status: 'Planejada'
  }
];

export function cloneInitialState() {
  return {
    cases: structuredClone(initialCases),
    actions: structuredClone(initialActions),
    selectedCaseId: 'ESC-101'
  };
}

export function calculateMetrics(cases) {
  const total = cases.length;
  const openCases = cases.filter(c => c.status === 'Aberto').length;
  const inProgress = cases.filter(c => c.status === 'Em tratamento').length;
  const resolved = cases.filter(c => c.status === 'Resolvido').length;
  const resolvedRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  const slaSum = cases.reduce((sum, c) => sum + (c.slaHours || 0), 0);
  const avgSla = total > 0 ? (slaSum / total).toFixed(1) : '0.0';

  const totalCost = cases.reduce((sum, c) => sum + (c.contingencyCost || 0), 0);

  return {
    total,
    openCases,
    inProgress,
    resolved,
    resolvedRate,
    avgSla,
    totalCost
  };
}

export function categoryCounts(cases) {
  const counts = {};
  cases.forEach(c => {
    counts[c.category] = (counts[c.category] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export function sectorCounts(cases) {
  const counts = {};
  cases.forEach(c => {
    counts[c.sector] = (counts[c.sector] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}
