import {
  cloneInitialState,
  calculateMetrics,
  categoryCounts,
  sectorCounts
} from './data.js';

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toastEl = document.getElementById('toast');
const storageKey = 'radarsocial_escuta_v4';

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
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
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
          <div class="brand-icon">R</div>
          <div class="brand-text">
            <h2>RadarSocial</h2>
            <small>Escuta Ativa &amp; Ouvidoria</small>
          </div>
        </div>

        <nav class="nav">
          <button class="nav-item ${activeNav === 'cases' ? 'active' : ''}" data-nav="cases">
            ${icons.list}
            <span>Fila de Manifestações</span>
          </button>
          <button class="nav-item ${activeNav === 'improvements' ? 'active' : ''}" data-nav="improvements">
            ${icons.analytics}
            <span>Causa Raiz &amp; Ações</span>
          </button>
        </nav>

        <div class="sidebar-footer">
          <div class="operation-badge">
            <strong>Ecossistema RadarSocial</strong>
            <span>Polos Territoriais &amp; Comunidades</span>
          </div>
          <button class="btn-reset" data-action="reset-state">Restaurar Dados</button>
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

  const channels = ['Todos', 'WhatsApp Comunitário', 'Reunião de Polo / Presencial', 'Ouvidoria Digital', 'Formulário de Aluno/Turma'];
  const sectors = ['Todos', 'Infraestrutura & Redes', 'Coordenação Pedagógica', 'Qualidade & Nutrição', 'Planejamento & Operações', 'Parcerias & Empregabilidade'];
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
        <div class="kicker">Governança Territorial &amp; Impacto Social</div>
        <h1>Fila de Manifestações dos Polos</h1>
        <p>Acolhimento contínuo de relatos de beneficiários e lideranças comunitárias integrado às metas dos projetos sociais.</p>
      </div>
      <button class="btn btn-primary" data-action="open-new-case-modal">
        ${icons.plus}
        <span>+ Nova Manifestação</span>
      </button>
    </header>

    <!-- Métricas do Módulo -->
    <section class="metrics-grid">
      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Manifestações Registradas</span>
          <span class="metric-icon">${icons.list}</span>
        </div>
        <div class="metric-value">${m.total}</div>
        <div class="metric-sub">${m.openCases} em aberto · ${m.inProgress} em tratamento</div>
      </article>

      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Tempo Médio de Acolhimento</span>
          <span class="metric-icon">${icons.clock}</span>
        </div>
        <div class="metric-value">${m.avgSla}h</div>
        <div class="metric-sub">SLA Comunitário (Meta: &lt; 4 horas)</div>
      </article>

      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Taxa de Resolução</span>
          <span class="metric-icon">${icons.check}</span>
        </div>
        <div class="metric-value">${m.resolvedRate}%</div>
        <div class="metric-sub">${m.resolved} de ${m.total} demandas atendidas</div>
      </article>

      <article class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Apoio &amp; Reparos Emergenciais</span>
          <span class="metric-icon">${icons.shield}</span>
        </div>
        <div class="metric-value">${formatCurrency(m.totalCost)}</div>
        <div class="metric-sub">Insumos e contingência nos polos</div>
      </article>
    </section>

    <!-- Tabela de Ocorrências -->
    <section class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <h3>Ocorrências &amp; Relatos Territoriais</h3>
          <p>${filteredCases.length} registros exibidos. Clique em qualquer linha para abrir a tratativa.</p>
        </div>
        <div class="filter-bar">
          <select class="select-filter" data-filter="channel">
            ${channels.map(ch => `<option value="${ch}" ${filters.channel === ch ? 'selected' : ''}>Canal: ${ch}</option>`).join('')}
          </select>
          <select class="select-filter" data-filter="sector">
            ${sectors.map(sec => `<option value="${sec}" ${filters.sector === sec ? 'selected' : ''}>Frente: ${sec}</option>`).join('')}
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
              <th>Protocolo / Data</th>
              <th>Beneficiário &amp; Polo</th>
              <th>Iniciativa Vinculada</th>
              <th>Relato da Comunidade</th>
              <th>Categoria</th>
              <th>Frente Responsável</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredCases.map(item => `
              <tr class="table-row-clickable ${selectedCase && selectedCase.id === item.id ? 'table-row-selected' : ''}" data-case-id="${item.id}">
                <td>
                  <strong>${item.id}</strong><br>
                  <span class="meta-label">${item.date} · ${item.time}</span>
                </td>
                <td>
                  <strong>${escapeHtml(item.beneficiary)}</strong><br>
                  <span class="meta-label">${escapeHtml(item.hub)} · ${item.channel}</span>
                </td>
                <td>
                  <span class="badge badge-sector">${escapeHtml(item.projectName)}</span>
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
                <td>${statusBadge(item.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Detalhe da Manifestação Selecionada -->
    ${selectedCase ? renderCaseDetailSection(selectedCase) : ''}
  `;

  return renderShell(contentHtml, 'cases');
}

