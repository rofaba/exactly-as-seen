<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Decisiones de arquitectura

- Rutas en `src/routes` (TanStack Router); una ruta por sección, sin hash anchors — cada página necesita SSR y metadatos propios.
- `src/lib/storage.ts` es la única capa que toca `localStorage` (claves `opositia.consultas`, `opositia.cookies`), con `try/catch` — evita accesos dispersos y fallos en navegadores restringidos.
- `src/data/images.ts` centraliza toda URL de imagen (clave → url, alt, ancho, alto) — permite migrar a `src/assets/` cambiando un solo archivo.
- Tokens de color y utilidades (`btn-*`, `card-flat`, `container-page`) se definen en `src/styles.css` con Tailwind v4 CSS-first — no hay `tailwind.config.js`.
- Metadatos SEO y JSON-LD se generan desde `src/lib/seo.ts` y se aplican en el `head()` de cada ruta — una sola fuente para title, description, canonical y Open Graph.
