# Gabriel Fialho de Carvalho | Portfólio Profissional

Página de apresentação profissional (site estático, sem servidor nem banco de dados).

- **Site no ar:** https://gabrielfialho34.github.io/landingpageGabriel/
- **Pasta oficial no PC:** `C:\Projetos\landingpageGabriel`

## Arquivos
- `index.html`: todo o texto da página (experiências, competências, contatos).
- `styles.css`: cores, fontes e layout.
- `script.js`: animações (contadores, efeito de aparecer ao rolar, menu).
- `assets/profile.jpg`: foto de perfil (também usada ao compartilhar o link).
- `assets/Gabriel_Fialho_de_Carvalho_Curriculo_Word.pdf`: currículo para download.
- `favicon.svg`, `site.webmanifest`: ícone da aba e atalho no celular.
- `robots.txt`, `sitemap.xml`: informações para o Google.
- `.github/workflows/deploy.yml`: publicação automática.
- `docs/`: relatórios de auditoria.

## Como atualizar o site
1. Faça a alteração numa branch separada e abra um Pull Request.
2. Ao aprovar (merge) o Pull Request na `main`, o GitHub publica sozinho em cerca de 30 segundos (aba **Actions** > *Deploy portfolio to GitHub Pages*).
3. Para trocar o currículo, substitua o PDF em `assets/` mantendo o mesmo nome.
4. Para trocar a foto, use um JPG quadrado de cerca de 1024×1024 px e até ~200 KB, com o nome `assets/profile.jpg`.
5. Ao mudar o conteúdo, atualize a data `lastmod` em `sitemap.xml`.

Se criar um arquivo novo na raiz, inclua-o na linha `cp` de `.github/workflows/deploy.yml`, senão ele não é publicado.

## Ver no PC antes de publicar
Abra um terminal na pasta do projeto e rode:

```bash
python -m http.server 8765
```

Depois acesse http://localhost:8765 no navegador.

## Google
O site já tem `canonical`, `sitemap.xml` e tags de compartilhamento. Para pedir indexação, abra o Google Search Console, adicione a URL do site e envie o `sitemap.xml`.
