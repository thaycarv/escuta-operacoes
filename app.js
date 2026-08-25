import { cloneInitialState, calculateMetrics, themeCounts, canValidateAI, canVerifyAction } from './data.js';

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toastEl = document.getElementById('toast');
const storageKey = 'escuta-app-state-v2';

let state = loadState();
let selectedVersion = 'v2'; // 'v2' por padrão ou 'v1'
let currentView = 'feedbacks'; // Na v2, começa na central de feedbacks
let filters = { channel:'Todos', severity:'Todas', status:'Todos' };
let surveyRating = 0;

// Navegação Versão 2.0 (Unificada e Simplificada)
const viewsV2 = [
  ['feedbacks', '≡', 'Central de Feedbacks'],
  ['diagnostics', '⌁', 'Diagnóstico e Gargalos'],
  ['actions', '✓', 'Planos de Melhoria']
];

// Navegação Versão 1.0 (Original com 6 abas)
const viewsV1 = [
  ['dashboard', '◫', 'Visão geral'],
  ['survey', '◇', 'Avaliação do cliente'],
  ['feedbacks', '≡', 'Feedbacks'],
  ['patterns', '⌁', 'Padrões e causas'],
  ['actions', '✓', 'Melhorias'],
  ['indicators', '↗', 'Indicadores']
];

