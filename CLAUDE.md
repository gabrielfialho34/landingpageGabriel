# Regras deste projeto

- Pasta oficial: `C:\Projetos\landingpageGabriel` (fora do OneDrive). Não criar cópias.
- Repositório: `gabrielfialho34/landingpageGabriel` — **público** (exigência do GitHub Pages gratuito). Nunca colocar dados de clientes, senhas ou informações internas do escritório aqui.
- Site estático publicado no GitHub Pages pelo workflow `.github/workflows/deploy.yml` a cada push na `main`. Arquivos novos na raiz precisam entrar na linha `cp` do workflow.
- Toda mudança em branch separada + Pull Request. Nunca fazer merge sem aprovação do usuário. Apagar a branch depois do merge.
- Commits com o e-mail privado do GitHub (já configurado no `git config` local desta pasta), nunca o e-mail corporativo.
- Testar no navegador com `python -m http.server 8765` antes de abrir o PR; conferir também com "prefers-reduced-motion" ativado, pois as animações ficam desligadas nesse modo.
- O usuário não programa: explicar tudo em português simples.
