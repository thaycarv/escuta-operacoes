// RadarSocial Escuta — Ouvidoria Ativa & Gestão da Voz do Beneficiário (VoC/VoB)
// Módulo Integrado ao Ecossistema RadarSocial
// Coordenação Técnica: Thayâne Carvalho (Engenharia de Produção & Nutrição)

import {
  cloneInitialState,
  calculateMetrics,
  themeCounts,
  unitCounts,
} from "./data.js";

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");
const toastEl = document.getElementById("toast");
const storageKey = "radarsocial_escuta_state_v5";

let state = loadState();
let currentView = "feedbacks"; // 'feedbacks' | 'actions'
let filters = {
  unit: "Todas",
  type: "Todos",
  channel: "Todos",
  status: "Todos",
  search: "",
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
    console.error("Erro ao salvar estado:", err);
  }
}

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>'"]/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[c])
  );
}

function formatCurrency(val = 0) {
  return Number(val).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2600);
}

function badge(text, tone = "") {
  return `<span class="badge ${tone}">${escapeHtml(text)}</span>`;
}

function severityTone(value) {
  switch (value) {
    case "Crítica":
      return "badge-red";
    case "Alta":
      return "badge-amber";
    case "Moderada":
      return "badge-blue";
    case "Informativa":
      return "badge-green";
    default:
      return "badge-gray";
  }
}

function statusTone(value) {
  switch (value) {
    case "Resolvido":
      return "badge-green";
    case "Aberto":
      return "badge-red";
    case "Em análise":
      return "badge-amber";
    default:
      return "badge-gray";
  }
}

// Ícones SVG Vetoriais Limpos (Padrão editorial)
const icons = {
  list: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  analytics: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
};

function shell(content, title, kicker = "Ecossistema RadarSocial · Governança Territorial") {
  return `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <div class="brand-mark-wrapper">R</div>
          <div>
            <b>RadarSocial</b>
            <small>Escuta Ativa &amp; Ouvidoria</small>
          </div>
        </div>

        <nav class="nav">
          <button class="nav-button ${currentView === "feedbacks" ? "active" : ""}" data-view="feedbacks">
            <span class="nav-icon">${icons.list}</span>
            <span>Fila de Manifestações</span>
          </button>
          <button class="nav-button ${currentView === "actions" ? "active" : ""}" data-view="actions">
            <span class="nav-icon">${icons.analytics}</span>
            <span>Causa Raiz &amp; Ações</span>
          </button>
        </nav>

        <div class="side-footer">
          <div class="system-status-box">
            <span class="status-indicator"></span>
            <span>Operação dos Polos Ativa</span>
          </div>
          <div class="version-tag">RadarSocial Escuta v3.0</div>
          <button class="btn btn-ghost btn-small" data-action="reset">Restaurar Dados</button>
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div>
            <div class="topbar-kicker">${kicker}</div>
            <h1>${title}</h1>
          </div>
          <div class="topbar-actions">
            <button class="btn btn-primary" data-action="new-case-modal">
              ${icons.plus} <span>+ Nova Manifestação</span>
            </button>
          </div>
        </header>

        ${content}

        <footer class="app-footer">
          <div class="footer-content">
            <p class="footer-signature">
              RadarSocial Escuta · Ouvidoria Ativa &amp; Voz do Beneficiário (VoC/VoB) · Coordenação Técnica: Thayâne Carvalho (Engenharia de Produção &amp; Nutrição)
            </p>
          </div>
        </footer>
      </main>
    </div>
  `;
}

function metric(label, value, note, tone = "") {
  return `
    <article class="metric-card ${tone}">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="metric-note">${note}</div>
    </article>
  `;
}

// ==================== VISÃO 1: CENTRAL DE MANIFESTAÇÕES ====================

