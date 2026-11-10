# Escuta: Gestão de Ocorrências e Melhoria Contínua em Operações

> **Aplicação Online:** [https://thaycarv.github.io/escuta-operacoes/](https://thaycarv.github.io/escuta-operacoes/)

O **Escuta** é uma plataforma corporativa de gestão de ocorrências (SAC Operacional) e melhoria contínua desenhada para operações de **food service, varejo e delivery multicanal**.

O sistema conecta o atendimento ao cliente diretamente aos dados do processo produtivo. Em vez de tratar reclamações como fardos isolados, cada chamada gera duas saídas obrigatórias: a **tratativa imediata** para salvar a experiência do cliente (estorno, cupom ou reenvio) e a **etiquetagem da causa raiz** pelo setor operacional responsável (cozinha, expedição ou logística), alimentando planos de ação corretiva no final do turno.

Consulte o [Catálogo de Melhorias](MELHORIAS.md) para detalhes da evolução e simplificação do projeto.

---

## 1. O Desafio Operacional

Em operações de alimentação e delivery, falhas geram atrito imediato porque o produto é perecível e o cliente está com fome:
* Reclamações chegam dispersas em múltiplos canais (WhatsApp, iFood, Saipos e telefone);
* Atendentes perdem tempo sem visibilidade sobre se o atraso ocorreu na cozinha, na expedição ou na rota do motoboy;
* Reembolsos e cupons são concedidos sem rastreabilidade do **Custo da Não-Qualidade** (custo de indenizações por falha);
* As causas reincidentes continuam acontecendo no próximo pico de movimento porque não há conexão entre o SAC e o líder de turno.

---

## 2. A Rotina Operacional em 2 Visões Integradas

Em alinhamento às melhores práticas de Engenharia de Produção e plataformas líderes de SAC operacional (Zendesk, Movidesk e Anota AI), o Escuta é estruturado em duas visões claras:

### 1. Central de Ocorrências (Rotina Diária do Atendimento)
* **Fila Unificada de Chamados:** Rastreamento de chamados abertos, em tratamento e resolvidos, filtráveis por canal, setor e status;
* **Painel da Ocorrência em 3 Blocos:**
  1. **Relato Original do Cliente & Pedido:** Preservação integral da fala do cliente, itens do pedido, valor total e avaliação;
  2. **Contexto Operacional da Loja:** Comparativo entre o prazo prometido e o tempo real decorrido, apuração do atraso e carga de comandas no forno durante o horário;
  3. **Tratativa Imediata & Desfecho:** Registro da solução imediata (estorno via PIX, cupom, reenvio emergencial ou esclarecimento técnico), custo financeiro da falha e encerramento do chamado;
* **Repasse Rápido:** Recurso para copiar o resumo estruturado da ocorrência para o WhatsApp da operação ou líder da praça em 1 clique.

### 2. Causa Raiz & Planos de Ação (Visão Gerencial / PDCA)
* **Pareto de Motivos de Reclamação:** Gráfico identificando os principais ofensores do turno (ex.: atrasos na cozinha, itens ausentes na expedição);
* **Distribuição de Falhas por Setor:** Divisão percentual de responsabilidade entre Cozinha/Preparo, Expedição/Montagem, Logística/Entrega e Balcão;
* **Custo Total de Indenizações:** Impacto financeiro apurado de estornos e cupons sobre o faturamento do turno;
* **Planos de Ação Corretiva:** Ações operacionais práticas em andamento com meta mensurável, prazo e responsável formal (ex.: Throttling de capacidade no forno, checklist visual de conferência na expedição e matriz de alérgenos RDC 727).

---

## 3. Governança e Inteligência Operacional

* **Auto-Tagging Inteligente:** A tecnologia atua discretamente sugerindo a categoria e a severidade inicial do chamado sem burocracia na tela;
* **Controle Humano Mandatório:** O atendente ou supervisor valida e define a ação final e o status com um clique;
* **Sinais Críticos Protegidos:** Casos de segurança alimentar (alérgenos) acionam contato imediato de profissional habilitado (Nutricionista de plantão), em conformidade com as normas sanitárias RDC 727 e RDC 26.

---

## 4. Indicadores de Desempenho (KPIs do Turno)

* **Volume de Ocorrências:** Total registrado, em aberto e em tratamento;
* **SLA de 1º Contato:** Tempo médio de resposta inicial ao cliente (meta operacional: &lt; 10 min);
* **Taxa de Resolução:** Percentual de casos efetivamente solucionados com confirmação;
* **Custo da Não-Qualidade:** Total desembolsado em compensações, fretes e estornos;
* **CSAT de Atendimento:** Percepção de qualidade apurada nos canais de avaliação.

---

## 5. Estrutura Técnica

* **Tecnologias:** JavaScript ES Modules nativo, HTML5 semântico e CSS moderno com variáveis e layout flexível;
* **Design System:** Paleta neutra corporativa (Slate/Grafite e Esmeralda institucional), tipografia Inter e ícones vetoriais SVG;
* **Armazenamento:** Persistência no `sessionStorage` do navegador, garantindo autonomia de exploração local sem necessidade de banco de dados externo;
* **Compatibilidade:** Totalmente estático e hospedado no GitHub Pages.

---

## 6. Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/thaycarv/escuta-operacoes.git
   ```
2. Abra o arquivo `index.html` diretamente em seu navegador ou inicie um servidor HTTP local:
   ```bash
   npx serve .
   ```
3. Demonstração online disponível em: `https://thaycarv.github.io/escuta-operacoes/`

---

## 7. Autoria

Desenvolvido por **Thayâne Carvalho**  
*Engenheira de Produção & Nutricionista | Gestão de Operações, Qualidade e PMO*
