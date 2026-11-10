export const initialCases = [
  {
    id: 'CH-1042',
    channel: 'WhatsApp',
    customer: 'Marina Santos',
    order: 'PED-1042',
    orderValue: 84.00,
    orderItems: '1x Pizza Calabresa Especial Grande + 1x Guaraná 2L',
    time: '19:42',
    rating: 2,
    text: 'O pedido chegou, mas ninguém me avisou sobre o atraso de meia hora. Precisei perguntar duas vezes no WhatsApp para saber onde estava o motoboy.',
    category: 'Atraso na entrega',
    severity: 'Alta',
    sector: 'Cozinha / Preparo',
    promisedMinutes: 45,
    actualMinutes: 75,
    delayMinutes: 30,
    peakLoad: '31 comandas simultâneas no forno',
    rootCause: 'Fila de forno saturada no pico das 20h. Capacidade nominal de 20 pizzas/hora superada sem ajuste do prazo prometido.',
    immediateAction: 'Cupom de compensação (R$ 20)',
    compensationCost: 20.00,
    status: 'Em tratamento',
    slaMinutes: 14,
    aiSuggestedTag: 'Atraso na entrega',
    history: [
      '19:42 · Ocorrência recebida via WhatsApp',
      '19:56 · Atendimento fez primeiro contato (SLA: 14 min)',
      '19:58 · Cupom de R$ 20,00 gerado e enviado à cliente'
    ]
  },
  {
    id: 'CH-1046',
    channel: 'iFood',
    customer: 'Rafael Torres',
    order: 'PED-1046',
    orderValue: 112.00,
    orderItems: '1x Pizza Quatro Queijos + 1x Pizza Portuguesa',
    time: '20:03',
    rating: 2,
    text: 'A previsão informada no iFood era de 45 minutos e levou 1h15. A pizza chegou morna.',
    category: 'Atraso na entrega',
    severity: 'Média',
    sector: 'Logística / Entrega',
    promisedMinutes: 45,
    actualMinutes: 75,
    delayMinutes: 30,
    peakLoad: '34 comandas simultâneas',
    rootCause: 'Demora no aceite de entregador pelo aplicativo parceiro durante chuva na região.',
    immediateAction: 'Estorno parcial de frete (R$ 15)',
    compensationCost: 15.00,
    status: 'Resolvido',
    slaMinutes: 8,
    aiSuggestedTag: 'Atraso na entrega',
    history: [
      '20:03 · Avaliação importada do portal iFood',
      '20:11 · Estorno parcial de R$ 15,00 aprovado no portal',
      '20:15 · Chamado encerrado com cliente notificado'
    ]
  },
  {
    id: 'CH-1051',
    channel: 'Telefone',
    customer: 'Júlia Mendes',
    order: 'PED-1051',
    orderValue: 72.00,
    orderItems: '1x Pizza Frango com Catupiry Grande',
    time: '20:26',
    rating: 1,
    text: 'Meu pedido ainda não chegou, já passou 40 minutos do horário combinado e preciso sair.',
    category: 'Atraso na entrega',
    severity: 'Crítica',
    sector: 'Cozinha / Preparo',
    promisedMinutes: 40,
    actualMinutes: 80,
    delayMinutes: 40,
    peakLoad: '36 comandas simultâneas',
    rootCause: 'Comanda física extraviada na bancada de montagem da cozinha durante troca de turno.',
    immediateAction: 'Reenvio imediato prioritário + Isenção do pedido',
    compensationCost: 72.00,
    status: 'Em tratamento',
    slaMinutes: 3,
    aiSuggestedTag: 'Atraso crítico',
    history: [
      '20:26 · Ligação recebida no balcão de atendimento',
      '20:29 · Comanda reemitida em modo prioritário na cozinha',
      '20:31 · Gerência assumiu contato direto com a cliente'
    ]
  },
  {
    id: 'CH-1054',
    channel: 'Saipos',
    customer: 'Bruno Alencar',
    order: 'PED-1054',
    orderValue: 68.00,
    orderItems: '1x Pizza Marguerita + 1x Refrigerante Lata',
    time: '20:41',
    rating: 1,
    text: 'Cancelei o pedido porque demorou mais de 20 minutos só para confirmarem no sistema da loja.',
    category: 'Cancelamento',
    severity: 'Alta',
    sector: 'Atendimento / Balcão',
    promisedMinutes: 45,
    actualMinutes: 22,
    delayMinutes: 0,
    peakLoad: '35 comandas simultâneas',
    rootCause: 'Terminal do integrador Saipos desconectou temporariamente da rede Wi-Fi do balcão.',
    immediateAction: 'Estorno integral automático via cartão',
    compensationCost: 68.00,
    status: 'Resolvido',
    slaMinutes: 5,
    aiSuggestedTag: 'Cancelamento de pedido',
    history: [
      '20:41 · Cancelamento registrado no integrador Saipos',
      '20:46 · Estorno de R$ 68,00 processado pela adquirente',
      '20:50 · Reiniciado módulo de sincronização do PDV'
    ]
  },
  {
    id: 'CH-1031',
    channel: 'WhatsApp',
    customer: 'Carlos Prado',
    order: 'PED-1031',
    orderValue: 95.00,
    orderItems: '1x Pizza Pepperoni + 1x Pizza Doce Nutella + 1x Guaraná 2L',
    time: '18:58',
    rating: 3,
    text: 'Faltou a bebida e a pizza doce no pacote que o motoboy entregou. Ele disse que só recebeu uma sacola na expedição.',
    category: 'Item ausente',
    severity: 'Alta',
    sector: 'Expedição / Montagem',
    promisedMinutes: 40,
    actualMinutes: 38,
    delayMinutes: 0,
    peakLoad: '19 comandas simultâneas',
    rootCause: 'Falha de conferência na expedição: comanda com 2 volumes empacotada apenas com volume 1.',
    immediateAction: 'Reenvio imediato dos itens faltantes via motoboy próprio',
    compensationCost: 12.00,
    status: 'Resolvido',
    slaMinutes: 4,
    aiSuggestedTag: 'Item ausente na entrega',
    history: [
      '18:58 · Mensagem com foto da comanda recebida no WhatsApp',
      '19:02 · Itens adicionais despachados via motoboy dedicado',
      '19:22 · Cliente confirmou recebimento dos itens'
    ]
  },
  {
    id: 'CH-1048',
    channel: 'iFood',
    customer: 'Renata Lemos',
    order: 'PED-1048',
    orderValue: 79.00,
    orderItems: '1x Pizza Quatro Queijos + Sachês de Azeite Especial',
    time: '20:12',
    rating: 3,
    text: 'A pizza estava ótima e quentinha, mas o azeite especial que paguei à parte não veio dentro da embalagem.',
    category: 'Item ausente',
    severity: 'Média',
    sector: 'Expedição / Montagem',
    promisedMinutes: 45,
    actualMinutes: 50,
    delayMinutes: 5,
    peakLoad: '33 comandas simultâneas',
    rootCause: 'Omissão de adicionais pequenos no checklist da bancada de despacho.',
    immediateAction: 'Cupom de crédito de R$ 10',
    compensationCost: 10.00,
    status: 'Resolvido',
    slaMinutes: 12,
    aiSuggestedTag: 'Item ausente na entrega',
    history: [
      '20:12 · Avaliação mista importada do iFood',
      '20:24 · Crédito de R$ 10,00 concedido para o próximo pedido',
      '20:26 · Registro encerrado com sucesso'
    ]
  },
  {
    id: 'CH-1028',
    channel: 'Telefone',
    customer: 'Paulo Nogueira',
    order: 'PED-1028',
    orderValue: 88.00,
    orderItems: '1x Pizza Calabresa + 1x Cerveja Artesanal',
    time: '18:37',
    rating: 2,
    text: 'A maquininha do entregador deu erro de conexão na primeira passada e acabou cobrando duas vezes na fatura do cartão.',
    category: 'Pagamento / Cobrança',
    severity: 'Alta',
    sector: 'Logística / Entrega',
    promisedMinutes: 40,
    actualMinutes: 36,
    delayMinutes: 0,
    peakLoad: '16 comandas simultâneas',
    rootCause: 'Instabilidade de sinal móvel na maquininha POS utilizada pelo entregador terceirizado.',
    immediateAction: 'Comprovante conferido e estorno PIX de R$ 88 realizado',
    compensationCost: 88.00,
    status: 'Resolvido',
    slaMinutes: 7,
    aiSuggestedTag: 'Cobrança indevida',
    history: [
      '18:37 · Cliente ligou informando duplicidade',
      '18:41 · Comprovante recebido e validado no extrato financeiro',
      '18:44 · Estorno de R$ 88,00 transferido via PIX ao cliente'
    ]
  },
  {
    id: 'CH-1058',
    channel: 'WhatsApp',
    customer: 'Ana Carolina',
    order: 'PED-1058',
    orderValue: 82.00,
    orderItems: '1x Pizza Vegetariana Especial (Observação: Alergia Severa a Castanhas)',
    time: '20:52',
    rating: 1,
    text: 'Informei na observação que sou alérgica severa a castanhas e nozes. O molho pesto da pizza de vocês contém castanhas? Não posso consumir antes de ter certeza absoluta!',
    category: 'Segurança alimentar / Alérgeno',
    severity: 'Crítica',
    sector: 'Cozinha / Preparo',
    promisedMinutes: 45,
    actualMinutes: 30,
    delayMinutes: 0,
    peakLoad: '29 comandas simultâneas',
    rootCause: 'Dúvida crítica de segurança alimentar e rotulagem preventiva (RDC 727 / RDC 26).',
    immediateAction: 'Contato imediato da nutricionista confirmando ingredientes e orientando a cliente',
    compensationCost: 0.00,
    status: 'Aberto',
    slaMinutes: 2,
    aiSuggestedTag: 'Segurança alimentar / Alérgeno',
    history: [
      '20:52 · Mensagem urgente recebida no WhatsApp',
      '20:53 · Protocolo de segurança sanitária acionado',
      '20:54 · Nutricionista de plantão contatando a cliente por voz'
    ]
  },
  {
    id: 'CH-1019',
    channel: 'iFood',
    customer: 'Diego Fonseca',
    order: 'PED-1019',
    orderValue: 92.00,
    orderItems: '1x Pizza Parma com Rúcula',
    time: '18:08',
    rating: 5,
    text: 'Melhor pizza da região! Massa leve, queijo bem derretido e entrega muito rápida (25 min). Estão de parabéns.',
    category: 'Elogio / Qualidade',
    severity: 'Baixa',
    sector: 'Cozinha / Preparo',
    promisedMinutes: 40,
    actualMinutes: 25,
    delayMinutes: -15,
    peakLoad: '12 comandas simultâneas',
    rootCause: 'Operação fora de pico com fluxo contínuo e padrão de ficha técnica excelente.',
    immediateAction: 'Agradecimento enviado + Registro para a equipe da cozinha',
    compensationCost: 0.00,
    status: 'Resolvido',
    slaMinutes: 15,
    aiSuggestedTag: 'Elogio espontâneo',
    history: [
      '18:08 · Avaliação 5 estrelas importada do iFood',
      '18:23 · Mensagem de agradecimento enviada ao cliente',
      '18:25 · Destaque positivo compartilhado no mural da cozinha'
    ]
  },
  {
    id: 'CH-1060',
    channel: 'WhatsApp',
    customer: 'Mariana Duarte',
    order: 'PED-1060',
    orderValue: 65.00,
    orderItems: '1x Pizza Muçarela + 1x Refrigerante 2L',
    time: '21:10',
    rating: null,
    text: 'Boa noite, fiz o pedido faz 50 minutos e o rastreio no link do WhatsApp travou. Podem me dar uma posição?',
    category: 'Atraso na entrega',
    severity: 'Média',
    sector: 'Logística / Entrega',
    promisedMinutes: 45,
    actualMinutes: 52,
    delayMinutes: 7,
    peakLoad: '28 comandas simultâneas',
    rootCause: 'Pequena retenção no trajeto devido a obras na avenida principal da rota.',
    immediateAction: 'Localização do motoboy enviada em tempo real com previsão de 5 min',
    compensationCost: 0.00,
    status: 'Aberto',
    slaMinutes: 4,
    aiSuggestedTag: 'Atraso na entrega',
    history: [
      '21:10 · Ocorrência recebida via WhatsApp',
      '21:14 · Operador checou posição com o motoboy via rádio',
      '21:14 · Mensagem de previsão atualizada enviada à cliente'
    ]
  }
];

