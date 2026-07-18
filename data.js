export const initialCases = [
  { id:'ESC-001', channel:'WhatsApp', customer:'Marina S.', order:'PH-1042', rating:2, nps:4, text:'O pedido chegou, mas ninguém me avisou sobre o atraso. Precisei perguntar duas vezes.', type:'Reclamação', theme:'Atendimento e comunicação', severity:'Moderada', status:'Em análise', time:'19:42', responseMinutes:18, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:91, aiStatus:'pending', operational:{ confirmation:6, production:43, courierWait:16, route:9, concurrent:31 }, history:['Feedback recebido pelo WhatsApp','Tema e gravidade sugeridos pela IA'] },
  { id:'ESC-002', channel:'iFood', customer:'Rafael T.', order:'PH-1046', rating:2, nps:5, text:'A previsão era de 45 minutos e levou mais de uma hora.', type:'Reclamação', theme:'Tempo de entrega', severity:'Moderada', status:'Aguardando ação interna', time:'20:03', responseMinutes:34, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:94, aiStatus:'validated', operational:{ confirmation:7, production:45, courierWait:17, route:8, concurrent:34 }, history:['Avaliação importada do iFood','Classificação validada por Thayâne'] },
  { id:'ESC-003', channel:'Telefone', customer:'Júlia M.', order:'PH-1051', rating:1, nps:2, text:'Meu pedido ainda não chegou e já passou muito do horário informado.', type:'Incidente crítico', theme:'Atraso na entrega', severity:'Alta', status:'Novo', time:'20:26', responseMinutes:8, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:89, aiStatus:'pending', operational:{ confirmation:9, production:48, courierWait:22, route:0, concurrent:36 }, history:['Contato registrado manualmente'] },
  { id:'ESC-004', channel:'Saipos', customer:'Bruno A.', order:'PH-1054', rating:1, nps:1, text:'Cancelei porque o pedido demorou para ser confirmado e não tive retorno.', type:'Reclamação', theme:'Cancelamento', severity:'Alta', status:'Aguardando ação interna', time:'20:41', responseMinutes:42, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:87, aiStatus:'corrected', operational:{ confirmation:18, production:0, courierWait:0, route:0, concurrent:35 }, history:['Cancelamento registrado','Classificação corrigida: impacto alto'] },
  { id:'ESC-005', channel:'WhatsApp', customer:'Carlos P.', order:'PH-1031', rating:3, nps:6, text:'Faltou a bebida no meu pedido, mas o atendimento resolveu rápido.', type:'Reclamação', theme:'Item ausente', severity:'Moderada', status:'Resolvido', time:'18:58', responseMinutes:5, resolvedConfirmed:true, duplicateOf:null, critical:false, aiConfidence:96, aiStatus:'validated', operational:{ confirmation:4, production:31, courierWait:8, route:11, concurrent:19 }, history:['Feedback recebido','Item reenviado','Cliente confirmou a solução'] },
  { id:'ESC-006', channel:'iFood', customer:'Renata L.', order:'PH-1048', rating:3, nps:7, text:'A pizza estava ótima, mas a entrega demorou e não tive atualização.', type:'Reclamação', theme:'Tempo de entrega', severity:'Moderada', status:'Em análise', time:'20:12', responseMinutes:26, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:82, aiStatus:'pending', operational:{ confirmation:7, production:44, courierWait:15, route:10, concurrent:33 }, history:['Avaliação mista importada','IA preservou elogio e reclamação'] },
  { id:'ESC-007', channel:'Telefone', customer:'Paulo N.', order:'PH-1028', rating:2, nps:3, text:'O pagamento apareceu duas vezes no cartão.', type:'Incidente crítico', theme:'Pagamento ou cobrança', severity:'Alta', status:'Aguardando cliente', time:'18:37', responseMinutes:7, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:93, aiStatus:'validated', operational:{ confirmation:3, production:29, courierWait:7, route:9, concurrent:16 }, history:['Cobrança duplicada relatada','Comprovante solicitado','Financeiro acionado'] },
  { id:'ESC-008', channel:'WhatsApp', customer:'Ana C.', order:'PH-1058', rating:1, nps:0, text:'Tenho alergia e preciso confirmar se o molho contém o ingrediente que informei no pedido.', type:'Incidente crítico', theme:'Segurança alimentar', severity:'Crítica', status:'Novo', time:'20:52', responseMinutes:2, resolvedConfirmed:false, duplicateOf:null, critical:true, aiConfidence:98, aiStatus:'pending', operational:{ confirmation:5, production:37, courierWait:0, route:0, concurrent:29 }, history:['Sinal de segurança alimentar identificado','Intervenção humana obrigatória'] },
  { id:'ESC-009', channel:'iFood', customer:'Diego F.', order:'PH-1019', rating:5, nps:10, text:'Pizza excelente, bem embalada e chegou quentinha.', type:'Elogio', theme:'Qualidade do produto', severity:'Informativa', status:'Resolvido', time:'18:08', responseMinutes:56, resolvedConfirmed:true, duplicateOf:null, critical:false, aiConfidence:99, aiStatus:'validated', operational:{ confirmation:3, production:27, courierWait:6, route:8, concurrent:12 }, history:['Elogio importado do iFood','Registro encerrado'] },
  { id:'ESC-010', channel:'Pesquisa', customer:'Bianca R.', order:'PH-1038', rating:2, nps:3, text:'', type:'Informação insuficiente', theme:'Não identificado', severity:'Baixa', status:'Aguardando cliente', time:'19:23', responseMinutes:70, resolvedConfirmed:false, duplicateOf:null, critical:false, aiConfidence:24, aiStatus:'pending', operational:{ confirmation:5, production:35, courierWait:9, route:10, concurrent:23 }, history:['Nota recebida sem comentário','Solicitação de contexto enviada'] },
  { id:'ESC-011', channel:'iFood', customer:'Marina S.', order:'PH-1042', rating:2, nps:null, text:'Entrega atrasada e sem retorno.', type:'Reclamação', theme:'Atendimento e comunicação', severity:'Moderada', status:'Vinculado', time:'20:01', responseMinutes:0, resolvedConfirmed:false, duplicateOf:'ESC-001', critical:false, aiConfidence:95, aiStatus:'validated', operational:{ confirmation:6, production:43, courierWait:16, route:9, concurrent:31 }, history:['Possível duplicidade identificada','Vinculado ao caso ESC-001 sem exclusão'] },
  { id:'ESC-012', channel:'Pesquisa', customer:'Felipe G.', order:'PH-1024', rating:4, nps:8, text:'Seria útil receber uma previsão atualizada quando a loja estiver cheia.', type:'Sugestão', theme:'Atendimento e comunicação', severity:'Baixa', status:'Resolvido', time:'18:22', responseMinutes:38, resolvedConfirmed:true, duplicateOf:null, critical:false, aiConfidence:88, aiStatus:'validated', operational:{ confirmation:4, production:30, courierWait:8, route:9, concurrent:18 }, history:['Sugestão registrada','Vinculada ao plano de comunicação preventiva'] }
];

