import { cloneInitialState, calculateMetrics, themeCounts, canValidateAI, canVerifyAction } from './data.js';

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toastEl = document.getElementById('toast');
const storageKey = 'escuta-demo-v1';

let state = loadState();
let currentView = 'dashboard';
let filters = { channel:'Todos', severity:'Todas', status:'Todos' };
let surveyRating = 0;

const views = [
  ['dashboard','◫','Visão geral'],
  ['survey','◇','Avaliação do cliente'],
  ['feedbacks','≡','Feedbacks'],
  ['patterns','⌁','Padrões e causas'],
  ['actions','✓','Melhorias'],
  ['indicators','↗','Indicadores']
];

const guideSteps = [
  { view:'dashboard', title:'Queda identificada', text:'Observe a satisfação e o aumento dos contatos relacionados a atrasos.' },
  { view:'patterns', title:'Padrão sugerido', text:'Compare prazo informado, volume acumulado e ausência de atualização.' },
  { view:'feedbacks', title:'Evidências abertas', text:'Consulte os relatos associados e preserve os casos divergentes.' },
  { view:'case', title:'Caso investigado', text:'Confronte o relato com os dados reais das etapas do pedido.' },
  { view:'patterns', title:'Causa analisada', text:'A hipótese inicial é confrontada com produção, espera e trajeto.' },
  { view:'actions', title:'Melhoria executada', text:'Acompanhe o ajuste de prazo e a comunicação preventiva.' },
  { view:'indicators', title:'Resultado verificado', text:'Compare indicadores de experiência e de operação.' }
];

function loadState() {
  try { return JSON.parse(sessionStorage.getItem(storageKey)) || cloneInitialState(); }
  catch { return cloneInitialState(); }
}
function saveState() { sessionStorage.setItem(storageKey, JSON.stringify(state)); }
function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function toast(message) { toastEl.textContent=message; toastEl.classList.add('show'); setTimeout(()=>toastEl.classList.remove('show'),2400); }
function badge(text, tone='') { return `<span class="badge ${tone}">${escapeHtml(text)}</span>`; }
function severityTone(value) { return value==='Crítica'?'red':value==='Alta'?'amber':value==='Informativa'?'green':'violet'; }
function statusTone(value) { return value==='Resolvido'?'green':value==='Novo'?'red':value==='Aguardando ação interna'?'amber':'violet'; }

