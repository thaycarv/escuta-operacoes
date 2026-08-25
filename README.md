# Escuta: Voz do Cliente e Melhoria Contínua em Operações

O **Escuta** é um protótipo funcional para coleta, categorização, análise de causa raiz e priorização de melhorias operacionais a partir da Voz do Cliente (VoC), com apoio analítico responsável.

Consulte o [Catálogo de Melhorias](MELHORIAS.md) para detalhes da evolução do projeto.

---

## 1. O Desafio Operacional

Feedbacks de clientes frequentemente chegam fragmentados entre múltiplos canais (WhatsApp, aplicativos de entrega, formulários de pesquisa e telefone). Na maioria das operações, esses relatos são tratados apenas como reclamações isoladas, sem conexão com os dados reais do processo produtivo.

Essa desconexão gera:
* Diagnósticos superficiais baseados apenas na insatisfação percebida;
* Dificuldade de identificar se a falha ocorreu na confirmação, na produção ou na logística de entrega;
* Falta de rastreabilidade entre o que o cliente disse e as ações de melhoria contínua;
* Dependência de respostas reativas em vez de correções estruturais na operação.

---

## 2. A Jornada Modelada de VoC

O fluxo do Escuta conecta a experiência do cliente diretamente aos indicadores de processo:

1. **Captura Multicanal:** Centralização de feedbacks recebidos via WhatsApp, iFood, Saipos, telefone ou pesquisa interna;
2. **Preservação da Linguagem Original:** O relato do cliente é mantido na íntegra, sem alterações ou resumos que eliminem o contexto;
3. **Apoio Analítico:** O modelo sugere tema provável e gravidade com nível de confiança explícito;
4. **Validação Humana (Human-in-the-Loop):** O analista valida, corrige ou descarta as sugestões da IA com registro no histórico do chamado;
5. **Confronto com Dados Operacionais:** Comparação do relato com os tempos reais de cada etapa (confirmação, preparo, espera e rota);
6. **Planos de Ação de Melhoria:** Criação e acompanhamento de melhorias combinando indicadores de experiência (CSAT/NPS) e indicadores de processo.

---

## 3. Principais Recursos da Versão 2.0

* **Central Multicanal de Feedbacks:** Tabela filtrável por canal, gravidade e status de resolução;
* **Investigação Detalhada por Caso:** Visualização lado a lado do relato do cliente, tempos operacionais e histórico auditável;
* **Parecer de VoC em 1 Clique:** Recurso para copiar o diagnóstico estruturado do caso pronto para compartilhamento;
* **Painel de Padrões e Hipóteses:** Identificação de causas recorrentes (exemplo: atrasos gerados por saturação de capacidade produtiva);
* **Quadro Kanban de Melhorias:** Acompanhamento de ações com validação dupla (satisfação do cliente e eficiência operacional);
* **Painel de Indicadores:** Monitoramento de CSAT, NPS demonstrativo, tempo de resposta e taxa de resolução confirmada.

---

## 4. Governança e IA Responsável

* **Transparência:** Todo cálculo de confiança da IA é visível para o operador;
* **Supervisão Obrigatória:** Nenhuma classificação automática altera status ou encerra chamados sem validação humana;
* **Sinais Críticos Protegidos:** Casos que envolvem segurança alimentar ou cobranças duplicadas exigem intervenção humana imediata.

---

## 5. Estrutura Técnica

* **Tecnologias:** JavaScript ES Modules + HTML5 Semântico + CSS Moderno;
* **Armazenamento:** Persistência no SessionStorage do navegador para exploração livre;
* **Execução:** Totalmente estático, compatível com GitHub Pages sem necessidade de backend complexo.

---

## 6. Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/thaycarv/escuta-operacoes.git
   ```
2. Abra o arquivo `index.html` no seu navegador ou utilize um servidor local:
   ```bash
   npx serve .
   ```
3. Acesse a demonstração pública: `https://thaycarv.github.io/escuta-operacoes/`

---

## 7. Créditos

Projeto autoral desenvolvido por **Thayâne Carvalho**, focado em **Voz do Cliente (VoC), Gestão de Operações e Melhoria Contínua**.