const guideStepsV1 = [
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

function shell(content, title, kicker='Voz do Cliente: Pizza House') {
  const currentNav = selectedVersion === 'v2' ? viewsV2 : viewsV1;
  return `<div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <span class="brand-mark">E</span>
        <span><strong>Escuta</strong><small>Voz do Cliente</small></span>
        <button class="btn btn-small mobile-menu" data-action="menu">Menu</button>
      </div>

      <div class="version-toggle-box">
        <span class="version-label">Modo de Visualização:</span>
        <div class="version-switch">
          <button class="version-btn ${selectedVersion==='v2'?'is-active':''}" data-version="v2">Versão 2.0</button>
          <button class="version-btn ${selectedVersion==='v1'?'is-active':''}" data-version="v1">Versão 1.0</button>
        </div>
      </div>

      <nav class="nav">
        ${currentNav.map(([id,icon,label])=>`
          <button class="nav-button ${currentView===id?'active':''}" data-view="${id}">
            <span class="nav-icon">${icon}</span>${label}
          </button>
        `).join('')}
      </nav>

      <div class="side-footer">
        <div class="demo-label">${selectedVersion==='v2'?'Versão 2.0: Interface Unificada':'Versão 1.0: Estrutura Original'}</div>
        <button class="btn btn-ghost btn-small" data-action="reset">Restaurar demonstração</button>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div>
          <div class="page-kicker">${kicker}</div>
          <h1>${title}</h1>
        </div>
        <div class="top-actions">
          ${selectedVersion === 'v1' ? `<button class="btn" data-action="guide">${state.guideActive?'Sair do roteiro':'Iniciar roteiro'}</button>` : ''}
          <button class="btn btn-secondary" data-action="new-survey-modal">Simular Avaliação do Cliente</button>
          <button class="btn btn-primary" data-action="new-feedback">+ Novo feedback manual</button>
        </div>
      </header>

      ${selectedVersion === 'v1' && state.guideActive ? renderGuideV1() : ''}
      ${content}
    </main>
  </div>`;
}

function renderGuideV1() {
  const step = guideStepsV1[state.guideStep];
  return `<section class="guide"><div class="guide-step">${state.guideStep+1}</div><div><strong>${step.title}</strong><p>${step.text}</p></div><div class="action-row"><button class="btn btn-small" data-action="guide-prev" ${state.guideStep===0?'disabled':''}>Voltar</button><button class="btn btn-small btn-primary" data-action="guide-next">${state.guideStep===guideStepsV1.length-1?'Concluir':'Avançar'}</button></div></section>`;
}

function metric(label,value,note,tone='') { return `<article class="metric"><div class="metric-label">${label}</div><div class="metric-value ${tone}">${value}</div><div class="metric-note">${note}</div></article>`; }

// ==================== VISÕES VERSÃO 2.0 ====================

function feedbacksV2() {
  const m = calculateMetrics(state.cases);
  const channels = ['Todos', ...new Set(state.cases.map(x=>x.channel))];
  const severities = ['Todas','Crítica','Alta','Moderada','Baixa','Informativa'];
  const statuses = ['Todos', ...new Set(state.cases.map(x=>x.status))];
  const items = state.cases.filter(x=>(filters.channel==='Todos'||x.channel===filters.channel)&&(filters.severity==='Todas'||x.severity===filters.severity)&&(filters.status==='Todos'||x.status===filters.status));

  const content = `
    <!-- Cenários de Demonstração Rápida -->
    <div class="quick-scenarios-bar">
      <span class="scenario-title">Cenários Operacionais em Destaque:</span>
      <div class="scenario-pills">
        <button class="scenario-pill scenario-pill--critical" data-open-case="ESC-008">
          🔴 Caso Ana: Alergia e Segurança Alimentar
        </button>
        <button class="scenario-pill scenario-pill--warning" data-open-case="ESC-001">
          🟡 Caso Marina: Atraso por Sobrecarga (43 min na cozinha)
        </button>
        <button class="scenario-pill scenario-pill--success" data-open-case="ESC-005">
          🟢 Caso Carlos: Item Ausente com Solução Confirmada
        </button>
      </div>
    </div>

    <!-- Indicadores Compactos de Entrada -->
    <section class="grid metrics" style="margin-bottom: 20px;">
      ${metric('CSAT Médio', m.csat.toFixed(1) + ' / 5', 'Percepção de qualidade', 'positive')}
      ${metric('NPS Demonstrativo', m.nps, `${m.npsResponses} respostas apuradas`, m.nps < 0 ? 'danger' : '')}
      ${metric('Tempo Médio de Resposta', m.avgResponse + ' min', 'Primeiro contato')}
      ${metric('Resolução Confirmada', m.resolvedRate + '%', 'Validação formal pelo cliente')}
    </section>

    <!-- Tabela Principal de Feedbacks -->
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Central Multicanal de Feedbacks</h3>
          <p>${items.length} de ${state.cases.length} registros cadastrados. Clique em qualquer linha para investigar o caso.</p>
        </div>
        <div class="filter-row">
          <select class="select" data-filter="channel">${channels.map(v=>`<option ${filters.channel===v?'selected':''}>${v}</option>`).join('')}</select>
          <select class="select" data-filter="severity">${severities.map(v=>`<option ${filters.severity===v?'selected':''}>${v}</option>`).join('')}</select>
          <select class="select" data-filter="status">${statuses.map(v=>`<option ${filters.status===v?'selected':''}>${v}</option>`).join('')}</select>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código / Pedido</th>
              <th>Canal</th>
              <th>Relato Original do Cliente</th>
              <th>Tema Sugerido</th>
              <th>Gravidade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item=>`
              <tr class="clickable" data-case="${item.id}">
                <td>
                  <strong>${item.id}</strong><br>
                  <span class="metric-note">${item.order} · ${item.time}</span>
                </td>
                <td>${item.channel}</td>
                <td class="quote">${escapeHtml(item.text || 'Sem comentário: contexto solicitado')}</td>
                <td>${escapeHtml(item.theme)}</td>
                <td>${badge(item.severity, severityTone(item.severity))}</td>
                <td>${badge(item.status, statusTone(item.status))}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
  return shell(content, 'Central de Feedbacks e Atendimento');
}

function caseDetailV2() {
  const item = state.cases.find(x => x.id === state.selectedCase) || state.cases[0];
  const total = Object.values(item.operational).slice(0,4).reduce((a,b)=>a+b,0);
  const canValidate = canValidateAI(item);

  const content = `
    <div class="detail-nav-bar">
      <button class="btn btn-secondary" data-view="feedbacks">← Voltar à Central de Feedbacks</button>
      <div class="detail-tags">
        ${badge(item.id, 'violet')}
        ${badge(item.severity, severityTone(item.severity))}
        ${item.critical ? badge('Intervenção Humana Obrigatória', 'red') : ''}
      </div>
      <button class="btn btn-primary" data-action="copy-case-report">📋 Copiar Parecer do Caso</button>
    </div>

    <div class="grid case-unified-grid">
      <!-- Bloco 1: O que o cliente relatou -->
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>1. Relato Original do Cliente</h3>
            <p>${item.customer} · Canal: ${item.channel} · Pedido ${item.order}</p>
          </div>
          <span class="metric-value">${item.rating ? item.rating + ' / 5' : 'Sem nota'}</span>
        </div>
        <div class="quote-box">
          <p class="quote">“${escapeHtml(item.text || 'Nota registrada sem comentário de texto.')}”</p>
        </div>
        <div class="history-box">
          <strong>Histórico Auditável do Chamado:</strong>
          <div class="timeline" style="margin-top: 10px;">
            ${item.history.map(h => `
              <div class="timeline-item">
                <span class="timeline-dot"></span>
                <div>${escapeHtml(h)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </article>

      <!-- Bloco 2: O que os dados do pedido comprovam -->
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>2. Dados Operacionais do Pedido</h3>
            <p>Confronto dos tempos reais no momento da ocorrência</p>
          </div>
          ${badge(`${total} min no total`, 'violet')}
        </div>

        <div class="evidence-grid grid" style="margin-bottom: 16px;">
          <div class="evidence">
            <span class="metric-label">1. Confirmação</span>
            <strong>${item.operational.confirmation} min</strong>
          </div>
          <div class="evidence ${item.operational.production > 35 ? 'evidence--alert' : ''}">
            <span class="metric-label">2. Cozinha (Preparo)</span>
            <strong>${item.operational.production} min</strong>
          </div>
          <div class="evidence ${item.operational.courierWait > 12 ? 'evidence--alert' : ''}">
            <span class="metric-label">3. Espera Entregador</span>
            <strong>${item.operational.courierWait} min</strong>
          </div>
          <div class="evidence">
            <span class="metric-label">4. Trajeto da Rota</span>
            <strong>${item.operational.route} min</strong>
          </div>
        </div>

        <div class="operational-summary-box">
          <strong>Carga Operacional da Loja:</strong>
          <p>${item.operational.concurrent} pedidos simultâneos no horário (${item.time}).</p>
          <small class="metric-note">
            ${item.operational.production > 35 
              ? 'Indício: Gargalo concentrado na linha de produção da cozinha.' 
              : 'Indício: Tempo de produção compatível com o padrão planejado.'}
          </small>
        </div>
      </article>

      <!-- Bloco 3: Apoio analítico e Decisão Humana -->
      <aside class="panel">
        <div class="panel-head">
          <div>
            <h3>3. Apoio Analítico e Resolução</h3>
            <p>Classificação assistida com controle humano</p>
          </div>
          ${badge(item.aiStatus==='validated'?'Validada':item.aiStatus==='corrected'?'Corrigida':'Pendente', item.aiStatus==='validated'?'green':'violet')}
        </div>

        <div class="ai-box" style="margin-bottom: 16px;">
          <p><strong>Tema Provável:</strong> ${escapeHtml(item.theme)}<br>
          <strong>Gravidade Sugerida:</strong> ${item.severity}</p>
          <div class="confidence">
            <span>Grau de Confiança Analítica:</span>
            <strong>${item.aiConfidence}%</strong>
          </div>
          <div class="confidence-track">
            <div class="confidence-fill" style="width: ${item.aiConfidence}%"></div>
          </div>
          ${!canValidate ? '<p class="danger" style="margin-top: 8px; font-size: 0.8rem;">Informações insuficientes para validação direta.</p>' : ''}
          <div class="action-row" style="margin-top: 12px;">
            <button class="btn btn-small btn-primary" data-ai="validate" ${!canValidate?'disabled':''}>Validar Sugestão</button>
            <button class="btn btn-small" data-ai="correct">Corrigir</button>
            <button class="btn btn-small" data-ai="reject">Não Utilizar</button>
          </div>
        </div>

        <div class="treatment-box">
          <label style="display:block; margin-bottom: 8px;">
            <span class="metric-label">Status do Chamado</span>
            <select class="select input" data-case-field="status">
              ${['Novo','Em análise','Aguardando ação interna','Aguardando cliente','Resolvido','Encerrado sem confirmação'].map(v=>`<option ${item.status===v?'selected':''}>${v}</option>`).join('')}
            </select>
          </label>

          <label style="display:block; margin-bottom: 14px;">
            <span class="metric-label">Gravidade Final</span>
            <select class="select input" data-case-field="severity">
              ${['Crítica','Alta','Moderada','Baixa','Informativa'].map(v=>`<option ${item.severity===v?'selected':''}>${v}</option>`).join('')}
            </select>
          </label>

          <button class="btn btn-primary full-width" data-action="confirm-resolution" ${item.resolvedConfirmed?'disabled':''}>
            ${item.resolvedConfirmed ? '✓ Resolução Validada pelo Cliente' : 'Confirmar Resolução com o Cliente'}
          </button>
        </div>
      </aside>
    </div>
  `;
  return shell(content, `Investigação do Caso ${item.id}`);
}

function diagnosticsV2() {
  const counts = themeCounts(state.cases);
  const max = Math.max(...counts.map(x => x[1]));
  const m = calculateMetrics(state.cases);

  const content = `
    <!-- Resumo dos Gargalos Identificados -->
    <section class="grid two-col" style="margin-bottom: 20px;">
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>Frequência de Temas Reclamados</h3>
            <p>Distribuição de relatos únicos nos últimos 7 dias</p>
          </div>
          ${badge('Volume por Tema', 'violet')}
        </div>
        <div class="bars">
          ${counts.map(([theme, count]) => `
            <div>
              <div class="hbar-head">
                <span>${escapeHtml(theme)}</span>
                <strong>${count} casos</strong>
              </div>
              <div class="hbar-track">
                <div class="hbar-fill" style="width: ${(count/max)*100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>Diagnóstico de Causa Raiz</h3>
            <p>Capacidade produtiva versus prazo informado</p>
          </div>
          ${badge('Hipótese Confirmada', 'green')}
        </div>
        <div class="pattern-card">
          <strong>Gargalo na Produção em Horários de Pico</strong>
          <p>Os atrasos se concentram quando a loja ultrapassa 25 pedidos simultâneos. O tempo de forno/preparo sobe para 45 minutos, mas o aplicativo continua prometendo entrega em 45 minutos no total.</p>
        </div>
        <div class="pattern-card">
          <strong>Comunicação Reativa com o Cliente</strong>
          <p>O cliente só descobre o atraso quando cobra o atendimento. A falta de aviso preventivo eleva o volume de contatos e a insatisfação.</p>
        </div>
      </article>
    </section>

    <!-- Comparativo de Resultados Antes versus Depois -->
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Impacto das Ações Corretivas</h3>
          <p>Comparativo em períodos equivalentes antes e depois da implementação das melhorias</p>
        </div>
        ${badge('Resultados Operacionais', 'positive')}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Antes da Melhoria</th>
              <th>Depois da Melhoria</th>
              <th>Resultado Observado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CSAT Médio (Satisfação)</strong></td>
              <td>3,2 / 5</td>
              <td><strong>3,8 / 5</strong></td>
              <td class="positive">Evolução positiva (+0,6 pontos)</td>
            </tr>
            <tr>
              <td><strong>Contatos por Atraso a cada 100 pedidos</strong></td>
              <td>18 contatos</td>
              <td><strong>10 contatos</strong></td>
              <td class="positive">Redução de 44% no volume de queixas</td>
            </tr>
            <tr>
              <td><strong>Tempo Total (Confirmação até Entrega)</strong></td>
              <td>76 minutos</td>
              <td><strong>68 minutos</strong></td>
              <td class="positive">Ganho de 8 minutos no ciclo</td>
            </tr>
            <tr>
              <td><strong>Taxa de Resposta da Pesquisa</strong></td>
              <td>22%</td>
              <td><strong>25%</strong></td>
              <td>Amostra em consolidação</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
  return shell(content, 'Diagnóstico de Gargalos e Causas');
}

function actionsV2() {
  const statuses = ['Planejada', 'Em andamento', 'Verificação', 'Concluída'];
  const content = `
    <section class="grid kanban">
      ${statuses.map(status => `
        <div class="kanban-col">
          <div class="kanban-title">
            <span>${status}</span>
            <strong>${state.actions.filter(a => a.status === status).length}</strong>
          </div>
          ${state.actions.filter(a => a.status === status).map(a => `
            <article class="action-card">
              <strong>${escapeHtml(a.title)}</strong>
              <p>${escapeHtml(a.problem)}</p>
              <div class="metric-note">${a.owner} · Prazo: ${a.due}</div>
              <div class="action-row" style="margin-top: 10px;">
                ${badge(a.experience, 'violet')}
                ${badge(a.operational)}
              </div>
              ${status === 'Verificação' ? `
                <button class="btn btn-small btn-primary" style="margin-top: 10px; width: 100%;" data-verify="${a.id}" ${canVerifyAction(a)?'':'disabled'}>
                  Validar Resultado
                </button>
              ` : ''}
            </article>
          `).join('')}
        </div>
      `).join('')}
    </section>

    <section class="panel" style="margin-top: 20px;">
      <div class="panel-head">
        <div>
          <h3>Metodologia de Validação Dupla</h3>
          <p>Garantia de que melhorias impactem tanto o cliente quanto a eficiência operacional</p>
        </div>
        ${badge('Governança', 'green')}
      </div>
      <p class="metric-note">
        Toda ação de melhoria deve conter obrigatoriamente um indicador de percepção do cliente (ex: CSAT, Contatos por atraso) e um indicador de processo interno (ex: Tempo de confirmação, Falhas por 100 pedidos).
      </p>
    </section>
  `;
  return shell(content, 'Planos de Melhoria Contínua');
}

// ==================== VISÕES VERSÃO 1.0 (LEGACY) ====================

function dashboardV1() {
  const m = calculateMetrics(state.cases);
  const content = `
    <section class="grid metrics">
      ${metric('CSAT médio', m.csat.toFixed(1), '+0,6 no cenário pós-ação', 'positive')}
      ${metric('NPS demonstrativo', m.nps, m.npsResponses + ' respostas: amostra reduzida', m.nps < 0 ? 'danger' : '')}
      ${metric('Resolução confirmada', m.resolvedRate + '%', 'Encerrados sem confirmação não contam')}
      ${metric('Casos em acompanhamento', m.open, '1 exige intervenção imediata', 'warning')}
    </section>
    <section class="grid two-col">
      <article class="panel"><div class="panel-head"><div><h3>Satisfação versus contatos sobre atraso</h3><p>Comparação demonstrativa dos últimos 7 períodos</p></div>${badge('Correlação, não causalidade','violet')}</div>
        <div class="chart">${[54,48,58,63,71,82,67].map((v,i)=>`<div class="chart-col"><div class="bar" style="height:${v}%"></div><div class="bar alt" style="height:${[34,39,31,49,66,79,58][i]}%"></div></div>`).join('')}</div>
        <div class="chart-labels">${['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(x=>`<span>${x}</span>`).join('')}</div>
      </article>
      <aside class="panel"><div class="panel-head"><div><h3>Padrão em investigação</h3><p>5 casos relacionados</p></div>${badge('Confiança 82%','violet')}</div>
        <div class="pattern-card"><strong>Prazo incompatível com capacidade</strong><p>Os contatos aumentam quando há mais de 25 pedidos simultâneos e o prazo permanece em 45 minutos.</p></div>
        <div class="pattern-card"><strong>Comunicação reativa</strong><p>Clientes solicitam atualização antes de receber qualquer aviso preventivo.</p></div>
        <button class="btn btn-primary" data-view="patterns">Investigar evidências</button>
      </aside>
    </section>`;
  return shell(content, 'Visão Geral (Versão 1.0)');
}

function surveyV1() {
  const content = `<section class="survey-wrap"><article class="panel survey-card"><div class="panel-head"><div><h2>Como foi seu pedido?</h2><p>Leva menos de um minuto. Sua resposta ajuda a melhorar a operação.</p></div>${badge('Tela do cliente')}</div>
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
  return shell(content, 'Avaliação do Cliente (Versão 1.0)');
}

function patternsV1() {
  const counts = themeCounts(state.cases);
  const max = Math.max(...counts.map(x => x[1]));
  const content = `<section class="grid two-col"><article class="panel"><div class="panel-head"><div><h3>Temas recorrentes</h3><p>Registros únicos (últimos 7 dias)</p></div>${badge('Taxa e volume','violet')}</div><div class="bars">${counts.map(([theme,count])=>`<div><div class="hbar-head"><span>${escapeHtml(theme)}</span><strong>${count}</strong></div><div class="hbar-track"><div class="hbar-fill" style="width:${(count/max)*100}%"></div></div></div>`).join('')}</div></article>
    <aside class="panel"><div class="panel-head"><div><h3>Hipótese em análise</h3><p>Prazo informado versus capacidade</p></div>${badge('Confiança 82%','violet')}</div><div class="pattern-card"><strong>Indício, não diagnóstico</strong><p>5 casos se concentram em períodos com mais de 25 pedidos simultâneos. A produção representa parcela maior do tempo total do que o trajeto.</p></div><button class="btn btn-primary" data-action="open-related">Abrir casos relacionados</button></aside></section>
    <section class="panel" style="margin-top:14px"><div class="panel-head"><div><h3>Evidências confrontadas</h3><p>O sistema exibe também o que contradiz a hipótese</p></div></div><div class="evidence-grid grid">
      <div class="evidence"><span class="metric-label">Pedidos simultâneos</span><strong>31 a 36</strong><span class="metric-note">nos principais casos</span></div>
      <div class="evidence"><span class="metric-label">Produção média</span><strong>45 min</strong><span class="metric-note">principal parcela observada</span></div>
      <div class="evidence"><span class="metric-label">Caso divergente</span><strong>1</strong><span class="metric-note">atraso sem saturação</span></div>
    </div></section>`;
  return shell(content, 'Padrões e Causas (Versão 1.0)');
}

function indicatorsV1() {
  const m = calculateMetrics(state.cases);
  const content = `<section class="grid metrics">${metric('CSAT',m.csat.toFixed(1)+'/5','11 avaliações válidas','positive')}${metric('NPS',m.nps,m.npsResponses+' respostas: participação visível',m.nps<0?'danger':'')}${metric('Primeira resposta',m.avgResponse+' min','Média dos registros com resposta')}${metric('Resolução confirmada',m.resolvedRate+'%','Sem confirmação permanece separado')}</section>
  <section class="grid two-col"><article class="panel"><div class="panel-head"><div><h3>Antes e depois da melhoria</h3><p>Períodos equivalentes: dados simulados</p></div>${badge('Não comprova causalidade','violet')}</div><div class="table-wrap"><table style="min-width:560px"><thead><tr><th>Indicador</th><th>Antes</th><th>Depois</th><th>Leitura</th></tr></thead><tbody>
    <tr><td>CSAT</td><td>3,2</td><td>3,8</td><td class="positive">Melhora observada</td></tr><tr><td>Contatos por atraso / 100 pedidos</td><td>18</td><td>10</td><td class="positive">Redução observada</td></tr><tr><td>Tempo de confirmação e entrega</td><td>76 min</td><td>68 min</td><td class="positive">Redução parcial</td></tr><tr><td>Taxa de resposta da pesquisa</td><td>22%</td><td>25%</td><td>Amostra ainda limitada</td></tr>
  </tbody></table></div></article><aside class="panel"><div class="panel-head"><div><h3>Leitura responsável</h3><p>Interpretação do cenário</p></div></div><div class="pattern-card"><strong>Resultado promissor</strong><p>Satisfação e contatos melhoraram, enquanto o tempo operacional caiu parcialmente.</p></div><div class="pattern-card"><strong>Limite da evidência</strong><p>A amostra é pequena e o período não isola fatores externos. A ação permanece em verificação.</p></div></aside></section>`;
  return shell(content, 'Indicadores e Resultados (Versão 1.0)');
}

// ==================== CONTROLE DE RENDERIZAÇÃO ====================

function render() {
  if (selectedVersion === 'v2') {
    if (currentView === 'case') {
      app.innerHTML = caseDetailV2();
    } else if (currentView === 'diagnostics') {
      app.innerHTML = diagnosticsV2();
    } else if (currentView === 'actions') {
      app.innerHTML = actionsV2();
    } else {
      app.innerHTML = feedbacksV2();
    }
  } else {
    // Versão 1.0
    const mapV1 = {
      dashboard: dashboardV1,
      survey: surveyV1,
      feedbacks: () => feedbacksV2(), // reutiliza a tabela com o shell V1
      case: caseDetailV2,
      patterns: patternsV1,
      actions: actionsV2,
      indicators: indicatorsV1
    };
    app.innerHTML = (mapV1[currentView] || dashboardV1)();
  }
  bindEvents();
}

function go(view) {
  currentView = view;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function copyCaseReport() {
  const item = state.cases.find(x => x.id === state.selectedCase) || state.cases[0];
  if (!item) return;
  const total = Object.values(item.operational).slice(0,4).reduce((a,b)=>a+b,0);
  const text = `*Parecer de Voz do Cliente: Caso ${item.id}*
Cliente: ${item.customer} | Canal: ${item.channel} | Pedido: ${item.order}
Horário: ${item.time} | Avaliação: ${item.rating ? item.rating + '/5' : 'Não informada'}

*1. Relato Original do Cliente:*
"${item.text || 'Sem comentário de texto registrado'}"

*2. Dados Operacionais Reais:*
- Tempo Total: ${total} min
- Confirmação: ${item.operational.confirmation} min | Preparo/Cozinha: ${item.operational.production} min
- Espera do Entregador: ${item.operational.courierWait} min | Rota: ${item.operational.route} min
- Pedidos Simultâneos na Loja: ${item.operational.concurrent}

*3. Apoio Analítico:*
- Tema Provável: ${item.theme}
- Gravidade Sugerida: ${item.severity} (Confiança: ${item.aiConfidence}%)
- Status de Validação: ${item.aiStatus}

*4. Decisão e Tratamento Humano:*
- Status Atual: ${item.status}
- Resolução Validada pelo Cliente: ${item.resolvedConfirmed ? 'Sim' : 'Pendente'}
`;
  navigator.clipboard.writeText(text);
  toast(`✓ Parecer do caso ${item.id} copiado para a área de transferência.`);
}

function bindEvents() {
  // Troca de Versão 2.0 / 1.0
  document.querySelectorAll('[data-version]').forEach(el => el.addEventListener('click', () => {
    selectedVersion = el.dataset.version;
    currentView = selectedVersion === 'v2' ? 'feedbacks' : 'dashboard';
    render();
    toast(`Alternado para a ${selectedVersion === 'v2' ? 'Versão 2.0 (Simplificada)' : 'Versão 1.0 (Original)'}`);
  }));

  // Navegação
  document.querySelectorAll('[data-view]').forEach(el => el.addEventListener('click', () => go(el.dataset.view)));
  document.querySelector('[data-action="menu"]')?.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('mobile-open'));
  
  // Roteiro V1
  document.querySelector('[data-action="guide"]')?.addEventListener('click', () => { state.guideActive = !state.guideActive; saveState(); render(); });
  document.querySelector('[data-action="guide-prev"]')?.addEventListener('click', () => { state.guideStep = Math.max(0, state.guideStep-1); currentView = guideStepsV1[state.guideStep].view; saveState(); render(); });
  document.querySelector('[data-action="guide-next"]')?.addEventListener('click', () => {
    if (state.guideStep === guideStepsV1.length-1) {
      state.guideActive = false;
      state.guideStep = 0;
      toast('Roteiro concluído.');
    } else {
      state.guideStep++;
      currentView = guideStepsV1[state.guideStep].view;
    }
    saveState();
    render();
  });

  // Ações globais
  document.querySelector('[data-action="reset"]')?.addEventListener('click', showResetModal);
  document.querySelector('[data-action="new-feedback"]')?.addEventListener('click', showNewFeedbackModal);
  document.querySelector('[data-action="new-survey-modal"]')?.addEventListener('click', showSurveyModal);
  document.querySelector('[data-action="copy-case-report"]')?.addEventListener('click', copyCaseReport);

  // Cenários rápidos
  document.querySelectorAll('[data-open-case]').forEach(el => el.addEventListener('click', () => {
    state.selectedCase = el.dataset.openCase;
    saveState();
    go('case');
  }));

  // Filtros de tabela
  document.querySelectorAll('[data-filter]').forEach(el => el.addEventListener('change', () => {
    filters[el.dataset.filter] = el.value;
    render();
  }));

  // Clique em linha de caso
  document.querySelectorAll('[data-case]').forEach(el => el.addEventListener('click', () => {
    state.selectedCase = el.dataset.case;
    saveState();
    go('case');
  }));

  // Ações de caso
  document.querySelectorAll('[data-ai]').forEach(el => el.addEventListener('click', () => handleAI(el.dataset.ai)));
  document.querySelectorAll('[data-case-field]').forEach(el => el.addEventListener('change', () => updateCaseField(el.dataset.caseField, el.value)));
  document.querySelector('[data-action="confirm-resolution"]')?.addEventListener('click', confirmResolution);
  document.querySelectorAll('[data-verify]').forEach(el => el.addEventListener('click', () => verifyAction(el.dataset.verify)));
}

function handleAI(action) {
  const item = state.cases.find(x => x.id === state.selectedCase);
  if (!item) return;
  if (action === 'validate' && !canValidateAI(item)) {
    toast('A validação exige mais contexto.');
    return;
  }
  item.aiStatus = action === 'validate' ? 'validated' : action === 'correct' ? 'corrected' : 'rejected';
  item.history.push(action === 'validate' ? 'Sugestão analítica validada por uma pessoa' : action === 'correct' ? 'Sugestão corrigida por uma pessoa' : 'Sugestão analítica não utilizada');
  saveState();
  toast('Decisão humana registrada no histórico.');
  render();
}

function updateCaseField(field, value) {
  const item = state.cases.find(x => x.id === state.selectedCase);
  if (!item) return;
  item[field] = value;
  item.history.push(`${field === 'status' ? 'Status' : 'Gravidade'} alterada para ${value}`);
  saveState();
  toast('Caso atualizado com sucesso.');
  render();
}

function confirmResolution() {
  const item = state.cases.find(x => x.id === state.selectedCase);
  if (!item) return;
  item.resolvedConfirmed = true;
  item.status = 'Resolvido';
  item.history.push('Cliente confirmou que a solução atendeu à necessidade');
  saveState();
  toast('✓ Resolução confirmada pelo cliente e indicadores atualizados.');
  render();
}

function verifyAction(id) {
  const action = state.actions.find(x => x.id === id);
  if (!action || !canVerifyAction(action)) {
    toast('Inclua indicadores de experiência e de processo.');
    return;
  }
  action.status = 'Concluída';
  saveState();
  toast('✓ Ação de melhoria validada com sucesso.');
  render();
}

function showResetModal() {
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true">
        <h2>Restaurar demonstração?</h2>
        <p>Feedbacks, classificações, status e indicadores voltarão ao cenário inicial. Nenhum dado externo será afetado.</p>
        <div class="modal-actions">
          <button class="btn" data-modal-close>Cancelar</button>
          <button class="btn btn-danger" data-reset-confirm>Restaurar Dados</button>
        </div>
      </div>
    </div>`;
  modalRoot.querySelector('[data-modal-close]').onclick = () => modalRoot.innerHTML = '';
  modalRoot.querySelector('[data-reset-confirm]').onclick = () => {
    state = cloneInitialState();
    saveState();
    filters = { channel:'Todos', severity:'Todas', status:'Todos' };
    modalRoot.innerHTML = '';
    currentView = selectedVersion === 'v2' ? 'feedbacks' : 'dashboard';
    toast('Cenário inicial restaurado com sucesso.');
    render();
  };
}

function showNewFeedbackModal() {
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <form class="modal" id="quick-feedback" role="dialog" aria-modal="true">
        <h2>Registrar feedback manual</h2>
        <p>Use para contatos recebidos por telefone ou canais sem integração direta.</p>
        <div class="form-grid">
          <label>Cliente<input class="input" name="customer" placeholder="Nome do cliente" required></label>
          <label>Canal
            <select class="select input" name="channel">
              <option>Telefone</option>
              <option>WhatsApp</option>
              <option>iFood</option>
              <option>Saipos</option>
            </select>
          </label>
          <label class="full">Relato original
            <textarea name="text" placeholder="Transcreva exatamente o que o cliente informou" required></textarea>
          </label>
          <label>Tema
            <select class="select input" name="theme">
              <option>Atendimento e comunicação</option>
              <option>Tempo de entrega</option>
              <option>Item ausente</option>
              <option>Pagamento ou cobrança</option>
              <option>Qualidade do produto</option>
              <option>Outro</option>
            </select>
          </label>
          <label>Gravidade
            <select class="select input" name="severity">
              <option>Baixa</option>
              <option>Moderada</option>
              <option>Alta</option>
              <option>Crítica</option>
            </select>
          </label>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-modal-close>Cancelar</button>
          <button class="btn btn-primary" type="submit">Registrar Chamado</button>
        </div>
      </form>
    </div>`;
  modalRoot.querySelector('[data-modal-close]').onclick = () => modalRoot.innerHTML = '';
  modalRoot.querySelector('#quick-feedback').onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const id = `ESC-${String(state.cases.length + 1).padStart(3, '0')}`;
    state.cases.unshift({
      id,
      channel: f.get('channel'),
      customer: f.get('customer'),
      order: 'Registro manual',
      rating: null,
      nps: null,
      text: f.get('text'),
      type: 'A classificar',
      theme: f.get('theme'),
      severity: f.get('severity'),
      status: 'Novo',
      time: new Date().toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' }),
      responseMinutes: 0,
      resolvedConfirmed: false,
      duplicateOf: null,
      critical: f.get('severity') === 'Crítica',
      aiConfidence: 68,
      aiStatus: 'pending',
      operational: { confirmation:0, production:0, courierWait:0, route:0, concurrent:0 },
      history: ['Feedback registrado manualmente', 'Aguardando validação humana']
    });
    saveState();
    modalRoot.innerHTML = '';
    toast(`Chamado ${id} registrado com sucesso.`);
    go('feedbacks');
  };
}

function showSurveyModal() {
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <form class="modal" id="modal-survey" role="dialog" aria-modal="true" style="max-width: 520px;">
        <h2>Simulação: Tela do Cliente</h2>
        <p>Avaliação rápida do pedido (visão do cliente final).</p>
        <div class="form-grid">
          <label>Número do pedido<input class="input" name="order" placeholder="Ex.: PH-1065" required></label>
          <label>Canal
            <select class="select input" name="channel" required>
              <option>WhatsApp</option>
              <option>iFood</option>
              <option>Saipos</option>
              <option>Telefone</option>
            </select>
          </label>
          <div class="full">
            <span class="metric-label">Nota de Satisfação (1 a 5) *</span>
            <div class="rating modal-rating" style="margin-top: 6px;">
              ${[1,2,3,4,5].map(n=>`<button type="button" data-modal-rating="${n}" class="${surveyRating===n?'selected':''}">${n}</button>`).join('')}
            </div>
          </div>
          <label class="full">Motivo principal
            <select class="select input" name="theme" required>
              <option value="">Selecione o motivo</option>
              <option>Tempo de entrega</option>
              <option>Atendimento e comunicação</option>
              <option>Item ausente</option>
              <option>Qualidade do produto</option>
              <option>Pagamento ou cobrança</option>
            </select>
          </label>
          <label class="full">O que aconteceu?
            <textarea name="text" placeholder="Descreva sua experiência com o pedido" required></textarea>
          </label>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-modal-close>Cancelar</button>
          <button class="btn btn-primary" type="submit">Enviar Avaliação</button>
        </div>
      </form>
    </div>`;
  
  modalRoot.querySelector('[data-modal-close]').onclick = () => { modalRoot.innerHTML = ''; surveyRating = 0; };
  modalRoot.querySelectorAll('[data-modal-rating]').forEach(btn => btn.onclick = () => {
    surveyRating = Number(btn.dataset.modalRating);
    modalRoot.querySelectorAll('[data-modal-rating]').forEach(b => b.classList.toggle('selected', b === btn));
  });

  modalRoot.querySelector('#modal-survey').onsubmit = e => {
    e.preventDefault();
    if (!surveyRating) {
      toast('Selecione uma nota de satisfação de 1 a 5.');
      return;
    }
    const f = new FormData(e.target);
    const id = `ESC-${String(state.cases.length + 1).padStart(3, '0')}`;
    state.cases.unshift({
      id,
      channel: f.get('channel'),
      customer: 'Cliente da Loja',
      order: f.get('order'),
      rating: surveyRating,
      nps: null,
      text: f.get('text'),
      type: 'A classificar',
      theme: f.get('theme'),
      severity: surveyRating <= 2 ? 'Alta' : 'Moderada',
      status: 'Novo',
      time: new Date().toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' }),
      responseMinutes: 0,
      resolvedConfirmed: false,
      duplicateOf: null,
      critical: false,
      aiConfidence: 78,
      aiStatus: 'pending',
      operational: { confirmation: 5, production: 38, courierWait: 12, route: 10, concurrent: 28 },
      history: ['Avaliação enviada pelo cliente', 'Aguardando validação analítica']
    });
    saveState();
    surveyRating = 0;
    modalRoot.innerHTML = '';
    toast(`✓ Avaliação ${id} registrada com sucesso.`);
    go('feedbacks');
  };
}

render();
