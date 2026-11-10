# Catálogo de Auditoria e Melhorias: RadarSocial Escuta

Este documento registra a auditoria e simplificação operacional realizada no **RadarSocial Escuta**, sob a ótica de **Engenharia de Produção (Qualidade e Processos)**, **Voz do Cliente (VoC/VoB)** e **Recrutamento Técnico/ESG**, integrando-o formalmente como módulo de ouvidoria ativa e melhoria contínua do ecossistema **RadarSocial**.

---

## 1. Auditoria de Realidade & Benchmarking (prototype-reality-auditor)

Com base em benchmarks reais de sistemas de atendimento e ouvidorias corporativas/públicas (**Fala.BR / CGU**, **Movidesk**, **Zendesk** e **Seis Sigma/PDCA**), foram identificadas e eliminadas as seguintes complexidades artificiais:

| Elemento Auditado | Diagnóstico de Complexidade Artificial | Solução Operacional Adotada (Vida Real) |
| :--- | :--- | :--- |
| **Barras de Confiança de IA (ex: 92%)** | Não existe em sistemas de atendimento reais; operadores não calibram modelos matemáticos em tela de triagem. | **Eliminado.** A classificação do chamado é baseada no relato e na triagem da coordenação do polo com SLA objetivo em minutos. |
| **Micro-tempos Artificiais (8m triagem, 42m espera)** | Fragmentação irreal para manifestações de ouvidoria comunitária. | **Simplificado.** Registro do tempo de 1º contato (SLA de acolhimento), tempo de resolução e acompanhamento do custo emergencial. |
| **Banners Didáticos / "Metodologia de Validação"** | Dava tom de "trabalho acadêmico" ou tutorial para banca avaliadora. | **Substituído.** Interface executiva limpa, com quadro PDCA direto focado em causa raiz e planos de ação. |
| **Navegação Fragmentada (4 visões)** | Telas de "Investigação" e "Diagnóstico" dispersavam a tomada de decisão. | **Consolidado em 2 visões operacionais:** (1) Fila de Manifestações com Tratativa Imediata e (2) Causa Raiz & Planos de Ação (PDCA). |
| **Custo de Contingência e Reparos** | Faltava rastreabilidade financeira das queixas comunitárias. | **Adicionado.** Campo de custo de apoio emergencial (contingência) integrado à tratativa e aos indicadores executivos. |

---

## 2. As Duas Visões Operacionais

1. **Central de Manifestações dos Polos:**
   * Fila operacional filtrável por Polo (Norte, Centro, Sul, Leste), Categoria (Fala.BR), Canal e Status;
   * Detalhe de caso em 3 blocos diretos: (1) Relato Original do Cidadão, (2) Diagnóstico Operacional & Causa Raiz, (3) Medida de Acolhimento, Custo de Apoio e Resolução;
   * Copiar Parecer do Chamado em 1 clique para despacho por WhatsApp ou e-mail institucional.

2. **Causa Raiz & Planos de Ação (PDCA Comunitário):**
   * Gráficos agregados de Pareto por tema e concentração por polo/unidade;
   * Quadro de ações corretivas com metas de eficácia de processo (ex: redundância 4G, conformidade Anvisa RDC 727, oficinas de cotação).
