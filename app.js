// RadarSocial Escuta — Ouvidoria Ativa, Voz do Usuário/Beneficiário (VoC/VoB) & Melhoria Contínua
// Sistema Operacional Integrado ao Ecossistema RadarSocial

import {
  cloneInitialState,
  calculateMetrics,
  themeCounts,
  canValidateAI,
  canVerifyAction,
} from "./data.js";

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");
const toastEl = document.getElementById("toast");
const storageKey = "radarsocial-escuta-state-v3";

let state = loadState();
let currentView = "feedbacks";
let filters = {
  channel: "Todos",
  unit: "Todas",
  type: "Todos",
  severity: "Todas",
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
  sessionStorage.setItem(storageKey, JSON.stringify(state));
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

function toast(message) {
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

function typeTone(value) {
  switch (value) {
    case "Incidente Crítico":
      return "badge-red";
    case "Reclamação":
      return "badge-amber";
    case "Solicitação":
      return "badge-blue";
    case "Sugestão":
      return "badge-purple";
    case "Elogio":
      return "badge-green";
    default:
      return "badge-gray";
  }
}

function statusTone(value) {
  switch (value) {
    case "Resolvido":
      return "badge-green";
    case "Novo":
      return "badge-red";
    case "Aguardando ação interna":
      return "badge-amber";
    case "Aguardando cliente":
      return "badge-orange";
    case "Vinculado":
      return "badge-gray";
    default:
      return "badge-blue";
  }
}

// Ícones SVG Vetoriais Nítidos (Lucide Style)
const icons = {
  layers: `<svg class="nav-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  list: `<svg class="nav-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  activity: `<svg class="nav-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  kanban: `<svg class="nav-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  search: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  copy: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  check: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  alertTriangle: `<svg class="icon-inline text-amber" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  alertOctagon: `<svg class="icon-inline text-red" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

const navigation = [
  ["feedbacks", icons.list, "Central de Manifestações"],
  ["diagnostics", icons.activity, "Diagnóstico & Gargalos"],
  ["actions", icons.kanban, "Planos de Melhoria"],
];

function shell(content, title, subtitle = "Ouvidoria & Voz do Beneficiário") {
  return `<div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="brand-mark-wrapper">
          ${icons.layers}
        </div>
        <div>
          <b>RadarSocial Escuta</b>
          <small>Ouvidoria & Melhoria Contínua</small>
        </div>
        <button class="mobile-menu-btn" data-action="menu" aria-label="Abrir Menu">✕</button>
      </div>

      <nav class="nav">
        ${navigation
          .map(
            ([id, icon, label]) => `
          <button class="nav-button ${currentView === id ? "active" : ""}" data-view="${id}">
            <span class="nav-icon">${icon}</span>
            <span>${label}</span>
          </button>
        `
          )
          .join("")}
      </nav>

      <div class="side-footer">
        <div class="system-status-box">
          <span class="status-indicator"></span>
          <span>Ecossistema RadarSocial</span>
        </div>
        <small class="version-tag">Módulo VoC/VoB · Versão 3.0</small>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <div class="topbar-kicker">${subtitle}</div>
          <h1>${title}</h1>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-primary" data-action="new-feedback">
            ${icons.plus} Nova Manifestação
          </button>
        </div>
      </header>

      ${content}

      <footer class="app-footer">
        <div class="footer-content">
          <p class="footer-signature">
            Ecossistema RadarSocial · Módulo de Ouvidoria Ativa &amp; Melhoria Contínua de Processos
          </p>
        </div>
      </footer>
    </main>
  </div>`;
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
  const channels = ["Todos", ...new Set(state.cases.map((x) => x.channel))];
  const units = ["Todas", ...new Set(state.cases.map((x) => x.unit))];
  const types = ["Todos os Tipos", "Reclamação", "Incidente Crítico", "Solicitação", "Sugestão", "Elogio"];
  const severities = ["Todas", "Crítica", "Alta", "Moderada", "Baixa", "Informativa"];
  const statuses = [
    "Todos",
    "Novo",
    "Em análise",
    "Aguardando ação interna",
    "Aguardando cliente",
    "Resolvido",
  ];

  const searchLower = filters.search.toLowerCase();
  const items = state.cases.filter((x) => {
    const matchChannel = filters.channel === "Todos" || x.channel === filters.channel;
    const matchUnit = filters.unit === "Todas" || x.unit === filters.unit;
    const matchType = filters.type === "Todos" || filters.type === "Todos os Tipos" || x.type === filters.type;
    const matchSeverity = filters.severity === "Todas" || x.severity === filters.severity;
    const matchStatus = filters.status === "Todos" || x.status === filters.status;
    const matchSearch =
      !filters.search ||
      x.id.toLowerCase().includes(searchLower) ||
      x.customer.toLowerCase().includes(searchLower) ||
      x.unit.toLowerCase().includes(searchLower) ||
      x.text.toLowerCase().includes(searchLower) ||
      x.theme.toLowerCase().includes(searchLower);
    return matchChannel && matchUnit && matchType && matchSeverity && matchStatus && matchSearch;
  });

  const content = `
    <!-- Indicadores Principais de Ouvidoria -->
    <section class="metrics-grid">
      ${metric("CSAT dos Polos", `${m.csat.toFixed(1)} / 5`, "Índice de satisfação apurado", "metric-positive")}
      ${metric("Net Promoter Score (NPS)", m.nps > 0 ? `+${m.nps}` : m.nps, `${m.npsResponses} respostas de beneficiários`, m.nps >= 0 ? "metric-positive" : "metric-danger")}
      ${metric("Tempo Médio de 1ª Resposta", `${m.avgResponse} min`, "Tempo de acolhimento inicial")}
      ${metric("Resolução Confirmada", `${m.resolvedRate}%`, "Validação formal pelo cidadão")}
    </section>

    <!-- Tabela Principal de Manifestações -->
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Fila de Manifestações dos Polos</h3>
          <p>${items.length} ocorrências listadas. Clique em qualquer linha para auditar os tempos operacionais e a causa raiz.</p>
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
            ${units.map((u) => `<option ${filters.unit === u ? "selected" : ""}>${u}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="type">
            ${types.map((t) => `<option value="${t}" ${filters.type === t ? "selected" : ""}>${t}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="channel">
            ${channels.map((c) => `<option ${filters.channel === c ? "selected" : ""}>${c}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="severity">
            ${severities.map((s) => `<option ${filters.severity === s ? "selected" : ""}>${s}</option>`).join("")}
          </select>

          <select class="filter-select" data-filter="status">
            ${statuses.map((st) => `<option ${filters.status === st ? "selected" : ""}>${st}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 120px;">Protocolo</th>
              <th style="width: 140px;">Tipo / Gravidade</th>
              <th style="width: 170px;">Polo / Canal</th>
              <th>Relato Original do Beneficiário / Cidadão</th>
              <th style="width: 170px;">Tema Operacional</th>
              <th style="width: 130px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${
              items.length > 0
                ? items
                    .map(
                      (item) => `
                <tr class="clickable-row ${item.critical ? "row-critical" : ""}" data-case="${item.id}">
                  <td>
                    <div class="case-id-badge">
                      ${item.critical ? icons.alertOctagon : ""}
                      <b>${item.id}</b>
                    </div>
                    <small class="case-subtext">${item.time}</small>
                  </td>
                  <td>
                    <div>${badge(item.type, typeTone(item.type))}</div>
                    <div style="margin-top: 3px;">${badge(item.severity, severityTone(item.severity))}</div>
                  </td>
                  <td>
                    <b>${item.unit}</b>
                    <small class="case-subtext">${item.channel} · ${item.customer}</small>
                  </td>
                  <td class="text-cell">
                    <p class="case-quote">“${escapeHtml(item.text || "Avaliação registrada no totem sem comentário escrito.")}”</p>
                  </td>
                  <td>
                    <span class="theme-text">${escapeHtml(item.theme)}</span>
                  </td>
                  <td>${badge(item.status, statusTone(item.status))}</td>
                </tr>
              `
                    )
                    .join("")
                : `<tr><td colspan="6" class="empty-state-cell">Nenhuma ocorrência encontrada para os filtros selecionados.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
  return shell(content, "Central de Manifestações dos Polos");
}

// ==================== VISÃO 2: INVESTIGAÇÃO DO CASO ====================

function caseDetailView() {
  const item = state.cases.find((x) => x.id === state.selectedCase) || state.cases[0];
  const canValidate = canValidateAI(item);

  const content = `
    <div class="detail-top-nav">
      <button class="btn btn-secondary" data-view="feedbacks">
        ← Voltar à Central de Manifestações
      </button>

      <div class="detail-header-tags">
        ${badge(item.id, "badge-gray")}
        ${badge(item.type, typeTone(item.type))}
        ${badge(item.unit, "badge-blue")}
        ${badge(item.severity, severityTone(item.severity))}
        ${item.critical ? badge("Intervenção Imediata da Coordenação", "badge-red") : ""}
        ${item.resolvedConfirmed ? badge("Resolução Confirmada pelo Cidadão", "badge-green") : ""}
      </div>

      <button class="btn btn-primary" data-action="copy-case-report">
        ${icons.copy} Copiar Parecer do Chamado
      </button>
    </div>

    <div class="case-grid">
      <!-- Coluna 1: Relato Original & Histórico -->
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>1. Relato Original do Beneficiário</h3>
            <p>${item.customer} · Canal: ${item.channel} · Tipo: ${item.type} · Serviço: ${item.serviceCode || "Geral"}</p>
          </div>
          <div class="rating-box">
            <b>${item.rating ? `${item.rating} / 5` : "Sem nota"}</b>
            <small>Avaliação</small>
          </div>
        </div>

        <div class="quote-card">
          <p>“${escapeHtml(item.text || "Avaliação sem comentário escrito.")}”</p>
        </div>

        <div class="history-block">
          <b>Histórico de Atendimento e Ações Auditáveis:</b>
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

      <!-- Coluna 2: Dados Operacionais Reais (Confronto de Processo) -->
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>2. Confronto com Dados de Processo</h3>
            <p>Tempos apurados no polo no momento da ocorrência</p>
          </div>
          <span class="badge badge-gray">${item.time}</span>
        </div>

        <div class="process-metrics-grid">
          <div class="process-metric-card">
            <span class="process-step-num">1</span>
            <small>Triagem Inicial</small>
            <b>${item.operational.triage} min</b>
          </div>

          <div class="process-metric-card ${item.operational.serviceWait > 30 ? "metric-alert" : ""}">
            <span class="process-step-num">2</span>
            <small>Espera no Polo</small>
            <b>${item.operational.serviceWait} min</b>
          </div>

          <div class="process-metric-card">
            <span class="process-step-num">3</span>
            <small>Resolução / Ação</small>
            <b>${item.operational.resolution} min</b>
          </div>
        </div>

        <div class="capacity-box">
          <div class="capacity-head">
            <b>Carga Operacional da Unidade:</b>
            <span class="capacity-pill">${item.operational.concurrent} atendimentos simultâneos</span>
          </div>
          <p class="capacity-diagnostic">
            ${
              item.operational.serviceWait > 30
                ? "<b>Diagnóstico:</b> Gargalo de capacidade física no polo. A sobrecarga de pessoas no local gerou fila de espera e atraso no atendimento."
                : "<b>Diagnóstico:</b> Tempo de atendimento compatível com o padrão programado. Falha concentrada na comunicação prévia com os usuários."
            }
          </p>
        </div>
      </article>

      <!-- Coluna 3: Parecer do Operador & Apoio Analítico -->
      <aside class="panel">
        <div class="panel-head">
          <div>
            <h3>3. Resolução & Parecer do Operador</h3>
            <p>Supervisão técnica e decisão com o cidadão</p>
          </div>
          ${badge(
            item.aiStatus === "validated"
              ? "Classificação Validada"
              : item.aiStatus === "corrected"
              ? "Classificação Corrigida"
              : "Pendente de Avaliação",
            item.aiStatus === "validated" ? "badge-green" : "badge-amber"
          )}
        </div>

        <div class="ai-analysis-box">
          <div class="ai-field-row">
            <span class="ai-field-label">Tema Provável:</span>
            <b>${escapeHtml(item.theme)}</b>
          </div>
          <div class="ai-field-row">
            <span class="ai-field-label">Gravidade Sugerida:</span>
            <b>${item.severity}</b>
          </div>

          <div class="confidence-bar-wrapper">
            <div class="confidence-header">
              <span>Grau de Confiança Analítica:</span>
              <b>${item.aiConfidence}%</b>
            </div>
            <div class="confidence-track">
              <div class="confidence-fill" style="width: ${item.aiConfidence}%;"></div>
            </div>
          </div>

          <div class="ai-buttons-row">
            <button class="btn btn-small btn-primary" data-ai="validate" ${!canValidate ? "disabled" : ""}>
              Validar Classificação
            </button>
            <button class="btn btn-small btn-secondary" data-ai="correct">
              Corrigir
            </button>
            <button class="btn btn-small btn-ghost" data-ai="reject">
              Não Utilizar
            </button>
          </div>
        </div>

        <div class="status-action-block">
          <label class="form-label">
            <span>Status do Chamado:</span>
            <select class="form-select" data-case-field="status">
              ${[
                "Novo",
                "Em análise",
                "Aguardando ação interna",
                "Aguardando cliente",
                "Resolvido",
              ]
                .map((v) => `<option ${item.status === v ? "selected" : ""}>${v}</option>`)
                .join("")}
            </select>
          </label>

          <label class="form-label">
            <span>Gravidade Técnica:</span>
            <select class="form-select" data-case-field="severity">
              ${["Crítica", "Alta", "Moderada", "Baixa", "Informativa"]
                .map((v) => `<option ${item.severity === v ? "selected" : ""}>${v}</option>`)
                .join("")}
            </select>
          </label>

          <button
            class="btn btn-success full-width"
            data-action="confirm-resolution"
            ${item.resolvedConfirmed ? "disabled" : ""}
          >
            ${
              item.resolvedConfirmed
                ? `${icons.check} Resolução Validada pelo Cidadão`
                : "Confirmar Resolução com o Beneficiário"
            }
          </button>
        </div>
      </aside>
    </div>
  `;
  return shell(content, `Investigação do Chamado ${item.id}`, item.unit);
}

// ==================== VISÃO 3: DIAGNÓSTICO & GARGALOS ====================

function diagnosticsView() {
  const counts = themeCounts(state.cases);
  const max = Math.max(...counts.map((x) => x[1]));

  const content = `
    <div class="diagnostics-grid">
      <!-- Frequência de Temas -->
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>Frequência de Temas Reclamados</h3>
            <p>Distribuição de manifestações únicas nos polos atendidos</p>
          </div>
          <span class="badge badge-blue">Últimos 30 Dias</span>
        </div>

        <div class="bars-container">
          ${counts
            .map(
              ([theme, count]) => `
            <div class="bar-row">
              <div class="bar-labels">
                <span>${escapeHtml(theme)}</span>
                <b>${count} ocorrência(s)</b>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${(count / max) * 100}%;"></div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </article>

      <!-- Diagnóstico de Causa Raiz Operacional -->
      <article class="panel">
        <div class="panel-head">
          <div>
            <h3>Diagnóstico de Causa Raiz</h3>
            <p>Análise de correlação entre saturação física e insatisfação</p>
          </div>
          <span class="badge badge-green">Causa Raiz Confirmada</span>
        </div>

        <div class="root-cause-cards">
          <div class="root-cause-card">
            <b>1. Saturação Física nos Horários de Pico</b>
            <p>As queixas de lentidão e espera no Polo Digital Norte e na Cozinha Comunitária coincidem com horários em que o fluxo supera 30 pessoas simultâneas, gerando sobrecarga física e de infraestrutura elétrica.</p>
          </div>

          <div class="root-cause-card">
            <b>2. Comunicação Reativa em Casos de Imprevistos</b>
            <p>Beneficiários relataram que só descobrem atrasos de entrega ou panes técnicas após chegarem presencialmente ao polo. A ausência de alerta prévio via WhatsApp eleva em 40% a insatisfação registrada.</p>
          </div>

          <div class="root-cause-card">
            <b>3. Conformidade Sanitária e Regras de Compras</b>
            <p>A falta de modelos padronizados de rotulagem (alérgenos) e de templates para as 3 cotações de fornecedores travam o avanço de cooperativas e geram queixas administrativas evitáveis.</p>
          </div>
        </div>
      </article>
    </div>

    <!-- Comparativo Antes vs Depois -->
    <section class="panel" style="margin-top: 20px;">
      <div class="panel-head">
        <div>
          <h3>Impacto das Ações de Melhoria Contínua</h3>
          <p>Comparativo em períodos equivalentes antes e depois da implementação dos planos de ação</p>
        </div>
        <span class="badge badge-green">Evolução Mensurada</span>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Indicador Operacional</th>
              <th>Antes da Melhoria</th>
              <th>Depois da Melhoria</th>
              <th>Resultado Observado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>CSAT Geral dos Polos (Satisfação)</b></td>
              <td>3,2 / 5</td>
              <td><b>4,2 / 5</b></td>
              <td class="text-positive">+1,0 ponto na satisfação geral</td>
            </tr>
            <tr>
              <td><b>Contatos por Atraso a cada 100 atendimentos</b></td>
              <td>22 manifestações</td>
              <td><b>9 manifestações</b></td>
              <td class="text-positive">Redução de 59% nas reclamações de espera</td>
            </tr>
            <tr>
              <td><b>Tempo Médio de Espera no Polo</b></td>
              <td>48 minutos</td>
              <td><b>22 minutos</b></td>
              <td class="text-positive">Ganho de 26 minutos por beneficiário</td>
            </tr>
            <tr>
              <td><b>Conformidade de Rotulagem Sanitária (Anvisa)</b></td>
              <td>65%</td>
              <td><b>100% dos lotes</b></td>
              <td class="text-positive">Zero autuações após dupla checagem</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
  return shell(content, "Diagnóstico de Gargalos & Causa Raiz");
}

// ==================== VISÃO 4: PLANOS DE MELHORIA ====================

function actionsView() {
  const statuses = ["Planejada", "Em andamento", "Verificação", "Concluída"];

  const content = `
    <!-- Kanban de Melhoria Contínua -->
    <section class="kanban-grid">
      ${statuses
        .map(
          (status) => `
        <div class="kanban-column">
          <div class="kanban-column-head">
            <span class="kanban-column-title">${status}</span>
            <b class="kanban-column-count">${
              state.actions.filter((a) => a.status === status).length
            }</b>
          </div>

          <div class="kanban-cards-list">
            ${state.actions
              .filter((a) => a.status === status)
              .map(
                (a) => `
              <article class="action-card">
                <div class="action-card-header">
                  <span class="action-id-tag">${a.id}</span>
                  <span class="action-due-tag">Prazo: ${a.due}</span>
                </div>
                <b>${escapeHtml(a.title)}</b>
                <p>${escapeHtml(a.problem)}</p>
                <div class="action-owner-tag">Responsável: ${a.owner}</div>

                <div class="action-indicators-box">
                  <small>Dupla Validação:</small>
                  <div class="indicator-chips">
                    <span class="chip-exp">${a.experience}</span>
                    <span class="chip-proc">${a.operational}</span>
                  </div>
                </div>

                ${
                  status === "Verificação"
                    ? `
                  <button class="btn btn-small btn-primary full-width" style="margin-top: 10px;" data-verify="${a.id}">
                    Validar Conclusão
                  </button>
                `
                    : ""
                }
              </article>
            `
              )
              .join("")}
          </div>
        </div>
      `
        )
        .join("")}
    </section>

    <!-- Metodologia Institucional -->
    <section class="panel" style="margin-top: 20px;">
      <div class="panel-head">
        <div>
          <h3>Metodologia de Validação Dupla de Melhorias (PDCA & VoC)</h3>
          <p>Garantia de que cada ação resolva a dor do usuário e aumente a eficiência interna do processo</p>
        </div>
        <span class="badge badge-green">Controle da Qualidade</span>
      </div>
      <p class="methodology-note">
        Toda ação de melhoria deve conter obrigatoriamente um <b>indicador de percepção do cidadão</b> (ex: CSAT, redução de contatos de insatisfação) e um <b>indicador de eficiência de processo</b> (ex: tempo de ciclo, conformidade de fichas técnicas, aprovação de cotações na primeira tentativa). A validação final só ocorre quando ambos os critérios são atingidos simultaneamente.
      </p>
    </section>
  `;
  return shell(content, "Planos de Ação & Melhoria Contínua");
}

// ==================== CONTROLE DE EVENTOS & NAVEGAÇÃO ====================

function render() {
  switch (currentView) {
    case "case":
      app.innerHTML = caseDetailView();
      break;
    case "diagnostics":
      app.innerHTML = diagnosticsView();
      break;
    case "actions":
      app.innerHTML = actionsView();
      break;
    case "feedbacks":
    default:
      app.innerHTML = feedbacksView();
      break;
  }
  bindEvents();
}

function go(view) {
  currentView = view;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function copyCaseReport() {
  const item = state.cases.find((x) => x.id === state.selectedCase) || state.cases[0];
  if (!item) return;

  const text = `*Parecer de Ouvidoria & VoC: Chamado ${item.id}*
Unidade: ${item.unit} | Canal: ${item.channel}
Cidadão: ${item.customer} | Horário: ${item.time} | Avaliação: ${item.rating ? `${item.rating}/5` : "Não informada"}

*1. Relato Original do Beneficiário:*
"${item.text || "Manifestação registrada sem comentário escrito."}"

*2. Dados Operacionais Apurados:*
- Triagem Inicial: ${item.operational.triage} min
- Tempo de Espera no Polo: ${item.operational.serviceWait} min
- Resolução Técnica: ${item.operational.resolution} min
- Atendimentos Concorrentes: ${item.operational.concurrent} pessoas

*3. Apoio Analítico & Causa Raiz:*
- Tema Operacional: ${item.theme}
- Gravidade Apurada: ${item.severity} (Confiança: ${item.aiConfidence}%)
- Status de Validação: ${item.aiStatus === "validated" ? "Validado por operador" : "Pendente de análise"}

*4. Tratamento & Resolução:*
- Status Atual: ${item.status}
- Resolução Confirmada pelo Cidadão: ${item.resolvedConfirmed ? "Sim (Concluído)" : "Pendente"}

_RadarSocial Escuta · Coordenação de Operações_`;

  navigator.clipboard.writeText(text);
  toast(`✓ Parecer do chamado ${item.id} copiado para a área de transferência.`);
}

function bindEvents() {
  // Navegação
  document.querySelectorAll("[data-view]").forEach((el) =>
    el.addEventListener("click", () => go(el.dataset.view))
  );

  // Menu móvel
  document.querySelector('[data-action="menu"]')?.addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("mobile-open");
  });

  // Ações de cabeçalho
  document
    .querySelector('[data-action="new-feedback"]')
    ?.addEventListener("click", showNewFeedbackModal);

  // Copiar parecer
  document
    .querySelector('[data-action="copy-case-report"]')
    ?.addEventListener("click", copyCaseReport);

  // Clique em linha de caso na tabela
  document.querySelectorAll("[data-case]").forEach((el) =>
    el.addEventListener("click", () => {
      state.selectedCase = el.dataset.case;
      saveState();
      go("case");
    })
  );

  // Filtros de tabela
  document.querySelectorAll("[data-filter]").forEach((el) =>
    el.addEventListener("change", () => {
      filters[el.dataset.filter] = el.value;
      render();
    })
  );

  // Busca em tempo real
  const searchInput = document.querySelector("[data-filter-search]");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filters.search = e.target.value;
      render();
      const input = document.querySelector("[data-filter-search]");
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  // Ações de apoio analítico (Decisão do Operador)
  document.querySelectorAll("[data-ai]").forEach((el) =>
    el.addEventListener("click", () => handleAI(el.dataset.ai))
  );

  // Atualização de campos de status e gravidade
  document.querySelectorAll("[data-case-field]").forEach((el) =>
    el.addEventListener("change", () =>
      updateCaseField(el.dataset.caseField, el.value)
    )
  );

  // Confirmar resolução com o beneficiário
  document
    .querySelector('[data-action="confirm-resolution"]')
    ?.addEventListener("click", confirmResolution);

  // Validar conclusão de ação no Kanban
  document.querySelectorAll("[data-verify]").forEach((el) =>
    el.addEventListener("click", () => verifyAction(el.dataset.verify))
  );
}

function handleAI(action) {
  const item = state.cases.find((x) => x.id === state.selectedCase);
  if (!item) return;

  if (action === "validate" && !canValidateAI(item)) {
    toast("A validação exige informações complementares.");
    return;
  }

  item.aiStatus =
    action === "validate"
      ? "validated"
      : action === "correct"
      ? "corrected"
      : "rejected";

  item.history.push(
    action === "validate"
      ? "Classificação operacional validada pelo operador técnico"
      : action === "correct"
      ? "Classificação corrigida manualmente pelo operador técnico"
      : "Sugestão analítica descartada pelo operador técnico"
  );

  saveState();
  toast("Decisão técnica registrada no histórico do chamado.");
  render();
}

function updateCaseField(field, value) {
  const item = state.cases.find((x) => x.id === state.selectedCase);
  if (!item) return;
  item[field] = value;
  item.history.push(
    `${field === "status" ? "Status" : "Gravidade"} alterada para ${value} pelo operador`
  );
  saveState();
  toast("Chamado atualizado com sucesso.");
  render();
}

function confirmResolution() {
  const item = state.cases.find((x) => x.id === state.selectedCase);
  if (!item) return;
  item.resolvedConfirmed = true;
  item.status = "Resolvido";
  item.history.push("Beneficiário/cidadão confirmou formalmente a resolução da ocorrência");
  saveState();
  toast("✓ Resolução confirmada pelo beneficiário. Indicadores de CSAT atualizados.");
  render();
}

function verifyAction(id) {
  const action = state.actions.find((x) => x.id === id);
  if (!action || !canVerifyAction(action)) {
    toast("Ação precisa cumprir os requisitos de dupla validação.");
    return;
  }
  action.status = "Concluída";
  saveState();
  toast("✓ Ação de melhoria concluída e validada.");
  render();
}

// ==================== MODAL DE NOVA MANIFESTAÇÃO ====================

function showNewFeedbackModal() {
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <form class="modal-card" id="quick-feedback" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div>
            <h3>Registrar Nova Manifestação</h3>
            <p>Atendimento recebido via WhatsApp, balcão, totem ou ouvidoria</p>
          </div>
          <button type="button" class="modal-close-btn" data-modal-close aria-label="Fechar">✕</button>
        </div>

        <div class="modal-form-grid">
          <label class="form-label">
            <span>Tipo de Manifestação: *</span>
            <select class="form-select" name="type" required>
              <option value="Reclamação" selected>Reclamação</option>
              <option value="Solicitação">Solicitação</option>
              <option value="Sugestão">Sugestão</option>
              <option value="Elogio">Elogio</option>
              <option value="Incidente Crítico">Incidente Crítico (Risco Sanitário/Operacional)</option>
            </select>
          </label>

          <label class="form-label">
            <span>Nome do Beneficiário / Solicitante: *</span>
            <input class="form-input" name="customer" placeholder="Ex: Maria Oliveira" required />
          </label>

          <label class="form-label">
            <span>Polo ou Unidade Comunitária: *</span>
            <select class="form-select" name="unit" required>
              <option value="Polo Digital Norte">Polo Digital Norte</option>
              <option value="Cooperativa Terra Viva">Cooperativa Terra Viva</option>
              <option value="Cozinha Comunitária">Cozinha Comunitária</option>
              <option value="Ateliê Comunitário">Ateliê Comunitário</option>
              <option value="Restaurante Comunitário">Restaurante Comunitário</option>
            </select>
          </label>

          <label class="form-label">
            <span>Canal de Entrada:</span>
            <select class="form-select" name="channel">
              <option value="WhatsApp do Polo">WhatsApp do Polo</option>
              <option value="Balcão / Polo">Balcão / Polo</option>
              <option value="Ouvidoria Central">Ouvidoria Central</option>
              <option value="Totem / QR Code">Totem / QR Code</option>
            </select>
          </label>

          <label class="form-label">
            <span>Código do Serviço / Turma (opcional):</span>
            <input class="form-input" name="serviceCode" placeholder="Ex: TI-4050 ou ALIM-2070" />
          </label>

          <label class="form-label full-width">
            <span>Relato Original do Beneficiário: *</span>
            <textarea
              class="form-textarea"
              name="text"
              rows="3"
              placeholder="Descreva exatamente o que foi informado pelo cidadão, sem resumos..."
              required
            ></textarea>
          </label>

          <label class="form-label">
            <span>Tema Operacional:</span>
            <select class="form-select" name="theme">
              <option value="Atendimento e Comunicação">Atendimento e Comunicação</option>
              <option value="Logística e Distribuição">Logística e Distribuição</option>
              <option value="Segurança Nutricional e Alérgenos">Segurança Nutricional e Alérgenos</option>
              <option value="Infraestrutura de TI">Infraestrutura de TI</option>
              <option value="Compras e Prestação de Contas">Compras e Prestação de Contas</option>
              <option value="Qualidade do Serviço">Qualidade do Serviço</option>
              <option value="Acolhimento Comunitário">Acolhimento Comunitário</option>
            </select>
          </label>

          <label class="form-label">
            <span>Gravidade Inicial:</span>
            <select class="form-select" name="severity">
              <option value="Baixa">Baixa</option>
              <option value="Moderada" selected>Moderada</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica (Risco Sanitário/Interrupção)</option>
            </select>
          </label>
        </div>

        <div class="modal-actions-bar">
          <button type="button" class="btn btn-secondary" data-modal-close>Cancelar</button>
          <button class="btn btn-primary" type="submit">Registrar Chamado</button>
        </div>
      </form>
    </div>
  `;

  modalRoot.querySelector("[data-modal-close]").onclick = () => {
    modalRoot.innerHTML = "";
  };

  modalRoot.querySelector("#quick-feedback").onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const newId = `ESC-${String(state.cases.length + 101).padStart(3, "0")}`;
    const type = f.get("type");
    const severity = f.get("severity");
    const isCritical = type === "Incidente Crítico" || severity === "Crítica";

    state.cases.unshift({
      id: newId,
      channel: f.get("channel"),
      customer: f.get("customer"),
      unit: f.get("unit"),
      serviceCode: f.get("serviceCode") || "GERAL",
      rating: null,
      nps: null,
      text: f.get("text"),
      type: type,
      theme: f.get("theme"),
      severity: severity,
      status: "Novo",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      responseMinutes: 0,
      resolvedConfirmed: false,
      duplicateOf: null,
      critical: isCritical,
      aiConfidence: 75,
      aiStatus: "pending",
      operational: {
        triage: 5,
        serviceWait: 15,
        resolution: 0,
        concurrent: 25,
      },
      history: [
        `Manifestação tipo '${type}' registrada pela equipe de atendimento`,
        "Aguardando conferência e validação técnica do operador",
      ],
    });

    saveState();
    modalRoot.innerHTML = "";
    toast(`✓ Chamado ${newId} registrado com sucesso na fila.`);
    go("feedbacks");
  };
}

// Inicialização
render();
