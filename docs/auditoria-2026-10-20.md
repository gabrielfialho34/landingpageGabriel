# Auditoria — landingpageGabriel (2026-10-20)

Site estático (HTML/CSS/JS) publicado no GitHub Pages:
https://gabrielfialho34.github.io/landingpageGabriel/

Auditoria somente leitura. Nada foi alterado além da criação deste arquivo.

> **Status:** itens corrigidos nos PRs #1 (bugs), #2 (foto), #3 (limpeza) e #4 (documentação). A pasta oficial passou a ser `C:\Projetos\landingpageGabriel`. Pendências do usuário: ocultar o e-mail no GitHub, decidir sobre o telefone no currículo, apagar a pasta antiga no OneDrive.

## Resumo

O site funciona, está no ar e é idêntico ao código do GitHub (comparado arquivo a arquivo, ignorando quebras de linha).
Não há senhas, tokens ou dados de clientes no código nem no histórico do git.
O maior risco é organizacional: a pasta está no OneDrive, fora de `C:\Projetos\`. O maior bug: a faixa de números some para quem usa "reduzir movimento" no sistema.

## 1. Organização e cópias

| Item | Situação |
|---|---|
| Pasta local | `C:\Users\gfialhoc\OneDrive - MARTINELLI ADVOGADOS\Projetos\landingpageGabriel` — **no OneDrive, fora de `C:\Projetos\`** |
| `C:\Projetos\landingpageGabriel` | Não existe |
| Outras cópias do projeto | Nenhuma (busca em Documents, Desktop, Downloads, OneDrive, `Documents\Codex`) |
| Cópias do currículo PDF em `Downloads` | 3 arquivos iguais ao do site (`..._Word.pdf`, `(1)`, `(2)`) + 1 versão antiga diferente (`Gabriel_Fialho_de_Carvalho_Curriculo.pdf`, 13/04) |
| GitHub | `gabrielfialho34/landingpageGabriel`, **público** (necessário para GitHub Pages gratuito) |
| Sincronização local x GitHub | Em dia (0 commits atrás/à frente, sem alterações pendentes) |
| Site publicado x GitHub | Idêntico |
| Branches / PRs | Só `main`; nenhum PR aberto |
| `CLAUDE.md` / `AGENTS.md` do projeto | Não existe |

Outros projetos de código também estão no OneDrive (`Projetos\formpd-autofill`, `Projetos\analisecanvas`, etc.) — fora do escopo, mas violam a mesma regra.

## 2. Senhas e chaves

- Nenhum segredo encontrado em arquivos nem em `git log --all -p` (gitleaks não instalado; busca manual por token/senha/api key/secret/webhook/sig=). A única ocorrência é `id-token: write` em `.github/workflows/deploy.yml:13`, que é uma permissão padrão do GitHub Pages, não um segredo.
- O repositório não usa nenhum secret.
- **Exposição de dados pessoais (não é segredo, mas é público):**
  - E-mail corporativo `gfialhoc@martinelli.adv.br` como autor de todos os 21 commits — visível para qualquer pessoa no repositório público.
  - O currículo público `assets/Gabriel_Fialho_de_Carvalho_Curriculo_Word.pdf` contém número de telefone (não contém CPF nem endereço). Metadado "Author: python-docx".
  - E-mail pessoal em `index.html:51` e `index.html:431` (intencional, contato).

## 3. Dados de clientes e backup

- Nenhum dado de cliente no projeto. Conteúdo é só o portfólio pessoal.
- Backup: o próprio GitHub (código completo + histórico). Suficiente para este projeto.

## 4. Segurança do site

- Site estático, sem login, formulários ou servidor. Superfície de ataque praticamente nula.
- HTTPS forçado no GitHub Pages (`https_enforced: true`).
- Links externos com `rel="noopener noreferrer"` (`index.html:90`, `:118`, `:427`). OK.
- Dependências externas carregadas em tempo real: Google Fonts (`index.html:38-43`) e ícones do icons8 (`index.html:402-404`). Se o icons8 mudar/remover as imagens, os ícones somem. O uso gratuito do icons8 exige link de atribuição, que não existe na página.

## 5. Bugs

### 5.1 [BUG REAL] Faixa de números invisível com "reduzir movimento"
- `index.html:171`, `:175`, `:179`: os três `.impact-item` já vêm com a classe `reveal` no HTML.
- `styles.css:888-893`: `.reveal { opacity: 0; transform: translateY(40px) }`.
- `script.js:27`: todo o código que adiciona `.active` (e anima os números, `script.js:68-99`) só roda se `prefers-reduced-motion` **não** estiver ativo.
- `styles.css:871-882`: o bloco de movimento reduzido não anula a opacidade de `.reveal`.
- **Efeito:** para quem tem "Mostrar animações" desligado no Windows / "Reduzir movimento" no celular, a seção de impacto fica em branco (opacidade 0) e, se aparecesse, mostraria "0".
- **Correção:** remover `reveal` do HTML (o JS já adiciona em `script.js:56` porque `.impact-item` está no seletor da linha 52), e no caminho de movimento reduzido preencher `.impact-number` com `data-target` direto. Opcional: em `styles.css` dentro de `@media (prefers-reduced-motion: reduce)` adicionar `.reveal { opacity: 1; transform: none; }` como garantia.

### 5.2 [BUG] `site.webmanifest:5` — `"start_url": "/"`
O site fica em `/landingpageGabriel/`. Se alguém "instalar" a página no celular, ela abre `gabrielfialho34.github.io/` (página 404). Trocar por `"./"` ou `"/landingpageGabriel/"`. Adicionar também `"scope": "./"`.

### 5.3 [BUG MENOR] Meta tag duplicada
`index.html:30` e `index.html:34`: `og:site_name` repetida. Remover a da linha 34.

### 5.4 Desempenho
`assets/profile.png`: 1,7 MB, 1024×1024 px, carregada com `loading="eager"` (`index.html:136`) e também usada como imagem de compartilhamento (`index.html:28`). Converter para JPG/WebP ~150–250 KB (manter 1024 px é bom para o og:image; idealmente gerar versão menor para a página). É o item mais pesado do site (≈ 90% do download).

## 6. Qualidade / limpeza

- `index.html:313` e `index.html:330`: estilos escritos direto no HTML (`style="..."`), repetidos. Mover para uma classe em `styles.css`.
- `index.html:173`, `:313`: `&` sem escape (`Inovação & P&D`, `Projetos & Consultoria`). Navegadores aceitam, mas o padrão do resto do arquivo é `&amp;`.
- `index.html:44`, `:136`, `:446`: controle de cache manual (`?v=2`, `?v=3`). Funciona, mas é fácil esquecer de aumentar o número. Aceitável para um site deste tamanho.
- `.github/workflows/deploy.yml:7`: publica também em push para `master`, branch que não existe. Inofensivo; remover para clareza.
- `.github/workflows/deploy.yml:28,31,40,46`: actions fixadas por versão principal (`@v4`, `@v5`, `@v3`). Padrão aceitável; não há Dependabot configurado (`.github/dependabot.yml` ausente) — opcional para manter as actions atualizadas.
- `.gitignore:1`: `output/` — pasta que não existe no projeto (sobra). Inofensivo.
- Não há página 404 personalizada (`404.html`). Opcional.
- `sitemap.xml:5`: `lastmod` fixo em 2026-04-17; atualizar quando o conteúdo mudar.

## 7. Automações e custos

- Única automação: GitHub Actions `Deploy portfolio to GitHub Pages`. Últimas 10 execuções: **10/10 com sucesso**, ~20 s cada. Custo: zero (repositório público, minutos ilimitados).
- Nenhum agendamento, Cloudflare, Power Automate ou serviço pago.
- Sem dependências npm/pip — nada para `npm audit`/`pip-audit`.

## 8. Documentação

- `README.md:16`: manda criar repositório chamado `gabriel-fialho-portfolio` — o nome real é `landingpageGabriel`.
- `README.md:27-31` e `PUBLICAR.md:15,19`: dizem que `canonical`, `og:url` e `sitemap.xml` ainda faltam — já foram feitos (`index.html:7`, `:27`, `sitemap.xml`).
- README não informa a URL publicada nem como editar o conteúdo.
- `PUBLICAR.md` e `README.md` repetem as mesmas instruções; unir num só.

## Plano de execução (um PR por etapa)

1. **PR 1 — Bugs do site:** itens 5.1, 5.2, 5.3. Testar no navegador com "reduzir movimento" ativado (DevTools > Rendering > Emulate prefers-reduced-motion).
2. **PR 2 — Foto mais leve:** item 5.4.
3. **PR 3 — Limpeza:** itens da seção 6 (estilos inline, `&amp;`, branch `master` no workflow, `.gitignore`).
4. **PR 4 — Documentação:** reescrever README com o estado atual, URL do site, como editar; apagar `PUBLICAR.md` (conteúdo incorporado ao README); criar `CLAUDE.md`/`AGENTS.md` com a pasta oficial e as regras.
5. **Manual (usuário):** mover a pasta para `C:\Projetos\landingpageGabriel`; trocar o e-mail dos commits futuros para o e-mail privado do GitHub; decidir sobre o telefone no currículo; apagar cópias repetidas do currículo em Downloads.