export const initialActions = [
  {
    id: 'ACT-01',
    title: 'Controle de Capacidade de Forno no Pico',
    sector: 'Cozinha / Operações',
    problem: 'O forno atinge capacidade máxima acima de 25 pizzas simultâneas, gerando atrasos em cascata.',
    action: 'Pausa preventiva temporária de novos pedidos no app quando a fila do forno ultrapassar 22 comandas abertas.',
    owner: 'Coord. de Operações',
    deadline: '22/07',
    metric: 'Reduzir pedidos com atraso > 15 min de 18% para < 4%',
    status: 'Em andamento'
  },
  {
    id: 'ACT-02',
    title: 'Checklist Visual de Conferência no Despacho',
    sector: 'Expedição / Montagem',
    problem: 'Esquecimento recorrente de refrigerantes e sobremesas em pedidos que contêm dois volumes.',
    action: 'Carimbo com quantidade de volumes na comanda; motoboy só retira o pacote após conferência dupla na bancada.',
    owner: 'Líder de Expedição',
    deadline: '18/07',
    metric: 'Zerar ocorrências de item ausente na entrega (meta: 0 falhas/turno)',
    status: 'Em andamento'
  },
  {
    id: 'ACT-03',
    title: 'Notificação Preventiva de Rota no WhatsApp',
    sector: 'Atendimento / SAC',
    problem: 'Clientes ficam sem atualização durante horários de pico e precisam acionar o suporte para saber o status.',
    action: 'Disparo automático de mensagem assim que o pedido sai para entrega com contato do suporte.',
    owner: 'Equipe de SAC',
    deadline: '25/07',
    metric: 'Reduzir contatos de cobrança de status em 40%',
    status: 'Planejada'
  },
  {
    id: 'ACT-04',
    title: 'Matriz de Alérgenos e Fichas Técnicas Visíveis (RDC 727)',
    sector: 'Qualidade / Nutrição',
    problem: 'Dúvidas imediatas de clientes alérgicos sobre traços de nozes/glúten no cardápio.',
    action: 'Fixação de matriz plastificada de alérgenos na bancada e inclusão de aviso de alérgenos no cardápio digital.',
    owner: 'Thayâne Carvalho (Nutricionista/PMO)',
    deadline: '16/07',
    metric: 'Tempo de esclarecimento para alérgenos < 2 minutos',
    status: 'Concluída'
  }
];

export function cloneInitialState() {
  return {
    cases: structuredClone(initialCases),
    actions: structuredClone(initialActions),
    selectedCaseId: 'CH-1042'
  };
}

export function calculateMetrics(cases) {
  const total = cases.length;
  const openCases = cases.filter(c => c.status === 'Aberto').length;
  const inProgress = cases.filter(c => c.status === 'Em tratamento').length;
  const resolved = cases.filter(c => c.status === 'Resolvido').length;
  const resolvedRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // SLA Médio de Resposta (minutos)
  const slaSum = cases.reduce((sum, c) => sum + (c.slaMinutes || 0), 0);
  const avgSla = total > 0 ? (slaSum / total).toFixed(1) : '0.0';

  // Custo Total de Indenizações (estornos + cupons)
  const totalCost = cases.reduce((sum, c) => sum + (c.compensationCost || 0), 0);

  // CSAT Médio (apenas casos que possuem avaliação numérica)
  const rated = cases.filter(c => Number.isFinite(c.rating));
  const avgCsat = rated.length > 0 ? (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1) : '0.0';

  return {
    total,
    openCases,
    inProgress,
    resolved,
    resolvedRate,
    avgSla,
    totalCost,
    avgCsat,
    ratedCount: rated.length
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