function shell(content, title, kicker='Pizza House · cenário demonstrativo') {
  return `<div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><span class="brand-mark">E</span><span><strong>Escuta</strong><small>Voz do Cliente</small></span><button class="btn btn-small mobile-menu" data-action="menu">Menu</button></div>
      <nav class="nav">${views.map(([id,icon,label])=>`<button class="nav-button ${currentView===id?'active':''}" data-view="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}</nav>
      <div class="side-footer"><div class="demo-label">Dados simulados · IA como apoio</div><button class="btn btn-ghost btn-small" data-action="reset">Restaurar demonstração</button></div>
    </aside>
    <main class="main">
      <header class="topbar"><div><div class="page-kicker">${kicker}</div><h1>${title}</h1></div><div class="top-actions"><button class="btn" data-action="guide">${state.guideActive?'Sair do roteiro':'Iniciar roteiro'}</button><button class="btn btn-primary" data-action="new-feedback">+ Novo feedback</button></div></header>
      ${state.guideActive ? renderGuide() : ''}
      ${content}
    </main>
  </div>`;
}

function renderGuide() {
  const step=guideSteps[state.guideStep];
  return `<section class="guide"><div class="guide-step">${state.guideStep+1}</div><div><strong>${step.title}</strong><p>${step.text}</p></div><div class="action-row"><button class="btn btn-small" data-action="guide-prev" ${state.guideStep===0?'disabled':''}>Voltar</button><button class="btn btn-small btn-primary" data-action="guide-next">${state.guideStep===guideSteps.length-1?'Concluir':'Avançar'}</button></div></section>`;
}

function metric(label,value,note,tone='') { return `<article class="metric"><div class="metric-label">${label}</div><div class="metric-value ${tone}">${value}</div><div class="metric-note">${note}</div></article>`; }

function dashboard() {
  const m=calculateMetrics(state.cases);
  const content=`
    <section class="grid metrics">
      ${metric('CSAT médio',m.csat.toFixed(1),'+0,6 no cenário pós-ação','positive')}
      ${metric('NPS demonstrativo',m.nps,m.npsResponses+' respostas · amostra reduzida',m.nps<0?'danger':'')}
      ${metric('Resolução confirmada',m.resolvedRate+'%','Encerrados sem confirmação não contam')}
      ${metric('Casos em acompanhamento',m.open,'1 exige intervenção imediata','warning')}
    </section>
    <section class="grid two-col">
      <article class="panel"><div class="panel-head"><div><h3>Satisfação × contatos sobre atraso</h3><p>Comparação demonstrativa dos últimos 7 períodos</p></div>${badge('Correlação, não causalidade','violet')}</div>
        <div class="chart">${[54,48,58,63,71,82,67].map((v,i)=>`<div class="chart-col"><div class="bar" style="height:${v}%"></div><div class="bar alt" style="height:${[34,39,31,49,66,79,58][i]}%"></div></div>`).join('')}</div>
        <div class="chart-labels">${['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(x=>`<span>${x}</span>`).join('')}</div>
      </article>
      <aside class="panel"><div class="panel-head"><div><h3>Padrão em investigação</h3><p>5 casos relacionados</p></div>${badge('Confiança 82%','violet')}</div>
        <div class="pattern-card"><strong>Prazo incompatível com capacidade</strong><p>Os contatos aumentam quando há mais de 25 pedidos simultâneos e o prazo permanece em 45 minutos.</p></div>
        <div class="pattern-card"><strong>Comunicação reativa</strong><p>Clientes solicitam atualização antes de receber qualquer aviso preventivo.</p></div>
        <button class="btn btn-primary" data-view="patterns">Investigar evidências</button>
      </aside>
    </section>`;
  return shell(content,'Experiência do cliente');
}

function survey() {
  const content=`<section class="survey-wrap"><article class="panel survey-card"><div class="panel-head"><div><h2>Como foi seu pedido?</h2><p>Leva menos de um minuto. Sua resposta ajuda a melhorar a operação.</p></div>${badge('Tela do cliente')}</div>
    <form id="survey-form" class="form-grid">
      <label>Número do pedido<input class="input" name="order" placeholder="Ex.: PH-1062" required></label>
      <label>Canal<select class="select input" name="channel" required><option>WhatsApp</option><option>iFood</option><option>Saipos</option><option>Telefone</option></select></label>
      <div class="full"><span class="metric-label">Satisfação com este pedido *</span><div class="rating">${[1,2,3,4,5].map(n=>`<button type="button" data-rating="${n}" class="${surveyRating===n?'selected':''}" aria-label="Nota ${n}">${n}</button>`).join('')}</div></div>
      <label class="full">Motivo principal<select class="select input" name="theme" required><option value="">Selecione</option><option>Qualidade do produto</option><option>Item ausente</option><option>Tempo de entrega</option><option>Atendimento e comunicação</option><option>Pagamento ou cobrança</option><option>Outro</option></select></label>
      <label class="full">Conte o que aconteceu<textarea name="text" placeholder="Descreva sua experiência" required></textarea></label>
      <label>Probabilidade de recomendar (opcional)<select class="select input" name="nps"><option value="">Não responder</option>${Array.from({length:11},(_,i)=>`<option>${i}</option>`).join('')}</select></label>
      <label>Contato (opcional)<input class="input" name="contact" placeholder="WhatsApp ou telefone"></label>
      <div class="full action-row"><button class="btn btn-primary" type="submit">Enviar avaliação</button><span class="metric-note">Sua linguagem original será preservada.</span></div>
    </form>
  </article></section>`;
  return shell(content,'Avaliação do cliente','Experiência simples · classificação acontece internamente');
}

function feedbacks() {
  const channels=['Todos',...new Set(state.cases.map(x=>x.channel))];
  const severities=['Todas','Crítica','Alta','Moderada','Baixa','Informativa'];
  const statuses=['Todos',...new Set(state.cases.map(x=>x.status))];
  const items=state.cases.filter(x=>(filters.channel==='Todos'||x.channel===filters.channel)&&(filters.severity==='Todas'||x.severity===filters.severity)&&(filters.status==='Todos'||x.status===filters.status));
  const content=`<section class="panel"><div class="panel-head"><div><h3>Central multicanal</h3><p>${items.length} de ${state.cases.length} registros · duplicidades vinculadas permanecem visíveis</p></div><div class="filter-row">
    <select class="select" data-filter="channel">${channels.map(v=>`<option ${filters.channel===v?'selected':''}>${v}</option>`).join('')}</select>
    <select class="select" data-filter="severity">${severities.map(v=>`<option ${filters.severity===v?'selected':''}>${v}</option>`).join('')}</select>
    <select class="select" data-filter="status">${statuses.map(v=>`<option ${filters.status===v?'selected':''}>${v}</option>`).join('')}</select></div></div>
    <div class="table-wrap"><table><thead><tr><th>Caso</th><th>Canal</th><th>Relato original</th><th>Tema</th><th>Gravidade</th><th>Status</th></tr></thead><tbody>${items.map(item=>`<tr class="clickable" data-case="${item.id}"><td><strong>${item.id}</strong><br><span class="metric-note">${item.order} · ${item.time}</span></td><td>${item.channel}</td><td class="quote">${escapeHtml(item.text||'Sem comentário — contexto solicitado')}</td><td>${escapeHtml(item.theme)}</td><td>${badge(item.severity,severityTone(item.severity))}</td><td>${badge(item.status,statusTone(item.status))}</td></tr>`).join('')}</tbody></table></div>
  </section>`;
  return shell(content,'Central de feedbacks');
}

function caseDetail() {
  const item=state.cases.find(x=>x.id===state.selectedCase)||state.cases[0];
  const total=Object.values(item.operational).slice(0,4).reduce((a,b)=>a+b,0);
  const canValidate=canValidateAI(item);
  const content=`<div class="action-row" style="margin-bottom:14px"><button class="btn" data-view="feedbacks">← Voltar aos feedbacks</button>${badge(item.id,'violet')}${badge(item.severity,severityTone(item.severity))}${item.critical?badge('Intervenção humana','red'):''}</div>
  <section class="grid case-layout"><div class="grid">
    <article class="panel"><div class="panel-head"><div><h3>Relato preservado</h3><p>${item.customer} · ${item.channel} · pedido ${item.order}</p></div><span class="metric-value">${item.rating}/5</span></div><p class="quote">“${escapeHtml(item.text||'Nota recebida sem comentário.')}”</p></article>
    <article class="panel"><div class="panel-head"><div><h3>Leitura operacional</h3><p>${total} min entre confirmação e fim do trajeto · ${item.operational.concurrent} pedidos simultâneos</p></div>${badge('Dados do pedido')}</div>
      <div class="evidence-grid grid">${[['Confirmação',item.operational.confirmation],['Produção',item.operational.production],['Espera entregador',item.operational.courierWait],['Trajeto',item.operational.route]].map(([k,v])=>`<div class="evidence"><span class="metric-label">${k}</span><strong>${v} min</strong></div>`).join('')}</div>
    </article>
    <article class="panel"><div class="panel-head"><div><h3>Histórico do caso</h3><p>Registro auditável das ações</p></div></div><div class="timeline">${item.history.map(h=>`<div class="timeline-item"><span class="timeline-dot"></span><div>${escapeHtml(h)}</div></div>`).join('')}</div></article>
  </div><aside class="grid">
    <article class="ai-box"><div class="panel-head"><div><h3>Apoio interpretativo</h3><p>Sugestão editável</p></div>${badge(item.aiStatus==='validated'?'Validada':item.aiStatus==='corrected'?'Corrigida':'Pendente',item.aiStatus==='validated'?'green':'violet')}</div>
      <p><strong>Tema provável:</strong> ${escapeHtml(item.theme)}<br><strong>Gravidade sugerida:</strong> ${item.severity}<br><strong>Evidência:</strong> relato e tempos operacionais vinculados ao pedido.</p>
      <div class="confidence"><span>Confiança</span><span>${item.aiConfidence}%</span></div><div class="confidence-track"><div class="confidence-fill" style="width:${item.aiConfidence}%"></div></div>
      ${!canValidate?'<p class="danger">Informações insuficientes. A validação exige revisão do contexto.</p>':''}
      <div class="action-row"><button class="btn btn-small btn-primary" data-ai="validate" ${!canValidate?'disabled':''}>Validar</button><button class="btn btn-small" data-ai="correct">Corrigir</button><button class="btn btn-small" data-ai="reject">Não utilizar</button></div>
    </article>
    <article class="panel"><div class="panel-head"><div><h3>Tratamento</h3><p>Decisão humana</p></div></div>
      <label>Gravidade<select class="select input" data-case-field="severity">${['Crítica','Alta','Moderada','Baixa','Informativa'].map(v=>`<option ${item.severity===v?'selected':''}>${v}</option>`).join('')}</select></label><br>
      <label>Status<select class="select input" data-case-field="status">${['Novo','Em análise','Aguardando ação interna','Aguardando cliente','Resolvido','Encerrado sem confirmação'].map(v=>`<option ${item.status===v?'selected':''}>${v}</option>`).join('')}</select></label><br>
      <button class="btn btn-primary" data-action="confirm-resolution" ${item.resolvedConfirmed?'disabled':''}>${item.resolvedConfirmed?'Resolução confirmada':'Confirmar resolução pelo cliente'}</button>
    </article>
  </aside></section>`;
  return shell(content,'Detalhe do caso');
}

function patterns() {
  const counts=themeCounts(state.cases); const max=Math.max(...counts.map(x=>x[1]));
  const content=`<section class="grid two-col"><article class="panel"><div class="panel-head"><div><h3>Temas recorrentes</h3><p>Registros únicos · últimos 7 dias</p></div>${badge('Taxa + volume','violet')}</div><div class="bars">${counts.map(([theme,count])=>`<div><div class="hbar-head"><span>${escapeHtml(theme)}</span><strong>${count}</strong></div><div class="hbar-track"><div class="hbar-fill" style="width:${count/max*100}%"></div></div></div>`).join('')}</div></article>
    <aside class="panel"><div class="panel-head"><div><h3>Hipótese em análise</h3><p>Prazo informado × capacidade</p></div>${badge('Confiança 82%','violet')}</div><div class="pattern-card"><strong>Indício, não diagnóstico</strong><p>5 casos se concentram em períodos acima de 25 pedidos simultâneos. A produção representa parcela maior do tempo total do que o trajeto.</p></div><button class="btn btn-primary" data-action="open-related">Abrir casos relacionados</button></aside></section>
    <section class="panel" style="margin-top:14px"><div class="panel-head"><div><h3>Evidências confrontadas</h3><p>O sistema exibe também o que contradiz a hipótese</p></div></div><div class="evidence-grid grid">
      <div class="evidence"><span class="metric-label">Pedidos simultâneos</span><strong>31–36</strong><span class="metric-note">nos principais casos</span></div>
      <div class="evidence"><span class="metric-label">Produção média</span><strong>45 min</strong><span class="metric-note">principal parcela observada</span></div>
      <div class="evidence"><span class="metric-label">Caso divergente</span><strong>1</strong><span class="metric-note">atraso sem saturação</span></div>
    </div></section>`;
  return shell(content,'Padrões e causas');
}

function actionsView() {
  const statuses=['Planejada','Em andamento','Verificação','Concluída'];
  const content=`<section class="grid kanban">${statuses.map(status=>`<div class="kanban-col"><div class="kanban-title"><span>${status}</span><strong>${state.actions.filter(a=>a.status===status).length}</strong></div>${state.actions.filter(a=>a.status===status).map(a=>`<article class="action-card"><strong>${escapeHtml(a.title)}</strong><p>${escapeHtml(a.problem)}</p><div class="metric-note">${a.owner} · até ${a.due}</div><div class="action-row" style="margin-top:10px">${badge(a.experience,'violet')}${badge(a.operational)}</div>${status==='Verificação'?`<button class="btn btn-small btn-primary" style="margin-top:10px" data-verify="${a.id}" ${canVerifyAction(a)?'':'disabled'}>Validar resultado</button>`:''}</article>`).join('')}</div>`).join('')}</section>
    <section class="panel" style="margin-top:14px"><div class="panel-head"><div><h3>Critério de validação</h3><p>Nenhuma melhoria é confirmada apenas por percepção.</p></div>${badge('Experiência + operação','green')}</div><p class="metric-note">Cada ação combina um indicador de experiência do cliente e um indicador operacional. Períodos precisam ser comparáveis e fatores externos permanecem visíveis.</p></section>`;
  return shell(content,'Planos de melhoria');
}

function indicators() {
  const m=calculateMetrics(state.cases);
  const content=`<section class="grid metrics">${metric('CSAT',m.csat.toFixed(1)+'/5','11 avaliações válidas','positive')}${metric('NPS',m.nps,m.npsResponses+' respostas · participação visível',m.nps<0?'danger':'')}${metric('Primeira resposta',m.avgResponse+' min','Média dos registros com resposta')}${metric('Resolução confirmada',m.resolvedRate+'%','Sem confirmação permanece separado')}</section>
  <section class="grid two-col"><article class="panel"><div class="panel-head"><div><h3>Antes e depois da melhoria</h3><p>Períodos equivalentes · dados simulados</p></div>${badge('Não comprova causalidade','violet')}</div><div class="table-wrap"><table style="min-width:560px"><thead><tr><th>Indicador</th><th>Antes</th><th>Depois</th><th>Leitura</th></tr></thead><tbody>
    <tr><td>CSAT</td><td>3,2</td><td>3,8</td><td class="positive">Melhora observada</td></tr><tr><td>Contatos por atraso / 100 pedidos</td><td>18</td><td>10</td><td class="positive">Redução observada</td></tr><tr><td>Tempo confirmação–entrega</td><td>76 min</td><td>68 min</td><td class="positive">Redução parcial</td></tr><tr><td>Taxa de resposta da pesquisa</td><td>22%</td><td>25%</td><td>Amostra ainda limitada</td></tr>
  </tbody></table></div></article><aside class="panel"><div class="panel-head"><div><h3>Leitura responsável</h3><p>Interpretação do cenário</p></div></div><div class="pattern-card"><strong>Resultado promissor</strong><p>Satisfação e contatos melhoraram, enquanto o tempo operacional caiu parcialmente.</p></div><div class="pattern-card"><strong>Limite da evidência</strong><p>A amostra é pequena e o período não isola fatores externos. A ação permanece em verificação.</p></div></aside></section>`;
  return shell(content,'Indicadores e resultados');
}

function render() {
  const map={dashboard,survey,feedbacks,case:caseDetail,patterns,actions:actionsView,indicators};
  app.innerHTML=(map[currentView]||dashboard)();
  bindEvents();
}

function go(view) { currentView=view; window.scrollTo({top:0,behavior:'smooth'}); render(); }

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.view)));
  document.querySelector('[data-action="menu"]')?.addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('mobile-open'));
  document.querySelector('[data-action="guide"]')?.addEventListener('click',()=>{state.guideActive=!state.guideActive;saveState();render();});
  document.querySelector('[data-action="guide-prev"]')?.addEventListener('click',()=>{state.guideStep=Math.max(0,state.guideStep-1);currentView=guideSteps[state.guideStep].view;saveState();render();});
  document.querySelector('[data-action="guide-next"]')?.addEventListener('click',()=>{if(state.guideStep===guideSteps.length-1){state.guideActive=false;state.guideStep=0;toast('Roteiro concluído. A exploração livre continua disponível.');}else{state.guideStep++;currentView=guideSteps[state.guideStep].view;}saveState();render();});
  document.querySelector('[data-action="reset"]')?.addEventListener('click',showResetModal);
  document.querySelector('[data-action="new-feedback"]')?.addEventListener('click',showNewFeedbackModal);
  document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('change',()=>{filters[el.dataset.filter]=el.value;render();}));
  document.querySelectorAll('[data-case]').forEach(el=>el.addEventListener('click',()=>{state.selectedCase=el.dataset.case;saveState();go('case');}));
  document.querySelectorAll('[data-rating]').forEach(el=>el.addEventListener('click',()=>{surveyRating=Number(el.dataset.rating);document.querySelectorAll('[data-rating]').forEach(button=>button.classList.toggle('selected',button===el));}));
  document.getElementById('survey-form')?.addEventListener('submit',submitSurvey);
  document.querySelectorAll('[data-ai]').forEach(el=>el.addEventListener('click',()=>handleAI(el.dataset.ai)));
  document.querySelectorAll('[data-case-field]').forEach(el=>el.addEventListener('change',()=>updateCaseField(el.dataset.caseField,el.value)));
  document.querySelector('[data-action="confirm-resolution"]')?.addEventListener('click',confirmResolution);
  document.querySelector('[data-action="open-related"]')?.addEventListener('click',()=>{filters={channel:'Todos',severity:'Todas',status:'Todos'};go('feedbacks');toast('Casos relacionados disponíveis na central.');});
  document.querySelectorAll('[data-verify]').forEach(el=>el.addEventListener('click',()=>verifyAction(el.dataset.verify)));
}

function submitSurvey(event) {
  event.preventDefault();
  if(!surveyRating){toast('Selecione uma nota de satisfação.');return;}
  const form=new FormData(event.target); const id=`ESC-${String(state.cases.length+1).padStart(3,'0')}`;
  state.cases.unshift({id,channel:form.get('channel'),customer:'Cliente demonstrativo',order:form.get('order'),rating:surveyRating,nps:form.get('nps')===''?null:Number(form.get('nps')),text:form.get('text'),type:'A classificar',theme:form.get('theme'),severity:'Baixa',status:'Novo',time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),responseMinutes:0,resolvedConfirmed:false,duplicateOf:null,critical:false,aiConfidence:72,aiStatus:'pending',operational:{confirmation:0,production:0,courierWait:0,route:0,concurrent:0},history:['Feedback registrado pela tela do cliente','Aguardando revisão humana']});
  saveState();surveyRating=0;toast(`Feedback ${id} registrado.`);go('feedbacks');
}

function activeCase(){return state.cases.find(x=>x.id===state.selectedCase);}
function handleAI(action){const item=activeCase();if(!item)return;if(action==='validate'&&!canValidateAI(item)){toast('A validação exige mais contexto.');return;}item.aiStatus=action==='validate'?'validated':action==='correct'?'corrected':'rejected';item.history.push(action==='validate'?'Sugestão da IA validada por uma pessoa':action==='correct'?'Sugestão corrigida por uma pessoa':'Sugestão da IA não utilizada');saveState();toast('Decisão humana registrada no histórico.');render();}
function updateCaseField(field,value){const item=activeCase();item[field]=value;item.history.push(`${field==='status'?'Status':'Gravidade'} alterada para ${value}`);saveState();toast('Caso atualizado.');render();}
function confirmResolution(){const item=activeCase();item.resolvedConfirmed=true;item.status='Resolvido';item.history.push('Cliente confirmou que a solução funcionou');saveState();toast('Resolução confirmada e indicador atualizado.');render();}
function verifyAction(id){const action=state.actions.find(x=>x.id===id);if(!canVerifyAction(action)){toast('Inclua indicadores de experiência e operação.');return;}action.status='Concluída';toast('Resultado validado com os dois indicadores.');saveState();render();}

function showResetModal(){modalRoot.innerHTML=`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true"><h2>Restaurar demonstração?</h2><p>Feedbacks, classificações, status e indicadores voltarão ao cenário inicial. Nenhum dado externo será afetado.</p><div class="modal-actions"><button class="btn" data-modal-close>Cancelar</button><button class="btn btn-danger" data-reset-confirm>Restaurar</button></div></div></div>`;modalRoot.querySelector('[data-modal-close]').onclick=()=>modalRoot.innerHTML='';modalRoot.querySelector('[data-reset-confirm]').onclick=()=>{state=cloneInitialState();saveState();filters={channel:'Todos',severity:'Todas',status:'Todos'};modalRoot.innerHTML='';currentView='dashboard';toast('Cenário inicial restaurado.');render();};}

function showNewFeedbackModal(){modalRoot.innerHTML=`<div class="modal-backdrop"><form class="modal" id="quick-feedback" role="dialog" aria-modal="true"><h2>Registrar feedback manual</h2><p>Use para contatos recebidos por telefone ou canais sem integração.</p><div class="form-grid"><label>Cliente<input class="input" name="customer" required></label><label>Canal<select class="select input" name="channel"><option>Telefone</option><option>WhatsApp</option><option>iFood</option><option>Saipos</option></select></label><label class="full">Relato original<textarea name="text" required></textarea></label><label>Tema<select class="select input" name="theme"><option>Atendimento e comunicação</option><option>Tempo de entrega</option><option>Item ausente</option><option>Pagamento ou cobrança</option><option>Outro</option></select></label><label>Gravidade<select class="select input" name="severity"><option>Baixa</option><option>Moderada</option><option>Alta</option><option>Crítica</option></select></label></div><div class="modal-actions"><button type="button" class="btn" data-modal-close>Cancelar</button><button class="btn btn-primary" type="submit">Registrar</button></div></form></div>`;modalRoot.querySelector('[data-modal-close]').onclick=()=>modalRoot.innerHTML='';modalRoot.querySelector('#quick-feedback').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const id=`ESC-${String(state.cases.length+1).padStart(3,'0')}`;state.cases.unshift({id,channel:f.get('channel'),customer:f.get('customer'),order:'Registro manual',rating:null,nps:null,text:f.get('text'),type:'A classificar',theme:f.get('theme'),severity:f.get('severity'),status:'Novo',time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),responseMinutes:0,resolvedConfirmed:false,duplicateOf:null,critical:f.get('severity')==='Crítica',aiConfidence:68,aiStatus:'pending',operational:{confirmation:0,production:0,courierWait:0,route:0,concurrent:0},history:['Feedback registrado manualmente','Aguardando validação humana']});saveState();modalRoot.innerHTML='';toast(`${id} registrado sem alterar o relato.`);go('feedbacks');};}

render();
