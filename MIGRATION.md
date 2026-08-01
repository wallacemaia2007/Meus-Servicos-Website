# Migracao de dev-landing para servicos.maiawall.com

## Fonte inspecionada

A experiencia correta estava em `dev-landing`, como uma landing Angular por componentes. A pasta fonte foi removida depois da migracao para deixar este projeto somente com a app Next final.

Arquivos fonte relevantes:

- `dev-landing.component.*`: composicao geral da pagina e container visual.
- `layout/header/*`: header, navegacao, links sociais, CV, WhatsApp e menu mobile.
- `layout/footer/*`: rodape, links, contatos e redes sociais.
- `pages/hero/*`: hero com canvas de particulas, metricas, CTAs e preview de dashboard.
- `pages/problem-solution/*`: comparativo de problemas/solucoes e grid de servicos.
- `pages/works/*`: secao interativa de categorias de servico com predios/cidade.
- `pages/projects/*`: seletor interativo de projetos, screenshots, videos e CTAs.
- `pages/stack/*`: stack por abas, terminal animado e cards de skills.
- `pages/contact/*`: formulario de contato e cards de canais.
- `pages/cta/*`: CTA final com background `banner_codigo.jpg`.

Tambem foram conferidos os assets e traducoes da versao publicada em `https://www.maiawall.com/dev`, porque a pasta local `dev-landing` nao incluia todos os arquivos de `assets`, `environment` e dicionarios usados em runtime.

## Migrado para Next.js

- Rota principal `/` no App Router.
- Layout global com Header, Footer, React Query, tema dark fixo e Toaster.
- Secoes equivalentes: Hero, Problem/Solution, Works, Projects, Stack, Contact e CTA.
- Conteudo centralizado em `src/data/dev-content.ts`, evitando strings espalhadas.
- Contratos TypeScript em `src/types`.
- Links, nome do site e URL publica em `src/constants/site.ts`.
- Cliente HTTP com `axios` em `src/services/http-client.ts`.
- Envio de contato em `src/services/contact-service.ts`.
- Formulario com `react-hook-form`, `zod`, `@tanstack/react-query` e `sonner`.
- CTAs de WhatsApp preservando os textos/intencoes da landing original.
- Assets migrados para `public/assets`, incluindo logo, avatar, banner, imagens/videos de projetos, CV e icones.
- SEO em `src/app/layout.tsx`, `src/app/sitemap.ts` e `src/app/robots.ts`, com canonical para `https://servicos.maiawall.com`.

## Permanece no projeto principal

- O restante do site `maiawall.com`.
- A rota antiga `/dev` nao deve mais servir uma experiencia duplicada depois do deploy da nova app.

## Ajuste recomendado no projeto principal

Criar redirect permanente:

```txt
/dev -> https://servicos.maiawall.com
```

Se houver links internos apontando para `/dev`, atualizar para `https://servicos.maiawall.com`.

## Observacoes

- Nao foram inventados servicos, metricas, projetos, clientes, depoimentos ou links novos.
- O conteudo migrado veio de `dev-landing` e da versao publicada da propria pagina `/dev`.
- O endpoint de contato padrao e `https://api.maiawall.com/contact`, configuravel por `NEXT_PUBLIC_API_BASE_URL`.