function renderCaseDetailSection(c) {
  return `
    <div class="case-detail-container" id="case-detail-view">
      <div class="detail-grid">
        
        <!-- Bloco 1: O que a comunidade relatou -->
        <article class="detail-card">
          <div class="detail-card-header">
            <h4>${icons.user} 1. Relato da Comunidade</h4>
            <span class="badge badge-sector">${c.channel}</span>
          </div>

          <div class="quote-box">
            "${escapeHtml(c.text)}"
          </div>

          <div class="meta-list">
            <div class="meta-row">
              <span class="meta-label">Beneficiário</span>
              <span class="meta-val">${escapeHtml(c.beneficiary)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Polo / Território</span>
              <span class="meta-val">${escapeHtml(c.hub)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Iniciativa</span>
              <span class="meta-val" style="text-align: right; max-width: 60%;">${escapeHtml(c.projectName)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Data e Hora</span>
              <span class="meta-val">${c.date} às ${c.time}</span>
            </div>
          </div>

          <div class="timeline">
            <strong style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Histórico do Encaminhamento</strong>
            ${c.history.map(h => `
              <div class="timeline-item">
                <span class="timeline-dot"></span>
                <span>${escapeHtml(h)}</span>
              </div>
            `).join('')}
          </div>
        </article>

        <!-- Bloco 2: Contexto Operacional & Causa Raiz -->
        <article class="detail-card">
          <div class="detail-card-header">
            <h4>${icons.clock} 2. Diagnóstico da Causa Raiz</h4>
            <span class="badge badge-sector">SLA: ${c.slaHours}h</span>
          </div>

          <div class="ops-metric-box">
            <div style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 6px;">
              Frente de Atuação: <strong>${escapeHtml(c.sector)}</strong>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Categoria: <strong>${escapeHtml(c.category)}</strong>
            </div>
          </div>

          <div style="margin-top: 10px;">
            <strong style="font-size: 0.82rem; color: var(--text-main);">Investigação Técnica:</strong>
            <div class="root-cause-box">
              ${escapeHtml(c.rootCause)}
            </div>
          </div>

          <div style="margin-top: auto; padding-top: 14px;">
            <button class="btn btn-secondary btn-sm" style="width: 100%;" data-action="copy-case-summary" data-id="${c.id}">
              ${icons.copy}
              <span>Copiar Resumo para Relatório</span>
            </button>
          </div>
        </article>

        <!-- Bloco 3: Tratativa Imediata & Desfecho -->
        <article class="detail-card">
          <div class="detail-card-header">
            <h4>${icons.check} 3. Acolhimento &amp; Desfecho</h4>
            ${statusBadge(c.status)}
          </div>

          <form id="treatment-form" class="treatment-form" data-case-id="${c.id}">
            <div class="form-group">
              <label>Medida de Acolhimento / Solução Adotada</label>
              <textarea class="form-control" name="immediateAction" rows="3">${escapeHtml(c.immediateAction)}</textarea>
            </div>

            <div class="form-group">
              <label>Custo de Apoio / Reparo Emergencial (R$)</label>
              <input type="number" step="5" min="0" class="form-control" name="contingencyCost" value="${c.contingencyCost}">
            </div>

            <div class="form-group">
              <label>Frente Responsável</label>
              <select class="form-control" name="sector">
                <option ${c.sector === 'Infraestrutura & Redes' ? 'selected' : ''}>Infraestrutura & Redes</option>
                <option ${c.sector === 'Coordenação Pedagógica' ? 'selected' : ''}>Coordenação Pedagógica</option>
                <option ${c.sector.includes('Nutrição') ? 'selected' : ''}>Qualidade & Nutrição</option>
                <option ${c.sector === 'Planejamento & Operações' ? 'selected' : ''}>Planejamento & Operações</option>
                <option ${c.sector === 'Parcerias & Empregabilidade' ? 'selected' : ''}>Parcerias & Empregabilidade</option>
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
        <div class="kicker">Engenharia de Operações &amp; Gestão Socioambiental</div>
        <h1>Diagnóstico de Causa Raiz &amp; Planos de Ação</h1>
        <p>Análise de Pareto das manifestações comunitárias e planos de ação corretiva (PDCA) nos polos territoriais.</p>
      </div>
    </header>

    <div class="analytics-grid">
      <!-- Gráfico 1: Pareto por Categoria -->
      <section class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <h3>Pareto de Manifestações por Categoria</h3>
            <p>Principais ofensores relatados pelos polos comunitários</p>
          </div>
          <span class="badge badge-sector">${catCounts.length} categorias</span>
        </div>
        <div class="bars-list">
          ${catCounts.map(([cat, count]) => `
            <div class="bar-item">
              <div class="bar-label-row">
                <strong>${escapeHtml(cat)}</strong>
                <span>${count} relato${count > 1 ? 's' : ''} (${Math.round((count / state.cases.length) * 100)}%)</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${(count / maxCat) * 100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Gráfico 2: Frentes Responsáveis -->
      <section class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <h3>Distribuição por Frente Responsável</h3>
            <p>Áreas acionadas para resolução e melhoria contínua</p>
          </div>
          <span class="badge badge-sector">${secCounts.length} frentes</span>
        </div>
        <div class="bars-list">
          ${secCounts.map(([sec, count]) => `
            <div class="bar-item">
              <div class="bar-label-row">
                <strong>${escapeHtml(sec)}</strong>
                <span>${count} chamado${count > 1 ? 's' : ''} (${Math.round((count / state.cases.length) * 100)}%)</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill alt" style="width: ${(count / maxSec) * 100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>

    <!-- Planos de Ação Operacional (PDCA) -->
    <section class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <h3>Planos de Ação Corretiva em Andamento (PDCA Comunitário)</h3>
          <p>Medidas de processo para eliminar as causas raízes reincidentes identificadas nas manifestações</p>
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
                <strong>Gargalo nos Polos:</strong> ${escapeHtml(action.problem)}
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
          <h3>Registrar Nova Manifestação Comunitária</h3>
          <button class="btn-reset" data-action="close-modal">✕</button>
        </div>
        <form id="new-case-form">
          <div class="modal-body">
            <div class="form-group">
              <label>Nome do Beneficiário / Liderança *</label>
              <input class="form-control" name="beneficiary" placeholder="Ex: Dona Maria Aparecida (Liderança)" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label>Polo Comunitário *</label>
                <input class="form-control" name="hub" placeholder="Ex: Polo Digital Norte" required>
              </div>
              <div class="form-group">
                <label>Canal *</label>
                <select class="form-control" name="channel" required>
                  <option>WhatsApp Comunitário</option>
                  <option>Reunião de Polo / Presencial</option>
                  <option>Ouvidoria Digital</option>
                  <option>Formulário de Aluno/Turma</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Iniciativa Vinculada *</label>
              <select class="form-control" name="projectName">
                <option>Laboratórios Comunitários de Inclusão Digital</option>
                <option>Programa Bootcamp Dev e Dados para a Juventude</option>
                <option>Cozinhas Comunitárias e Segurança Alimentar</option>
                <option>Hortas Urbanas e Agroecologia</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label>Categoria</label>
                <select class="form-control" name="category">
                  <option>Conectividade &amp; Infraestrutura</option>
                  <option>Equipamentos &amp; Suprimentos</option>
                  <option>Pedagógico &amp; Nivelamento</option>
                  <option>Segurança Sanitária &amp; Alérgenos</option>
                  <option>Acesso &amp; Grade Horária</option>
                  <option>Elogio &amp; Impacto Social</option>
                </select>
              </div>
              <div class="form-group">
                <label>Gravidade</label>
                <select class="form-control" name="severity">
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Crítica">Crítica</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Frente de Atuação Responsável</label>
              <select class="form-control" name="sector">
                <option>Infraestrutura &amp; Redes</option>
                <option>Coordenação Pedagógica</option>
                <option>Qualidade &amp; Nutrição</option>
                <option>Planejamento &amp; Operações</option>
                <option>Parcerias &amp; Empregabilidade</option>
              </select>
            </div>

            <div class="form-group">
              <label>Relato Fiel da Comunidade *</label>
              <textarea class="form-control" name="text" rows="3" placeholder="Transcreva exatamente o que a liderança ou beneficiário relatou..." required></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Protocolar Manifestação</button>
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
        c.contingencyCost = parseFloat(formData.get('contingencyCost')) || 0;
        c.sector = formData.get('sector') || c.sector;
        const newStatus = formData.get('status') || c.status;
        
        if (c.status !== newStatus) {
          c.status = newStatus;
          c.history.push(`${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · Status alterado para ${newStatus}`);
        }
        
        saveState();
        showToast(`Tratativa da manifestação ${id} salva com sucesso!`);
        render();
      }
    });
  }

  // Copiar resumo
  document.querySelectorAll('[data-action="copy-case-summary"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const c = state.cases.find(x => x.id === id);
      if (!c) return;

      const summaryText = `[MANIFESTAÇÃO ${c.id} · ${c.hub}]\nBeneficiário: ${c.beneficiary} (${c.channel})\nIniciativa: ${c.projectName}\nRelato: "${c.text}"\nFrente: ${c.sector} | Causa: ${c.rootCause}\nTratativa: ${c.immediateAction} (Custo: ${formatCurrency(c.contingencyCost)})\nStatus: ${c.status}`;

      navigator.clipboard.writeText(summaryText)
        .then(() => showToast('Resumo copiado para a área de transferência!'))
        .catch(() => showToast('Erro ao copiar resumo.'));
    });
  });

  // Abrir Modal
  document.querySelectorAll('[data-action="open-new-case-modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      modalRoot.innerHTML = renderNewCaseModal();
      attachModalEvents();
    });
  });

  // Alternar ação corretiva
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
      showToast('Dados restaurados com sucesso.');
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
      
      const newId = `ESC-${100 + state.cases.length + 1}`;
      const newCase = {
        id: newId,
        channel: fd.get('channel'),
        beneficiary: fd.get('beneficiary'),
        hub: fd.get('hub'),
        projectName: fd.get('projectName'),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        text: fd.get('text'),
        category: fd.get('category'),
        severity: fd.get('severity'),
        sector: fd.get('sector'),
        rootCause: 'Manifestação acolhida para investigação técnica pela coordenação local.',
        immediateAction: 'Contato inicial de acolhimento realizado com o beneficiário.',
        contingencyCost: 0,
        status: 'Aberto',
        slaHours: 0.5,
        history: [
          `${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · Manifestação recebida e protocolada`
        ]
      };

      state.cases.unshift(newCase);
      state.selectedCaseId = newId;
      saveState();
      modalRoot.innerHTML = '';
      showToast(`Manifestação ${newId} protocolada com sucesso!`);
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
