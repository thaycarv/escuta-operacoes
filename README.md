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

## 🧭 Arquitetura Baseada em Benchmarks Reais (Fala.BR, Movidesk & Zendesk)

O sistema foi redesenhado e simplificado para refletir a rotina real de coordenações operacionais e ouvidorias públicas (Plataforma Fala.BR / CGU, Movidesk e Zendesk), eliminando elementos artificiais (como barras de confiança de IA e calibradores de modelo) em favor de duas esteiras diretas:

### 1. Fila de Manifestações dos Polos (Atendimento & Contenção Imediata)
* **Tipologia Fala.BR:** Classificação em **Reclamação**, **Solicitação**, **Sugestão**, **Elogio** e **Incidente Crítico**;
* **Confronto com a Realidade de Campo:** Relato original do beneficiário acompanhado do histórico operacional da unidade (ex: oscilação de link 4G de contingência, fila no balcão presencial, vistorias sanitárias de cozinhas conforme Anvisa RDC nº 727/2022);
* **Tratativa Operacional:** Registro de ação de contenção imediata, custo de apoio emergencial (quando aplicável) e comunicação oficial via WhatsApp/e-mail;
* **Indicadores Executivos:** Indicadores de volume por prioridade (Alta, Média, Baixa), tempo médio de resposta e índice de resolução.

### 2. Causa Raiz & Planos de Ação (PDCA Comunitário)
* **Visão Agregada de Gargalos:** Distribuição das manifestações por temas críticos (Infraestrutura & Conectividade, Alimentação & Segurança Nutricional, Logística de Oficinas, Suporte a Bolsas & Projetos);
* **Quadro PDCA de Ações Corretivas:** Ações estruturais em 4 estágios (*Planejada*, *Em andamento*, *Verificação* e *Concluída*);
* **Dupla Validação de Eficácia:** Cada melhoria tem meta de percepção comunitária (redução de chamados) e meta operacional mensurável (tempo de ciclo ou conformidade técnica).

---

## 🧭 As Duas Visões Operacionais do Sistema

1. **Central de Manifestações dos Polos:**
   * Tabela gerencial com filtros por Polo (Norte, Centro, Sul, Leste), Categoria, Prioridade e Status;
   * Painel de detalhes com 3 blocos diretos: (1) Relato do Cidadão, (2) Diagnóstico Operacional & Ação Imediata de Contenção, (3) Resolução e Custo de Apoio;
   * Modal para abertura rápida de novas ocorrências via balcão presencial ou WhatsApp.

2. **Causa Raiz & Planos de Ação:**
   * Diagnóstico visual das causas crônicas que sobrecarregam as equipes de campo;
   * Acompanhamento dos planos de melhoria contínua (ex: roteador 4G de redundância para polos digitais, revisão de fichas de preparo nas cozinhas comunitárias, oficinas de orçamentação e 3 cotações).

---

## 🛠️ Stack Técnica & Arquitetura

* **Interface:** HTML5 Semântico, CSS3 Moderno (Custom Properties, Flexbox e CSS Grid), JavaScript ES Modules puro (zero dependências pesadas, carga instantânea no navegador);
* **Design System:** Padrão editorial Slate Mineral & Deep Forest com ícones SVG vetoriais nítidos em todos os componentes;
* **Execução:** 100% Client-Side, compatível com GitHub Pages com persistência no SessionStorage do navegador.

---

## 👩‍💼 Competências Aplicadas

Voz do Cliente (VoC / VoB) • Engenharia de Processos & Qualidade • Análise de Causa Raiz • PDCA / 5W2H • Conformidade Sanitária (Rotulagem e Alérgenos) • Gestão de Compras e Prestação de Contas • Gestão de Filas e Capacidade
