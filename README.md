# Academia Opositia — sitio institucional (demo)

Sitio institucional de **Academia Opositia**, academia ficticia de Montevideo (Uruguay)
que prepara personas para concursos públicos. Es un **sitio de demostración**: todos los
datos, precios, fechas, docentes y testimonios son inventados.

## Cómo arrancar

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # build de producción
bun run lint     # ESLint
```

## Stack

- React 19 + TypeScript + Vite
- TanStack Router (enrutado por archivos en `src/routes`)
- Tailwind CSS v4 (los tokens viven en `src/styles.css`, no hay `tailwind.config.js`)
- Tipografía **Plus Jakarta Sans** empaquetada con
  `@fontsource-variable/plus-jakarta-sans` (sin pedidos a Google en runtime)
- Sin backend, sin base de datos, sin APIs externas. Todo el estado persistente va a
  `localStorage`

## Dónde está cada cosa

| Ruta | Contenido |
| --- | --- |
| `src/routes/__root.tsx` | Estructura común: `lang="es-UY"`, header, footer, banner de cookies, JSON-LD |
| `src/routes/index.tsx` | Inicio (`/`) |
| `src/routes/cursos.tsx` | Catálogo con filtro por modalidad (`/cursos`) |
| `src/routes/equipo.tsx` | Quiénes somos, valores y plantel (`/equipo`) |
| `src/routes/contacto.tsx` | Formulario, atención comercial, ubicación y consultas guardadas (`/contacto`) |
| `src/routes/aviso-legal.tsx`, `privacidad.tsx`, `terminos.tsx` | Páginas legales con el aviso de texto pendiente |
| `src/components/` | `Header`, `Footer`, `CookieBanner`, `Img`, `LegalPage` |
| `src/data/courses.ts` | Los 6 cursos con temario, horarios, inicio y precio |
| `src/data/teachers.ts` | Los 6 docentes ficticios |
| `src/data/testimonials.ts` | Los 3 testimonios ficticios |
| `src/data/sampleConsultas.ts` | Las 3 consultas de ejemplo precargadas |
| `src/data/contacto.ts` | Datos de contacto y referencias de cómo llegar |
| `src/data/images.ts` | **Única** fuente de URLs de imágenes (clave → url, alt, ancho, alto) |
| `src/lib/storage.ts` | **Única** capa que toca `localStorage` |
| `src/lib/seo.ts` | `title`, meta description, canonical, Open Graph y JSON-LD |

### Imágenes

Ningún componente tiene una URL escrita directamente: todo pasa por `src/data/images.ts`
y por el componente `Img`. Para migrar a archivos locales, se copian los archivos a
`src/assets/` y se reemplaza cada `url` en ese archivo; no hay que tocar nada más.

## Claves de `localStorage`

| Clave | Forma | Para qué |
| --- | --- | --- |
| `opositia.consultas` | `Array<{ id, fecha, nombre, email, telefono, cursoId, cursoNombre, mensaje }>` | Consultas enviadas por el formulario. `id` con formato `OPO-0001` |
| `opositia.cookies` | `{ estado: "accepted" \| "rejected", fecha: string }` | Decisión del banner de cookies |

Todo acceso pasa por `src/lib/storage.ts`, con `try/catch`. Si el navegador bloquea el
almacenamiento, la página de contacto muestra un aviso visible y sigue funcionando.

## Datos de ejemplo y cómo reiniciarlos

La primera vez que se abre `/contacto` se precargan 3 consultas de ejemplo
(`OPO-0001` a `OPO-0003`). El botón **“Reiniciar datos de ejemplo”**, en el panel
“Consultas guardadas en este navegador”, vuelve al estado inicial.

La decisión de cookies se puede reabrir desde **“Preferencias de cookies”** en el footer,
y borrar con el botón “Borrar decisión” del propio banner.

## Qué está simulado

- **Envío del formulario**: no sale ningún correo. La consulta se guarda en
  `localStorage` y se emite un `CustomEvent` `opositia:consulta-guardada` con la consulta
  en `detail`, listo para enganchar un envío real más adelante.
- **Ubicación**: bloque estático con dirección, referencias e imagen del barrio. No hay
  iframe ni mapa interactivo.
- **Legales**: `/aviso-legal`, `/privacidad` y `/terminos` solo llevan encabezado y el
  aviso `[PENDIENTE: TEXTO LEGAL …]`, marcado en el DOM con `data-mock="true"`.
- **Contenido**: cifras, cursos, precios, fechas, docentes, testimonios y datos de
  contacto son ficticios y coherentes entre sí.

## Decisiones tomadas

- **Enrutador**: el proyecto usa TanStack Router en lugar de React Router. Es lo que fija
  la plantilla; el resultado es el mismo (una URL por sección, sin hash).
- **Tokens de color**: Tailwind v4 es CSS-first, así que navy, slate-soft, charcoal y
  amber se definen como variables en `src/styles.css` (en `oklch`) y se exponen como
  `primary`, `background`, `foreground` y `accent`. No hay `tailwind.config.js`.
- **Contraste del ámbar**: sobre fondo ámbar se usa blanco solo en botones (texto grande y
  en negrita); para texto chico se usa `accent-ink`, una variante más oscura del ámbar
  sobre fondo claro.
- **Curso preseleccionado**: “Consultar por este curso” navega a `/contacto?curso=<id>` y
  el `select` del formulario queda preseleccionado.
- **Página activa**: los enlaces del menú llevan subrayado ámbar, peso mayor y
  `aria-current="page"`, en escritorio y en móvil.
