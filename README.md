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
* **Dificuldades regulatórias:** Reclamações de atraso em repasses frequentemente revelam falta de modelos padronizados de cotações exigidas pelo **MROSC (Lei nº 13.019/2014)**;
* **Planos de ação sem eficácia:** Melhorias que não medem simultaneamente a percepção do usuário e a métrica interna do processo geram retrabalho.

---

## 🧭 As Quatro Visões do Sistema

1. **Central de Manifestações dos Polos:**
   * Tabela gerencial filtrável por unidade, canal, gravidade e status, com busca em tempo real;
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

Voz do Cliente (VoC / VoB) • Engenharia de Processos & Qualidade • Análise de Causa Raiz • PDCA / 5W2H • Conformidade Sanitária (Anvisa RDC 727/2022) • Governança MROSC (Lei 13.019/2014) • Gestão de Filas e Capacidade
