# Catálogo de Melhorias: Escuta

Este documento cataloga a evolução arquitetural e operacional do **Escuta**, registrando a transição de um protótipo com sobrecargas de IA experimental para uma **plataforma corporativa de gestão de ocorrências (SAC Operacional)** ancorada em benchmarks reais de mercado (Zendesk, Movidesk, Anota AI) e na metodologia de Engenharia de Produção.

---

## 1. Comparativo Evolutivo

| Dimensão | Versão Anterior (Experimental) | Versão Atual (Corporativa & Enxuta) | Ganho Operacional & Defesa em Entrevista |
| :--- | :--- | :--- | :--- |
| **Navegação & Propósito** | Alternância artificial entre Versão 1.0 e 2.0 no menu com botões de roteiro guiado e demonstrativo. | Sistema único, direto e profissional com apenas 2 visões: **Central de Ocorrências** e **Causa Raiz & Ações**. | Elimina a "cara de feira de ciências/demo escolar". Simula um ambiente real de operação corporativa. |
| **Fila de Chamados** | Pílulas de cenários hipotéticos com emojis soltos no topo (`🔴 Caso Ana`, `🟡 Caso Marina`). | Fila real de ocorrências do turno, com filtros operacionais limpos por canal, setor e status. | O operador atende chamados reais do dia a dia por gravidade e SLA, sem simulações artificiais. |
| **Inteligência Artificial** | Barra de porcentagem (*Grau de Confiança Analítica: 91%*) com 3 botões para o operador calibrar modelo. | **Auto-tagging silencioso**: categoria e setor pré-selecionados automaticamente em dropdowns normais. | Zero fricção. O atendente foca em resolver o cliente em vez de perder tempo calibrando algoritmos. |
| **Tratativa do Chamado** | Botão genérico de confirmação sem registro de compensação comercial. | **Tratativa Imediata Estruturada**: registro da ação (estorno PIX, cupom, reenvio) e do custo da falha (R$). | Rastreabilidade do **Custo da Não-Qualidade** (total gasto em indenizações por setor ofensor). |
| **Contexto do Processo** | Decomposição teórica de 4 etapas em segundos desconectadas do pedido. | Comparativo direto entre **tempo prometido vs. tempo real**, desvio apurado e carga de comandas no forno. | Raciocínio de capacidade produtiva e gargalo fácil de entender e sustentar em 1 minuto de entrevista. |
| **Planos Corretivos** | Banners explicativos com teorias acadêmicas escritas na tela. | **Planos de Ação Operacional (PDCA)** com setor responsável, meta mensurável e prazo factual. | Elimina jargões desnecessários na tela. O raciocínio metodológico é defendido verbalmente pela candidata. |
| **Identidade Visual** | Paleta roxa genérica de template de IA com sombras pesadas e emojis. | Paleta corporativa refinada (Slate/Grafite neutro e Esmeralda institucional), ícones SVG limpos e tipografia sóbria. | Visual nível SaaS de mercado (Linear/Stripe), transmitindo maturidade executiva imediata. |

---

## 2. Detalhamento das Alterações Técnicas

1. **Reestruturação do Modelo de Dados (`data.js`):**
   * Incorporação de valores financeiros reais de pedidos (`orderValue`) e custos de indenização (`compensationCost`);
   * Registro explícito do setor responsável (`sector`: Cozinha, Expedição, Logística, Balcão);
   * Cálculo dinâmico de métricas do turno: SLA médio de primeiro contato, taxa de resolução, custo total de indenizações e CSAT.

2. **Fluxo de Atendimento Unificado (`app.js`):**
   * Visualização integrada do chamado em 3 blocos:
     1. Relato original e dados do pedido;
     2. Contexto do processo (tempos e carga da loja);
     3. Tratativa imediata, custo de compensação e encerramento;
   * Modal intuitivo para inclusão manual de novos chamados recebidos via WhatsApp, Telefone ou Balcão;
   * Exportação em um clique do resumo estruturado da ocorrência para repasse aos líderes de turno.

3. **Design System Sóbrio e Acessível (`styles.css`):**
   * Contraste revisado conforme diretrizes WCAG AA/AAA;
   * Substituição de todos os caracteres unicode e emojis soltos por SVGs limpos;
   * Layout responsivo otimizado para desktop e telas menores de balcão.