function feedbacksView() {
  const m = calculateMetrics(state.cases);
  const units = ["Todas", ...new Set(state.cases.map((x) => x.unit))];
  const types = ["Todos", "Reclamação", "Incidente Crítico", "Solicitação", "Sugestão", "Elogio"];
  const channels = ["Todos", ...new Set(state.cases.map((x) => x.channel))];
  const statuses = ["Todos", "Aberto", "Em análise", "Resolvido"];

  const searchLower = filters.search.toLowerCase();
  const items = state.cases.filter((x) => {
    const matchUnit = filters.unit === "Todas" || x.unit === filters.unit;
    const matchType = filters.type === "Todos" || x.type === filters.type;
    const matchChannel = filters.channel === "Todos" || x.channel === filters.channel;
    const matchStatus = filters.status === "Todos" || x.status === filters.status;
    const matchSearch =
      !filters.search ||
      x.id.toLowerCase().includes(searchLower) ||
      x.customer.toLowerCase().includes(searchLower) ||
      x.unit.toLowerCase().includes(searchLower) ||
      x.text.toLowerCase().includes(searchLower) ||
      x.theme.toLowerCase().includes(searchLower);
    return matchUnit && matchType && matchChannel && matchStatus && matchSearch;
  });

  const selectedItem = state.cases.find((x) => x.id === state.selectedCaseId) || items[0] || state.cases[0];

  const content = `
    <!-- Indicadores Principais de Ouvidoria -->
    <section class="metrics-grid">
      ${metric("Manifestações Registradas", m.total, `${m.openCases} em aberto · ${m.inProgress} em análise`)}
      ${metric("Tempo Médio de 1º Contato", `${m.avgResponse} min`, "SLA de acolhimento (Meta: &lt; 30 min)")}
      ${metric("Taxa de Resolução", `${m.resolvedRate}%`, `${m.resolved} de ${m.total} solucionadas`, "metric-positive")}
      ${metric("Apoio & Reparos Emergenciais", formatCurrency(m.totalCost), "Insumos e contingência nos polos")}
    </section>

    <!-- Painel da Tabela Principal -->
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Fila de Manifestações dos Polos</h3>
          <p>${items.length} ocorrências listadas. Clique em qualquer linha para abrir a tratativa.</p>
        </div>
      </div>

      <!-- Barra de Filtros Operacionais -->
      <div class="filters-toolbar">
        <div class="search-input-box">
          ${icons.search}
          <input
            type="text"
            class="search-input"
            placeholder="Buscar por código, cidadão, polo ou palavra-chave..."
            value="${escapeHtml(filters.search)}"
            data-filter-search
          />
        </div>

        <div class="select-group">
          <select class="filter-select" data-filter="unit">
            ${units.map((u) => `<option ${filters.unit === u ? "selected" : ""}>Unidade: ${u}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="type">
            ${types.map((t) => `<option ${filters.type === t ? "selected" : ""}>Tipo: ${t}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="channel">
            ${channels.map((c) => `<option ${filters.channel === c ? "selected" : ""}>Canal: ${c}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="status">
            ${statuses.map((st) => `<option ${filters.status === st ? "selected" : ""}>Status: ${st}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 120px;">Protocolo / Data</th>
              <th style="width: 160px;">Beneficiário &amp; Canal</th>
              <th style="width: 150px;">Polo / Unidade</th>
              <th>Relato da Comunidade</th>
              <th style="width: 140px;">Tema</th>
              <th style="width: 110px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map((item) => {
                const isSelected = selectedItem && selectedItem.id === item.id;
                return `
              <tr class="clickable-row ${isSelected ? "row-selected" : ""} ${item.severity === "Crítica" ? "row-critical" : ""}" data-case-id="${item.id}">
                <td>
                  <span class="case-id-badge">${item.id}</span>
                  <span class="case-subtext">${item.time}</span>
                </td>
                <td>
                  <strong>${escapeHtml(item.customer)}</strong>
                  <span class="case-subtext">${item.channel}</span>
                </td>
                <td>
                  <span class="badge badge-gray">${escapeHtml(item.unit)}</span>
                </td>
                <td>
                  <p class="case-quote">"${escapeHtml(item.text || "Manifestação registrada sem texto adicional.")}"</p>
                </td>
                <td>
                  <span class="theme-text">${escapeHtml(item.theme)}</span><br>
                  ${badge(item.severity, severityTone(item.severity))}
                </td>
                <td>${badge(item.status, statusTone(item.status))}</td>
              </tr>
            `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Detalhe da Manifestação Selecionada (Tratativa do SAC/Ouvidoria) -->
    ${selectedItem ? renderCaseDetailSection(selectedItem) : ""}
  `;

  return shell(content, "Fila de Manifestações dos Polos");
}

function renderCaseDetailSection(item) {
  return `
    <div class="panel" id="case-detail-view" style="margin-top: 24px;">
      <div class="detail-top-nav">
        <div class="detail-header-tags">
          <span class="case-id-badge" style="font-size: 15px;">Protocolo ${item.id}</span>
          ${badge(item.type, "badge-gray")}
          ${badge(item.severity, severityTone(item.severity))}
          <span class="channel-tag">Canal: ${item.channel}</span>
          <span class="badge badge-gray">Polo: ${escapeHtml(item.unit)}</span>
        </div>
        <div>
          ${badge(item.status, statusTone(item.status))}
        </div>
      </div>

      <div class="case-grid">
        
        <!-- Bloco 1: O que a comunidade relatou -->
        <article>
          <div class="panel-head">
            <div>
              <h3>1. Relato da Comunidade</h3>
              <p>${escapeHtml(item.customer)} · Horário: ${item.time}</p>
            </div>
          </div>

          <div class="quote-card">
            <p>“${escapeHtml(item.text || "Relato registrado sem comentário escrito.")}”</p>
          </div>

          <div class="history-block">
            <b>Histórico Operacional Auditável</b>
            <div class="timeline-list">
              ${item.history
                .map(
                  (h) => `
                <div class="timeline-entry">
                  <span class="timeline-bullet"></span>
                  <p>${escapeHtml(h)}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </article>

        <!-- Bloco 2: Contexto Operacional & Causa Raiz -->
        <article>
          <div class="panel-head">
            <div>
              <h3>2. Diagnóstico da Causa Raiz</h3>
              <p>SLA de Resposta: ${item.responseMinutes} min</p>
            </div>
          </div>

          <div class="capacity-box" style="margin-bottom: 16px;">
            <div class="capacity-head">
              <b>Tema: ${escapeHtml(item.theme)}</b>
              <span class="capacity-pill">${escapeHtml(item.serviceCode || "GERAL")}</span>
            </div>
            <p class="capacity-diagnostic">
              Gravidade apurada: <strong>${item.severity}</strong> na unidade <strong>${escapeHtml(item.unit)}</strong>.
            </p>
          </div>

          <div class="root-cause-card">
            <b>Causa Raiz Identificada:</b>
            <p>${escapeHtml(item.rootCause || "Demanda em triagem técnica pela coordenação local.")}</p>
          </div>

          <div style="margin-top: 20px;">
            <button class="btn btn-secondary btn-small full-width" data-action="copy-case-report" data-id="${item.id}">
              ${icons.copy} Copiar Parecer do Chamado
            </button>
          </div>
        </article>

        <!-- Bloco 3: Tratativa Imediata & Desfecho -->
        <article>
          <div class="panel-head">
            <div>
              <h3>3. Acolhimento &amp; Desfecho</h3>
              <p>Ação de contenção com o beneficiário</p>
            </div>
          </div>

          <form id="treatment-form" data-case-id="${item.id}" class="status-action-block">
            <label class="form-label">
              <span>Medida de Acolhimento / Solução Adotada</span>
              <textarea class="form-textarea" name="immediateAction" rows="3">${escapeHtml(item.immediateAction || "")}</textarea>
            </label>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <label class="form-label">
                <span>Custo de Apoio (R$)</span>
                <input type="number" step="5" min="0" class="form-input" name="contingencyCost" value="${item.contingencyCost || 0}">
              </label>

              <label class="form-label">
                <span>Status do Chamado</span>
                <select class="form-select" name="status">
                  <option value="Aberto" ${item.status === "Aberto" ? "selected" : ""}>Aberto</option>
                  <option value="Em análise" ${item.status === "Em análise" ? "selected" : ""}>Em análise</option>
                  <option value="Resolvido" ${item.status === "Resolvido" ? "selected" : ""}>Resolvido</option>
                </select>
              </label>
            </div>

            <button type="submit" class="btn btn-primary full-width" style="margin-top: 6px;">
              Salvar Tratativa
            </button>
          </form>
        </article>

      </div>
    </div>
  `;
}

// ==================== VISÃO 2: CAUSA RAIZ & AÇÕES (PDCA) ====================

function actionsView() {
  const tCounts = themeCounts(state.cases);
  const maxTheme = tCounts.length > 0 ? tCounts[0][1] : 1;

  const uCounts = unitCounts(state.cases);
  const maxUnit = uCounts.length > 0 ? uCounts[0][1] : 1;

  const content = `
    <div class="diagnostics-grid" style="margin-bottom: 24px;">
      <!-- Pareto por Tema -->
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>Pareto de Manifestações por Tema</h3>
            <p>Principais ofensores relatados pelos polos comunitários</p>
          </div>
          <span class="badge badge-gray">${tCounts.length} temas</span>
        </div>
        <div class="bars-container">
          ${tCounts
            .map(([theme, count]) => `
            <div class="bar-row">
              <div class="bar-labels">
                <span>${escapeHtml(theme)}</span>
                <b>${count} ocorrência(s) (${Math.round((count / state.cases.length) * 100)}%)</b>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${(count / maxTheme) * 100}%;"></div>
              </div>
            </div>
          `)
            .join("")}
        </div>
      </section>

      <!-- Distribuição por Unidade -->
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>Distribuição por Polo / Unidade</h3>
            <p>Concentração de ocorrências nos territórios</p>
          </div>
          <span class="badge badge-gray">${uCounts.length} unidades</span>
        </div>
        <div class="bars-container">
          ${uCounts
            .map(([unit, count]) => `
            <div class="bar-row">
              <div class="bar-labels">
                <span>${escapeHtml(unit)}</span>
                <b>${count} chamado(s) (${Math.round((count / state.cases.length) * 100)}%)</b>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${(count / maxUnit) * 100}%; background: var(--blue);"></div>
              </div>
            </div>
          `)
            .join("")}
        </div>
      </section>
    </div>

    <!-- Planos de Ação Operacional (PDCA) -->
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Planos de Ação Corretiva em Andamento (PDCA Comunitário)</h3>
          <p>Medidas de processo para eliminar as causas raízes reincidentes identificadas nas manifestações</p>
        </div>
        <span class="badge badge-green">${state.actions.filter((a) => a.status === "Concluída").length} de ${state.actions.length} concluídas</span>
      </div>

      <div class="kanban-cards-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-top: 14px;">
        ${state.actions
          .map(
            (action) => `
          <article class="action-card">
            <div class="action-card-header">
              <span class="action-id-tag">${action.id}</span>
              <span class="action-due-tag">Prazo: ${action.due}</span>
            </div>

            <b>${escapeHtml(action.title)}</b>
            <p>${escapeHtml(action.problem)}</p>

            <div class="action-indicators-box">
              <small>Meta de Eficácia</small>
              <div class="indicator-chips">
                <span class="chip-proc">Operação: ${escapeHtml(action.metric)}</span>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 8px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--muted);">
              <span class="action-owner-tag">Resp: <strong>${escapeHtml(action.owner)}</strong></span>
              <button class="btn btn-ghost btn-small" data-toggle-action="${action.id}">
                ${action.status === "Concluída" ? "Reabrir" : "Concluir"}
              </button>
            </div>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;

  return shell(content, "Planos de Ação & Melhoria Contínua");
}

function renderNewCaseModal() {
  return `
    <div class="modal-backdrop" id="new-case-modal">
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <h3>Registrar Nova Manifestação Comunitária</h3>
            <p>Abertura de protocolo operacional de ouvidoria</p>
          </div>
          <button class="modal-close-btn" data-action="close-modal">✕</button>
        </div>
        <form id="new-case-form" class="modal-form-grid">
          <label class="form-label full-width">
            <span>Nome do Beneficiário / Cidadão *</span>
            <input class="form-input" name="customer" placeholder="Ex: Dona Maria Aparecida" required>
          </label>

          <label class="form-label">
            <span>Polo / Unidade *</span>
            <select class="form-select" name="unit" required>
              <option>Polo Digital Norte</option>
              <option>Cozinha Comunitária</option>
              <option>Cooperativa Terra Viva</option>
              <option>Ateliê Comunitário</option>
              <option>Polo Digital Leste</option>
            </select>
          </label>

          <label class="form-label">
            <span>Canal de Entrada *</span>
            <select class="form-select" name="channel" required>
              <option>WhatsApp do Polo</option>
              <option>Balcão / Polo</option>
              <option>Ouvidoria Central</option>
              <option>Totem / QR Code</option>
            </select>
          </label>

          <label class="form-label">
            <span>Tipo de Manifestação</span>
            <select class="form-select" name="type">
              <option>Reclamação</option>
              <option>Incidente Crítico</option>
              <option>Solicitação</option>
              <option>Sugestão</option>
              <option>Elogio</option>
            </select>
          </label>

          <label class="form-label">
            <span>Tema Operacional</span>
            <select class="form-select" name="theme">
              <option>Infraestrutura e Conectividade</option>
              <option>Logística e Suprimentos</option>
              <option>Segurança Nutricional e Alérgenos</option>
              <option>Planejamento e Matrícula</option>
              <option>Equipamentos e Informática</option>
              <option>Pagamento Social e Cobrança</option>
              <option>Qualidade do Serviço</option>
            </select>
          </label>

          <label class="form-label full-width">
            <span>Relato Fiel da Comunidade *</span>
            <textarea class="form-textarea" name="text" rows="3" placeholder="Descreva exatamente o que o cidadão relatou..." required></textarea>
          </label>

          <div class="modal-actions-bar full-width">
            <button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Protocolar Chamado</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function bindEvents() {
  // Troca de visão principal
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-view");
      currentView = v;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    });
  });

  // Filtros
  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", (e) => {
      const f = select.getAttribute("data-filter");
      let val = e.target.value;
      if (val.startsWith("Unidade: ")) val = val.replace("Unidade: ", "");
      if (val.startsWith("Tipo: ")) val = val.replace("Tipo: ", "");
      if (val.startsWith("Canal: ")) val = val.replace("Canal: ", "");
      if (val.startsWith("Status: ")) val = val.replace("Status: ", "");
      filters[f] = val;
      render();
    });
  });

  // Busca em tempo real
  const searchInput = document.querySelector("[data-filter-search]");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filters.search = e.target.value;
      render();
      const el = document.querySelector("[data-filter-search]");
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  }

  // Clique na linha da tabela
  document.querySelectorAll("[data-case-id]").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest("select") || e.target.closest("input")) return;
      const id = row.getAttribute("data-case-id");
      state.selectedCaseId = id;
      saveState();
      render();
      const detailEl = document.getElementById("case-detail-view");
      if (detailEl) {
        detailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  // Salvar tratativa
  const treatmentForm = document.getElementById("treatment-form");
  if (treatmentForm) {
    treatmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = treatmentForm.getAttribute("data-case-id");
      const fd = new FormData(treatmentForm);
      const c = state.cases.find((x) => x.id === id);
      if (c) {
        c.immediateAction = fd.get("immediateAction") || c.immediateAction;
        c.contingencyCost = parseFloat(fd.get("contingencyCost")) || 0;
        const newStatus = fd.get("status") || c.status;
        if (c.status !== newStatus) {
          c.status = newStatus;
          const timeNow = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
          c.history.push(`${timeNow} · Status alterado para ${newStatus}`);
        }
        saveState();
        toast(`Tratativa do chamado ${id} salva com sucesso!`);
        render();
      }
    });
  }

  // Copiar parecer do chamado
  document.querySelectorAll('[data-action="copy-case-report"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id") || state.selectedCaseId;
      const item = state.cases.find((x) => x.id === id);
      if (!item) return;

      const text = `[PARECER DE OUVIDORIA · CHAMADO ${item.id}]
Polo / Unidade: ${item.unit} | Canal: ${item.channel}
Beneficiário: ${item.customer} | Horário: ${item.time}

1. Relato da Comunidade:
"${item.text || "Sem comentário escrito."}"

2. Diagnóstico da Causa Raiz:
${item.rootCause || "Em averiguação"}

3. Medida de Acolhimento & Desfecho:
${item.immediateAction || "Em andamento"} (Custo de Apoio: ${formatCurrency(item.contingencyCost || 0)})
Status: ${item.status}

_RadarSocial Escuta · Ouvidoria Ativa & Qualidade Operacional_`;

      navigator.clipboard.writeText(text)
        .then(() => toast("Parecer copiado para a área de transferência!"))
        .catch(() => toast("Erro ao copiar parecer."));
    });
  });

  // Alternar ação corretiva
  document.querySelectorAll("[data-toggle-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const actId = btn.getAttribute("data-toggle-action");
      const a = state.actions.find((x) => x.id === actId);
      if (a) {
        a.status = a.status === "Concluída" ? "Em andamento" : "Concluída";
        saveState();
        toast(`Plano ${a.id} atualizado para ${a.status}`);
        render();
      }
    });
  });

  // Modal nova manifestação
  document.querySelectorAll('[data-action="new-case-modal"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      modalRoot.innerHTML = renderNewCaseModal();
      bindModalEvents();
    });
  });

  // Restaurar dados
  document.querySelectorAll('[data-action="reset"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      state = cloneInitialState();
      saveState();
      toast("Dados restaurados com sucesso.");
      render();
    });
  });
}

