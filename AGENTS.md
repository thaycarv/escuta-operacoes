# 🤖 Diretrizes de Governança e Contribuição com IA (AGENTS.md)
**Repositório**: `Escuta: Voz do Cliente e Melhoria Contínua`  
**Responsável**: Thayâne Carvalho (Gestão de Projetos & Processos)

---

## 🎯 Objetivo & Padrão de Trabalho
Este documento estabelece o protocolo mandatório de engenharia e gestão de mudanças para qualquer agente de IA ou desenvolvedor que atue no projeto **Escuta**.

Toda e qualquer evolução técnica, correção ou melhoria deve seguir estritamente o fluxo de **Rastreabilidade e Governança**:

---

## 1. 📌 Gestão de Demandas via GitHub Issues

Nenhuma alteração de código ou funcionalidade deve ser realizada sem uma **Issue** correspondente previamente criada e categorizada:

1. **`[Correção]`** *(Bugfix)*: Resolução de falhas de cálculo de SLA, quebras de layout, inconsistências em gráficos ou erros de script.
2. **`[Melhoria]`** *(Enhancement)*: Refinamento de usabilidade, aprimoramento de contraste/temas, clareza metodológica ou otimização de performance.
3. **`[Nova Função]`** *(Feature)*: Criação de novos módulos analíticos, novos filtros de canal ou integração de relatórios.

---

## 2. 🔀 Fluxo de Branches e Pull Requests (PRs)

1. **Nunca realizar alterações diretas na branch `main`**.
2. Criar branches nomeadas a partir da Issue correspondente:
   * `fix/nome-da-correcao`
   * `feat/nome-da-feature`
   * `refactor/nome-da-melhoria`
3. Todas as entregas e deploys devem ser gerenciados exclusivamente através de **Pull Requests** direcionados à branch `main`.

---

## 3. 📝 Estrutura Obrigatória de todo Pull Request (PR Template)

Todo Pull Request aberto deve conter obrigatoriamente as seguintes 4 seções detalhadas:

```markdown
### 🔗 Issue Vinculada
- Resolve: #[Número da Issue] (ou link para a Issue)

### 📋 O que mudou?
- Descrição clara, técnica e objetiva das alterações realizadas no código ou na arquitetura.

### ✅ Como foi validado?
- Comandos de build ou testes executados.
- Validações visuais nos temas e responsividade.
- Testes de usabilidade e integridade funcional realizados.

### ⚠️ Riscos, Limitações & Próximos Passos
- Riscos mapeados ou dependências técnicas.
- Limitações da implementação atual.
- Próximos passos e melhorias futuras recomendadas.
```

---

## 4. 🛡️ Critérios de Aceite & Governança Ética
* **Preservação do Relato**: O relato original do cliente nunca deve ser descaracterizado ou resumido de forma a perder seu contexto.
* **Supervisão Humana (*Human-in-the-loop*)**: Sugestões analíticas da IA exigem validação humana antes de alterar status ou planos de ação.
* **Foco em Processos**: Diagnósticos devem orientar soluções para tempos de preparo, rota e logística, sem atribuições punitivas individuais.