export const initialActions = [
  { id:'AC-01', title:'Prazo ajustado por capacidade', problem:'Prazo informado não acompanha o volume acumulado.', owner:'Operações', due:'22/07', status:'Em andamento', experience:'CSAT', operational:'Tempo confirmação–entrega' },
  { id:'AC-02', title:'Atualização preventiva ao cliente', problem:'Clientes precisam solicitar informações durante atrasos.', owner:'Atendimento', due:'20/07', status:'Em andamento', experience:'Contatos por atraso', operational:'Pedidos sem atualização' },
  { id:'AC-03', title:'Conferência antes do despacho', problem:'Itens ausentes aparecem nos períodos de maior movimento.', owner:'Expedição', due:'25/07', status:'Planejada', experience:'Reclamações por item', operational:'Falhas por 100 pedidos' },
  { id:'AC-04', title:'Roteiro de confirmação', problem:'A confirmação demora quando os canais concentram pedidos.', owner:'Atendimento', due:'17/07', status:'Verificação', experience:'Cancelamentos', operational:'Tempo de confirmação' }
];

export function cloneInitialState() {
  return { cases: structuredClone(initialCases), actions: structuredClone(initialActions), guideStep:0, guideActive:true, selectedCase:'ESC-001' };
}

export function uniqueCases(cases) { return cases.filter(item => !item.duplicateOf); }

export function calculateMetrics(cases) {
  const unique = uniqueCases(cases);
  const rated = unique.filter(item => Number.isFinite(item.rating));
  const csat = rated.length ? rated.reduce((sum,item)=>sum+item.rating,0)/rated.length : 0;
  const resolved = unique.filter(item => item.resolvedConfirmed).length;
  const responses = unique.filter(item => item.responseMinutes > 0);
  const avgResponse = responses.length ? responses.reduce((sum,item)=>sum+item.responseMinutes,0)/responses.length : 0;
  const npsResponses = unique.filter(item => Number.isFinite(item.nps));
  const promoters = npsResponses.filter(item => item.nps >= 9).length;
  const detractors = npsResponses.filter(item => item.nps <= 6).length;
  const nps = npsResponses.length ? Math.round((promoters/npsResponses.length-detractors/npsResponses.length)*100) : 0;
  return { csat:Number(csat.toFixed(1)), resolvedRate:Math.round(resolved/unique.length*100), avgResponse:Math.round(avgResponse), nps, npsResponses:npsResponses.length, open:unique.filter(item=>!['Resolvido','Vinculado'].includes(item.status)).length };
}

export function themeCounts(cases) {
  const counts = {};
  uniqueCases(cases).forEach(item => { counts[item.theme]=(counts[item.theme]||0)+1; });
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]);
}

export function canValidateAI(item) { return item.aiConfidence >= 50 && item.theme !== 'Não identificado'; }

export function canVerifyAction(action) { return Boolean(action.experience && action.operational); }
