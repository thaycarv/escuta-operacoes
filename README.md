# RadarSocial Escuta: Ouvidoria Ativa & Voz do Beneficiário (VoC/VoB)

> **Módulo Integrado ao Ecossistema RadarSocial**  
> **Aplicação Online:** [https://thaycarv.github.io/escuta-operacoes/](https://thaycarv.github.io/escuta-operacoes/)  
> **Autora & Coordenação Técnica:** Thayâne Carvalho (Engenharia de Produção & Nutrição)

O **RadarSocial Escuta** é o módulo operacional de Ouvidoria Ativa, Gestão da Voz do Usuário/Beneficiário (VoC/VoB), diagnóstico de causa raiz e planos de melhoria contínua de processos do ecossistema **RadarSocial**.

Enquanto o **RadarSocial** atua no nível macro-estratégico (governança de programas e controle físico-financeiro) e o **RadarSocial Prioriza** atua na triagem tática de chamados dos polos, o **RadarSocial Escuta** fecha o ciclo de ponta a ponta: escuta quem utiliza os serviços comunitários, confronta a insatisfação percebida com os tempos reais do processo e alimenta planos de ação com dupla validação (satisfação do cidadão + eficiência operacional).

---

## 🎯 O Desafio Operacional na Gestão de Serviços Sociais

Manifestações de beneficiários de programas comunitários chegam fragmentadas por múltiplos canais (WhatsApp dos polos, balcão de acolhimento presencial, totens e ouvidoria geral). Sem conexão com a operação real, esses relatos viram apenas reclamações reativas:

* **Falta de correlação com dados de processo:** Não se identifica se a demora decorreu de saturação física do polo (ex.: mais de 30 jovens simultâneos no Polo Digital) ou falha de comunicação prévia;
* **Riscos sanitários e nutricionais:** Dúvidas sobre declaração de alérgenos (**Anvisa RDC nº 727/2022**) em refeições de cozinhas comunitárias exigem intervenção técnica imediata da nutricionista;
* **Dificuldades regulatórias e de compras:** Reclamações de atraso em repasses frequentemente revelam falta de modelos padronizados para as 3 cotações de fornecedores e comprovações de compras exigidas pelos projetos;
* **Planos de ação sem eficácia:** Melhorias que não medem simultaneamente a percepção do usuário e a métrica interna do processo geram retrabalho.

---

## 🧭 Arquitetura Baseada em Benchmarks Reais (Fala.BR & Closed-Loop VoC)

O sistema foi desenhado com base nas melhores práticas de **Ouvidorias Públicas (Plataforma Fala.BR / CGU)** e plataformas corporativas de **Voice of the Customer (Zendesk, Medallia, Qualtrics)**, operando em duas esteiras integradas de **Closed-Loop Feedback**:

### 1. Inner Loop (Resolução com o Cidadão / Atendimento Direto)
* **Tipologia Padronizada (Padrão Fala.BR):** Classificação rigorosa em **Reclamação**, **Solicitação**, **Sugestão**, **Elogio** e **Incidente Crítico**;
* **Confronto com Indicadores de Operação:** Comparação em tempo real do relato do cidadão com os tempos reais de triagem, espera no polo e carga concorrente de pessoas, distinguindo gargalos físicos de falhas pontuais de comunicação;
* **Supervisão Humana (Human-in-the-Loop):** Apoio analítico determinístico com validação obrigatória do analista;
* **Fechamento Formal do Ciclo:** O chamado só é considerado resolvido após confirmação do cidadão, retroalimentando as métricas de CSAT e tempo de resposta.

### 2. Outer Loop (Melhoria Contínua de Processos / Causa Raiz)
* **Diagnóstico Agregado:** Histograma de frequência por tema nos últimos 30 dias e identificação das causas raízes crônicas;
* **Kanban PDCA com Dupla Validação:** Cada plano de ação exige simultaneamente um indicador de percepção do usuário (CSAT, redução de manifestações) e um indicador de eficiência de processo (tempo de espera, conformidade de fichas técnicas);
* **Painel Comparativo Antes vs. Depois:** Mensuração objetiva dos ganhos de capacidade e qualidade após a intervenção.

---

## 🧭 As Quatro Visões do Sistema

1. **Central de Manifestações dos Polos:**
   * Tabela gerencial filtrável por unidade, tipo de manifestação (Fala.BR), canal, gravidade e status, com busca em tempo real;
   * Indicadores de desempenho em tempo real: CSAT, NPS, tempo médio de primeira resposta e taxa de resolução confirmada pelo cidadão;
   * Botão de registro manual de ocorrências com histórico auditável.

2. **Investigação do Caso & Confronto de Processo:**
   * **Relato Original:** Preservação integral das palavras do usuário sem filtros de IA que distorçam o contexto;
   * **Confronto com Dados Reais:** Comparação do relato com tempos de triagem inicial, espera no polo e resolução técnica, além da carga concorrente de pessoas no horário;
   * **Apoio Analítico com Supervisão Humana:** Sugestão de tema e gravidade com barra de confiança analítica, exigindo validação explícita do operador;
   * **Parecer do Chamado em 1 Clique:** Exportação estruturada pronta para envio por WhatsApp, e-mail institucional ou registro em chamado.

3. **Diagnóstico & Causa Raiz:**
   * Histograma de frequência por tema reclamado nos últimos 30 dias;
   * Identificação de causas recorrentes (saturação em horários de pico, comunicação reativa);
   * Comparativo antes vs. depois comprovando o ganho de eficiência após as correções.

4. **Planos de Melhoria Contínua (PDCA & VoC):**
   * Quadro Kanban de ações em 4 estágios: *Planejada*, *Em andamento*, *Verificação* e *Concluída*;
   * **Metodologia de Dupla Validação:** Toda ação só é considerada concluída se atingir simultaneamente um indicador de percepção do cidadão (CSAT, redução de queixas) e um indicador de processo operacional interno (tempo de ciclo, conformidade de rotulagem).

---

## 🛠️ Stack Técnica & Arquitetura

* **Interface:** HTML5 Semântico, CSS3 Moderno (Custom Properties, Flexbox e CSS Grid), JavaScript ES Modules puro (zero dependências pesadas, carga instantânea no navegador);
* **Design System:** Padrão editorial Slate Mineral & Deep Forest com ícones SVG vetoriais nítidos em todos os componentes;
* **Execução:** 100% Client-Side, compatível com GitHub Pages com persistência no SessionStorage do navegador.

---

## 👩‍💼 Competências Aplicadas

Voz do Cliente (VoC / VoB) • Engenharia de Processos & Qualidade • Análise de Causa Raiz • PDCA / 5W2H • Conformidade Sanitária (Rotulagem e Alérgenos) • Gestão de Compras e Prestação de Contas • Gestão de Filas e Capacidade
