# Servicos Maiawall

Aplicacao Next.js separada para a experiencia de servicos que antes ficava em `maiawall.com/dev`.

A fonte migrada foi a landing Angular `dev-landing`. O conteudo, imagens, secoes, CTAs, projetos, stack, formulario e identidade visual foram trazidos para esta app em React/Next, preparada para publicar em `https://servicos.maiawall.com`.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- shadcn-style UI primitives
- lucide-react
- framer-motion
- next-themes
- react-hook-form + zod + @hookform/resolvers
- axios
- @tanstack/react-query
- sonner
- clsx, tailwind-merge, class-variance-authority
- Prettier + eslint-plugin-simple-import-sort

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Se o servidor de desenvolvimento padrao apresentar erro de carregamento com Turbopack, rode a versao Webpack:

```bash
npm run dev:webpack
```

## Validacao local

```bash
npm run lint
npm run build
```

## Variaveis de ambiente

Copie `.env.example` para `.env.local` quando precisar sobrescrever os valores padrao.

```env
NEXT_PUBLIC_SITE_URL=https://servicos.maiawall.com
GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_API_BASE_URL=https://api.maiawall.com
```

## SEO / Analytics

### Google Search Console (verificacao)

Para aparecer separado do portfolio principal, crie uma propriedade propria no Google Search Console para `https://servicos.maiawall.com`. Use uma propriedade de prefixo de URL se quiser controlar somente este subdominio, ou uma propriedade de dominio se quiser validar todos os subdominios de `maiawall.com`.

Depois, copie apenas o valor do `content` da meta tag `google-site-verification` para a variavel:

```env
GOOGLE_SITE_VERIFICATION=COLE_AQUI_O_CODIGO_DE_VERIFICACAO
```

O Next.js gera a meta tag automaticamente em `src/app/layout.tsx` quando essa variavel existe.

### Google Analytics / GA4

O site ainda nao possui o script do GA4. Para ativar, adicione o snippet a seguir em `src/app/layout.tsx`, dentro de `<head>` (ou via componente `Analytics`):

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-SEU_ID");
</script>
```

Substitua `G-SEU_ID` pelo Measurement ID da sua propriedade GA4.

### Assets de SEO

- `og:image`: `public/assets/images/hero-preview.png` — configurada em `metadata.openGraph`, `metadata.twitter`, manifest e sitemap.
- `robots.txt`: gerado em `src/app/robots.ts`.
- `sitemap.xml`: gerado em `src/app/sitemap.ts`.
- Dados estruturados (JSON-LD): injetados em `src/app/page.tsx` (`Organization`, `Person`, `WebSite`, `WebPage`, `OfferCatalog`, `ItemList` de projetos).

## Deploy

Publique esta raiz do projeto como a aplicacao independente do subdominio `servicos.maiawall.com`.

No projeto principal, a rota antiga `/dev` deve ser removida ou redirecionada permanentemente para `https://servicos.maiawall.com`.