function bindModalEvents() {
  const modalOverlay = document.getElementById("new-case-modal");
  if (!modalOverlay) return;

  modalOverlay.querySelectorAll('[data-action="close-modal"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      modalRoot.innerHTML = "";
    });
  });

  const form = document.getElementById("new-case-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const newId = `ESC-${100 + state.cases.length + 1}`;
      const newCase = {
        id: newId,
        channel: fd.get("channel"),
        customer: fd.get("customer"),
        unit: fd.get("unit"),
        serviceCode: "GERAL",
        rating: null,
        text: fd.get("text"),
        type: fd.get("type"),
        theme: fd.get("theme"),
        severity: fd.get("type") === "Incidente Crítico" ? "Crítica" : "Moderada",
        status: "Aberto",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        responseMinutes: 1,
        rootCause: "Manifestação protocolada para averiguação técnica local.",
        immediateAction: "Acolhimento inicial registrado pela equipe de ouvidoria.",
        contingencyCost: 0.0,
        history: [
          `${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} · Manifestação recebida e protocolada`,
        ],
      };

      state.cases.unshift(newCase);
      state.selectedCaseId = newId;
      saveState();
      modalRoot.innerHTML = "";
      toast(`Chamado ${newId} protocolado com sucesso!`);
      render();
    });
  }
}

function render() {
  if (currentView === "actions") {
    app.innerHTML = actionsView();
  } else {
    app.innerHTML = feedbacksView();
  }
  bindEvents();
}

// Inicialização
render();
