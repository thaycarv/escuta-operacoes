# Diretrizes de Contribuição

Este repositório segue um fluxo simples e rastreável para alterações de código, interface e documentação.

## Fluxo de Trabalho
1. Crie uma **Issue** descrevendo o ajuste, correção ou melhoria usando os modelos em `.github/ISSUE_TEMPLATE/`.
2. Trabalhe em uma branch dedicada (`fix/`, `feat/` ou `refactor/`), evitando commits diretos na `main`.
3. Abra um **Pull Request** preenchendo `.github/PULL_REQUEST_TEMPLATE.md` e vinculando a Issue (`Resolve #N`).

## Qualidade e Interface
* Mantenha português do Brasil claro e sem travessões (`—` ou `–`) nos textos.
* Preserve suporte a `@media (prefers-reduced-motion: reduce)` em animações CSS e mantenha carregamento instantâneo sem skeletons artificiais.
* Garanta que a verificação de sintaxe e integridade no GitHub Actions passe antes do merge.
