import {
  cloneInitialState,
  calculateMetrics,
  categoryCounts,
  sectorCounts
} from './data.js';

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toastEl = document.getElementById('toast');
const storageKey = 'escuta_operacoes_state_v3';

let state = loadState();
let currentView = 'cases'; // 'cases' | 'improvements'
let filters = {
  channel: 'Todos',
  sector: 'Todos',
  status: 'Todos'
};

function loadState() {
  try {
    const raw = sessionStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : cloneInitialState();
  } catch {
    return cloneInitialState();
  }
}

function saveState() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch (err) {
    console.error('Falha ao salvar estado:', err);
  }
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2600);
}

function escapeHtml(val = '') {
  return String(val).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

function formatCurrency(val = 0) {
  return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Ícones SVG Vetoriais Limpos (Lucide-inspired)
const icons = {
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  analytics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  dollar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`
};

function statusBadge(status) {
  if (status === 'Aberto') return `<span class="badge badge-open">Aberto</span>`;
  if (status === 'Em tratamento') return `<span class="badge badge-progress">Em tratamento</span>`;
  return `<span class="badge badge-resolved">Resolvido</span>`;
}

function severityBadge(sev) {
  if (sev === 'Crítica') return `<span class="badge badge-critical">Crítica</span>`;
  if (sev === 'Alta') return `<span class="badge badge-open">Alta</span>`;
  if (sev === 'Média') return `<span class="badge badge-progress">Média</span>`;
  return `<span class="badge badge-sector">Baixa</span>`;
}

function renderShell(contentHtml, activeNav) {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-icon">E</div>
          <div class="brand-text">
            <h2>Escuta</h2>
            <small>Gestão de Ocorrências &amp; VoC</small>
          </div>
        </div>

        <nav class="nav">
          <button class="nav-item ${activeNav === 'cases' ? 'active' : ''}" data-nav="cases">
            ${icons.list}
            <span>Central de Ocorrências</span>
          </button>
          <button class="nav-item ${activeNav === 'improvements' ? 'active' : ''}" data-nav="improvements">
            ${icons.analytics}
            <span>Causa Raiz &amp; Ações</span>
          </button>
        </nav>

        <div class="sidebar-footer">
          <div class="operation-badge">
            <strong>Unidade 01 · Operação Centro</strong>
            <span>Turno da Noite · Delivery Ativo</span>
          </div>
          <button class="btn-reset" data-action="reset-state">Restaurar Dados do Turno</button>
        </div>
      </aside>

      <main class="main">
        ${contentHtml}
      </main>
    </div>
  `;
}

function renderCasesView() {
  const m = calculateMetrics(state.cases);

  // Canais, setores e status para os filtros
  const channels = ['Todos', 'WhatsApp', 'iFood', 'Saipos', 'Telefone'];
  const sectors = ['Todos', 'Cozinha / Preparo', 'Expedição / Montagem', 'Logística / Entrega', 'Atendimento / Balcão'];
  const statuses = ['Todos', 'Aberto', 'Em tratamento', 'Resolvido'];

  const filteredCases = state.cases.filter(c => {
    const matchChannel = filters.channel === 'Todos' || c.channel === filters.channel;
    const matchSector = filters.sector === 'Todos' || c.sector === filters.sector;
    const matchStatus = filters.status === 'Todos' || c.status === filters.status;
    return matchChannel && matchSector && matchStatus;
  });

  const selectedCase = state.cases.find(c => c.id === state.selectedCaseId) || filteredCases[0] || state.cases[0];

  const contentHtml = `
    <header class="topbar">
      <div class="topbar-header">
        <div class="kicker">Rotina Operacional de Pós-Venda</div>
        <h1>Central de Ocorrências do Turno</h1>
        <p>Monitoramento e tratativa em tempo real de relatos de clientes integrados aos dados do processo produtivo.</p>
      </div>
      <button class="btn btn-primary" data-action="open-new-case-modal">
        ${icons.plus}
        <span>+ Nova Ocorrência</span>
      </button>
    </header>

    <!-- Métricas do Turno -->
    <section class="metrics-grid">
      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Ocorrências do Turno</span>
          <span class="metric-icon">${icons.list}</span>
        </div>
        <div class="metric-value">${m.total}</div>
        <div class="metric-sub">${m.openCases} em aberto · ${m.inProgress} em tratamento</div>
      </article>

      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Tempo Médio 1º Contato</span>
          <span class="metric-icon">${icons.clock}</span>
        </div>
        <div class="metric-value">${m.avgSla} min</div>
        <div class="metric-sub">SLA de atendimento (Meta: &lt; 10 min)</div>
      </article>

      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Taxa de Resolução</span>
          <span class="metric-icon">${icons.check}</span>
        </div>
        <div class="metric-value">${m.resolvedRate}%</div>
        <div class="metric-sub">${m.resolved} de ${m.total} chamados solucionados</div>
      </article>

      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Custo de Indenizações</span>
          <span class="metric-icon">${icons.dollar}</span>
        </div>
        <div class="metric-value">${formatCurrency(m.totalCost)}</div>
        <div class="metric-sub">Estornos via PIX, cartões e cupons emitidos</div>
      </article>
    </section>

    <!-- Painel da Tabela de Ocorrências -->
    <section class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <h3>Fila de Chamados</h3>
          <p>${filteredCases.length} ocorrências exibidas. Clique em qualquer linha para abrir a tratativa.</p>
        </div>
        <div class="filter-bar">
          <select class="select-filter" data-filter="channel">
            ${channels.map(ch => `<option value="${ch}" ${filters.channel === ch ? 'selected' : ''}>Canal: ${ch}</option>`).join('')}
          </select>
          <select class="select-filter" data-filter="sector">
            ${sectors.map(sec => `<option value="${sec}" ${filters.sector === sec ? 'selected' : ''}>Setor: ${sec}</option>`).join('')}
          </select>
          <select class="select-filter" data-filter="status">
            ${statuses.map(st => `<option value="${st}" ${filters.status === st ? 'selected' : ''}>Status: ${st}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Código / Pedido</th>
              <th>Cliente &amp; Canal</th>
              <th>Relato Original do Cliente</th>
              <th>Categoria</th>
              <th>Setor Responsável</th>
              <th>Indenização</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredCases.map(item => `
              <tr class="table-row-clickable ${selectedCase && selectedCase.id === item.id ? 'table-row-selected' : ''}" data-case-id="${item.id}">
                <td>
                  <strong>${item.id}</strong><br>
                  <span class="meta-label">${item.order} · ${item.time}</span>
                </td>
                <td>
                  <strong>${escapeHtml(item.customer)}</strong><br>
                  <span class="meta-label">${item.channel}</span>
                </td>
                <td style="max-width: 320px;">
                  <span style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.83rem; color: #334155;">
                    "${escapeHtml(item.text)}"
                  </span>
                </td>
                <td>
                  <span style="font-weight: 500;">${escapeHtml(item.category)}</span>
                  ${item.severity === 'Crítica' ? '<br>' + severityBadge(item.severity) : ''}
                </td>
                <td><span class="badge badge-sector">${escapeHtml(item.sector)}</span></td>
                <td>
                  ${item.compensationCost > 0 
                    ? `<strong style="color: var(--danger); font-size: 0.85rem;">${formatCurrency(item.compensationCost)}</strong>` 
                    : '<span style="color: var(--text-subtle);">R$ 0,00</span>'}
                </td>
                <td>${statusBadge(item.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Detalhe da Ocorrência Selecionada (Tratativa do SAC & Engenharia de Operações) -->
    ${selectedCase ? renderCaseDetailSection(selectedCase) : ''}
  `;

  return renderShell(contentHtml, 'cases');
}

function renderCaseDetailSection(c) {
  const isDelay = c.delayMinutes > 0;

  return `
    <div class="case-detail-container" id="case-detail-view">
      <div class="detail-grid">
        
        <!-- Bloco 1: O que o cliente relatou -->
        <article class="detail-card">
          <div class="detail-card-header">
            <h4>${icons.user} 1. Relato Original do Cliente</h4>
            <span class="badge badge-sector">${c.channel}</span>
          </div>

          <div class="quote-box">
            "${escapeHtml(c.text)}"
          </div>

          <div class="meta-list">
            <div class="meta-row">
              <span class="meta-label">Cliente</span>
              <span class="meta-val">${escapeHtml(c.customer)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Pedido / Horário</span>
              <span class="meta-val">${c.order} às ${c.time}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Itens</span>
              <span class="meta-val" style="text-align: right; max-width: 60%;">${escapeHtml(c.orderItems)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Valor do Pedido</span>
              <span class="meta-val">${formatCurrency(c.orderValue)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Avaliação do Cliente</span>
              <span class="meta-val">${c.rating ? '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating) + ` (${c.rating}/5)` : 'Sem nota registrada'}</span>
            </div>
          </div>

          <div class="timeline">
            <strong style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Histórico do Atendimento</strong>
            ${c.history.map(h => `
              <div class="timeline-item">
                <span class="timeline-dot"></span>
                <span>${escapeHtml(h)}</span>
              </div>
            `).join('')}
          </div>
        </article>

        <!-- Bloco 2: Contexto Operacional da Loja -->
        <article class="detail-card">
          <div class="detail-card-header">
            <h4>${icons.clock} 2. Contexto Operacional</h4>
            <span class="badge ${isDelay ? 'badge-open' : 'badge-resolved'}">
              ${isDelay ? `+${c.delayMinutes} min de atraso` : 'Dentro do prazo planejado'}
            </span>
          </div>

          <div class="ops-metric-box">
            <div class="ops-times-row">
              <div class="ops-time-cell">
                <div class="num">${c.promisedMinutes} min</div>
                <div class="lbl">Prometido</div>
              </div>
              <div class="ops-time-cell ${isDelay ? 'alert' : ''}">
                <div class="num">${c.actualMinutes} min</div>
                <div class="lbl">Tempo Real</div>
              </div>
              <div class="ops-time-cell">
                <div class="num">${c.slaMinutes} min</div>
                <div class="lbl">1º Contato</div>
              </div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center;">
              Carga da loja no momento: <strong>${escapeHtml(c.peakLoad)}</strong>
            </div>
          </div>

          <div style="margin-top: 10px;">
            <strong style="font-size: 0.82rem; color: var(--text-main);">Diagnóstico da Causa Raiz:</strong>
            <div class="root-cause-box">
              ${escapeHtml(c.rootCause)}
            </div>
          </div>

          <div style="margin-top: auto; padding-top: 14px;">
            <button class="btn btn-secondary btn-sm" style="width: 100%;" data-action="copy-case-summary" data-id="${c.id}">
              ${icons.copy}
              <span>Copiar Resumo para a Operação</span>
            </button>
          </div>
        </article>

        <!-- Bloco 3: Tratativa Imediata & Resolução -->
        <article class="detail-card">
          <div class="detail-card-header">
            <h4>${icons.check} 3. Tratativa Imediata &amp; Desfecho</h4>
            ${statusBadge(c.status)}
          </div>

          <form id="treatment-form" class="treatment-form" data-case-id="${c.id}">
            <div class="form-group">
              <label>Ação Imediata com o Cliente (Salvar a Experiência)</label>
              <select class="form-control" name="immediateAction">
                <option ${c.immediateAction.includes('Cupom') ? 'selected' : ''}>Cupom de compensação (R$ 20)</option>
                <option ${c.immediateAction.includes('Reenvio') ? 'selected' : ''}>Reenvio imediato prioritário</option>
                <option ${c.immediateAction.includes('Estorno') ? 'selected' : ''}>Estorno integral via PIX / Cartão</option>
                <option ${c.immediateAction.includes('nutricionista') || c.immediateAction.includes('ingredientes') ? 'selected' : ''}>Esclarecimento técnico (alergia/ingrediente)</option>
                <option ${c.immediateAction.includes('Agradecimento') ? 'selected' : ''}>Agradecimento enviado + Registro na cozinha</option>
                <option ${c.immediateAction.includes('Localização') || c.immediateAction.includes('previsão') ? 'selected' : ''}>Atualização preventiva de previsão</option>
              </select>
            </div>

            <div class="form-group">
              <label>Custo da Indenização / Ressarcimento (R$)</label>
              <input type="number" step="0.50" min="0" class="form-control" name="compensationCost" value="${c.compensationCost}">
            </div>

            <div class="form-group">
              <label>Setor Ofensor (Origem da Falha)</label>
              <select class="form-control" name="sector">
                <option ${c.sector === 'Cozinha / Preparo' ? 'selected' : ''}>Cozinha / Preparo</option>
                <option ${c.sector === 'Expedição / Montagem' ? 'selected' : ''}>Expedição / Montagem</option>
                <option ${c.sector === 'Logística / Entrega' ? 'selected' : ''}>Logística / Entrega</option>
                <option ${c.sector === 'Atendimento / Balcão' ? 'selected' : ''}>Atendimento / Balcão</option>
              </select>
            </div>

            <div class="form-group">
              <label>Status do Chamado</label>
              <select class="form-control" name="status">
                <option ${c.status === 'Aberto' ? 'selected' : ''}>Aberto</option>
                <option ${c.status === 'Em tratamento' ? 'selected' : ''}>Em tratamento</option>
                <option ${c.status === 'Resolvido' ? 'selected' : ''}>Resolvido</option>
              </select>
            </div>

            <div class="treatment-actions">
              <button type="submit" class="btn btn-primary" style="flex: 1;">
                Salvar Tratativa
              </button>
            </div>
          </form>
        </article>

      </div>
    </div>
  `;
}

function renderImprovementsView() {
  const catCounts = categoryCounts(state.cases);
  const maxCat = catCounts.length > 0 ? catCounts[0][1] : 1;

  const secCounts = sectorCounts(state.cases);
  const maxSec = secCounts.length > 0 ? secCounts[0][1] : 1;

  const contentHtml = `
    <header class="topbar">
      <div class="topbar-header">
        <div class="kicker">Engenharia de Operações &amp; Gestão da Qualidade</div>
        <h1>Diagnóstico de Causa Raiz &amp; Planos de Ação</h1>
        <p>Análise de Pareto das ocorrências, ofensores por setor e planos de melhoria contínua (PDCA) do turno.</p>
      </div>
    </header>

    <div class="analytics-grid">
      <!-- Gráfico 1: Pareto por Categoria -->
      <section class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <h3>Pareto de Motivos de Reclamação</h3>
            <p>Distribuição de ocorrências por categoria no turno</p>
          </div>
          <span class="badge badge-sector">${catCounts.length} categorias</span>
        </div>
        <div class="bars-list">
          ${catCounts.map(([cat, count]) => `
            <div class="bar-item">
              <div class="bar-label-row">
                <strong>${escapeHtml(cat)}</strong>
                <span>${count} ocorrência${count > 1 ? 's' : ''} (${Math.round((count / state.cases.length) * 100)}%)</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${(count / maxCat) * 100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Gráfico 2: Ofensores por Setor -->
      <section class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <h3>Origem das Falhas por Setor</h3>
            <p>Alocação de responsabilidade operacional no processo</p>
          </div>
          <span class="badge badge-sector">${secCounts.length} setores</span>
        </div>
        <div class="bars-list">
          ${secCounts.map(([sec, count]) => `
            <div class="bar-item">
              <div class="bar-label-row">
                <strong>${escapeHtml(sec)}</strong>
                <span>${count} falha${count > 1 ? 's' : ''} (${Math.round((count / state.cases.length) * 100)}%)</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill alt" style="width: ${(count / maxSec) * 100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>

    <!-- Planos de Ação Operacional (Melhoria Contínua / PDCA) -->
    <section class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <h3>Planos de Ação Corretiva em Andamento</h3>
          <p>Medidas de processo para eliminar a reincidência dos maiores ofensores identificados no SAC</p>
        </div>
        <span class="badge badge-resolved">${state.actions.filter(a => a.status === 'Concluída').length} de ${state.actions.length} concluídas</span>
      </div>

      <div class="actions-grid">
        ${state.actions.map(action => `
          <article class="action-card">
            <div class="action-card-header">
              <h5>${escapeHtml(action.title)}</h5>
              <span class="badge ${action.status === 'Concluída' ? 'badge-resolved' : action.status === 'Em andamento' ? 'badge-progress' : 'badge-sector'}">
                ${action.status}
              </span>
            </div>

            <div class="action-card-body">
              <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 4px;">
                <strong>Gargalo:</strong> ${escapeHtml(action.problem)}
              </p>
              <p>
                <strong>Medida Operacional:</strong> ${escapeHtml(action.action)}
              </p>
            </div>

            <div class="action-metric-pill">
              Meta: ${escapeHtml(action.metric)}
            </div>

            <div class="action-footer">
              <span>Resp: <strong>${escapeHtml(action.owner)}</strong></span>
              <span>Prazo: ${action.deadline}</span>
              <button class="btn-reset" style="padding: 3px 6px;" data-toggle-action="${action.id}">
                ${action.status === 'Concluída' ? 'Reabrir' : 'Concluir'}
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  return renderShell(contentHtml, 'improvements');
}

function renderNewCaseModal() {
  return `
    <div class="modal-overlay" id="new-case-modal">
      <div class="modal">
        <div class="modal-header">
          <h3>Registrar Nova Ocorrência</h3>
          <button class="btn-reset" data-action="close-modal">✕</button>
        </div>
        <form id="new-case-form">
          <div class="modal-body">
            <div class="form-group">
              <label>Nome do Cliente *</label>
              <input class="form-control" name="customer" placeholder="Ex: Fernanda Lima" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label>Canal *</label>
                <select class="form-control" name="channel" required>
                  <option>WhatsApp</option>
                  <option>Telefone</option>
                  <option>iFood</option>
                  <option>Saipos</option>
                </select>
              </div>
              <div class="form-group">
                <label>Número do Pedido *</label>
                <input class="form-control" name="order" placeholder="Ex: PED-1065" required>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label>Valor do Pedido (R$)</label>
                <input type="number" step="0.50" class="form-control" name="orderValue" value="75.00">
              </div>
              <div class="form-group">
                <label>Categoria Inicial</label>
                <select class="form-control" name="category">
                  <option>Atraso na entrega</option>
                  <option>Item ausente</option>
                  <option>Segurança alimentar / Alérgeno</option>
                  <option>Cancelamento</option>
                  <option>Pagamento / Cobrança</option>
                  <option>Elogio / Qualidade</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Itens do Pedido</label>
              <input class="form-control" name="orderItems" placeholder="Ex: 1x Pizza Calabresa + 1x Refrigerante">
            </div>

            <div class="form-group">
              <label>Relato do Cliente (Voz do Cliente) *</label>
              <textarea class="form-control" name="text" rows="3" placeholder="Transcreva exatamente o que o cliente relatou..." required></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Registrar Chamado</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function attachEvents() {
  // Navegação
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      currentView = el.getAttribute('data-nav');
      render();
    });
  });

  // Filtros
  document.querySelectorAll('[data-filter]').forEach(select => {
    select.addEventListener('change', (e) => {
      const field = select.getAttribute('data-filter');
      filters[field] = e.target.value;
      render();
    });
  });

  // Selecionar caso na tabela
  document.querySelectorAll('[data-case-id]').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('select') || e.target.closest('input')) return;
      const id = row.getAttribute('data-case-id');
      state.selectedCaseId = id;
      saveState();
      render();
      const detailEl = document.getElementById('case-detail-view');
      if (detailEl) {
        detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Submeter formulário de tratativa
  const treatmentForm = document.getElementById('treatment-form');
  if (treatmentForm) {
    treatmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = treatmentForm.getAttribute('data-case-id');
      const formData = new FormData(treatmentForm);
      const c = state.cases.find(x => x.id === id);
      if (c) {
        c.immediateAction = formData.get('immediateAction') || c.immediateAction;
        c.compensationCost = parseFloat(formData.get('compensationCost')) || 0;
        c.sector = formData.get('sector') || c.sector;
        const newStatus = formData.get('status') || c.status;
        
        if (c.status !== newStatus) {
          c.status = newStatus;
          c.history.push(`${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · Status alterado para ${newStatus}`);
        }
        
        saveState();
        showToast(`Tratativa do chamado ${id} salva com sucesso!`);
        render();
      }
    });
  }

  // Copiar resumo da ocorrência para repasse
  document.querySelectorAll('[data-action="copy-case-summary"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const c = state.cases.find(x => x.id === id);
      if (!c) return;

      const summaryText = `[OCORRÊNCIA ${c.id} · ${c.order}]\nCliente: ${c.customer} (${c.channel})\nRelato: "${c.text}"\nSetor: ${c.sector} | Causa: ${c.rootCause}\nTratativa: ${c.immediateAction} (Custo: ${formatCurrency(c.compensationCost)})\nStatus: ${c.status}`;

      navigator.clipboard.writeText(summaryText)
        .then(() => showToast('Resumo copiado para a área de transferência!'))
        .catch(() => showToast('Erro ao copiar resumo.'));
    });
  });

  // Abrir Modal de Nova Ocorrência
  document.querySelectorAll('[data-action="open-new-case-modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      modalRoot.innerHTML = renderNewCaseModal();
      attachModalEvents();
    });
  });

  // Alternar status de ação corretiva
  document.querySelectorAll('[data-toggle-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const actId = btn.getAttribute('data-toggle-action');
      const a = state.actions.find(x => x.id === actId);
      if (a) {
        a.status = a.status === 'Concluída' ? 'Em andamento' : 'Concluída';
        saveState();
        showToast(`Plano ${a.id} atualizado para ${a.status}`);
        render();
      }
    });
  });

  // Resetar estado
  document.querySelectorAll('[data-action="reset-state"]').forEach(btn => {
    btn.addEventListener('click', () => {
      state = cloneInitialState();
      saveState();
      showToast('Dados do turno restaurados com sucesso.');
      render();
    });
  });
}

function attachModalEvents() {
  const modalOverlay = document.getElementById('new-case-modal');
  if (!modalOverlay) return;

  modalOverlay.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      modalRoot.innerHTML = '';
    });
  });

  const form = document.getElementById('new-case-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      
      const newId = `CH-${1060 + state.cases.length + 1}`;
      const newCase = {
        id: newId,
        channel: fd.get('channel'),
        customer: fd.get('customer'),
        order: fd.get('order'),
        orderValue: parseFloat(fd.get('orderValue')) || 75.00,
        orderItems: fd.get('orderItems') || 'Itens padrão do pedido',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        rating: null,
        text: fd.get('text'),
        category: fd.get('category'),
        severity: fd.get('category').includes('Alérgeno') ? 'Crítica' : 'Alta',
        sector: fd.get('category').includes('Alérgeno') ? 'Cozinha / Preparo' : 'Logística / Entrega',
        promisedMinutes: 45,
        actualMinutes: 45,
        delayMinutes: 0,
        peakLoad: '28 comandas no forno',
        rootCause: 'Ocorrência registrada no balcão/SAC em averiguação.',
        immediateAction: 'Contato imediato com o cliente para acolhimento',
        compensationCost: 0,
        status: 'Aberto',
        slaMinutes: 1,
        aiSuggestedTag: fd.get('category'),
        history: [
          `${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · Chamado aberto manualmente`
        ]
      };

      state.cases.unshift(newCase);
      state.selectedCaseId = newId;
      saveState();
      modalRoot.innerHTML = '';
      showToast(`Chamado ${newId} registrado com sucesso!`);
      render();
    });
  }
}

function render() {
  if (currentView === 'cases') {
    app.innerHTML = renderCasesView();
  } else {
    app.innerHTML = renderImprovementsView();
  }
  attachEvents();
}

// Inicialização
render();
