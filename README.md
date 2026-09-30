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

Sin bun también funciona con npm (verificado con Node 22 y npm 10):

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
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
| `src/routes/contacto.tsx` | Formulario guiado, contacto rápido, atención comercial, ubicación y datos guardados (`/contacto`) |
| `src/routes/aviso-legal.tsx`, `privacidad.tsx`, `terminos.tsx` | Páginas legales con el aviso de texto pendiente |
| `src/components/` | `Header`, `Footer`, `CookieBanner`, `Img`, `LegalPage` |
| `src/data/courses.ts` | Los 6 cursos con temario, horarios, inicio y precio |
| `src/data/teachers.ts` | Los 6 docentes ficticios |
| `src/data/testimonials.ts` | Los 3 testimonios ficticios |
| `src/data/sampleConsultas.ts` | Las 3 consultas de ejemplo precargadas |
| `src/data/sampleLlamadas.ts` | Los 2 pedidos de llamada de ejemplo precargados |
| `src/data/contacto.ts` | Datos de contacto y referencias de cómo llegar |
| `src/data/images.ts` | **Única** fuente de imágenes (clave → archivo de `src/assets/`, alt, ancho, alto) |
| `src/assets/` | Las 11 fotos del sitio (hero, aulas, biblioteca, 6 retratos docentes) y el mapa estático de Ciudad Vieja/Centro, ~1 MB en total |
| `src/lib/storage.ts` | **Única** capa que toca `localStorage` (valida la forma de lo que lee y limita a 100 registros por clave) |
| `src/lib/validacion.ts` | Reglas y limpieza de los campos de los formularios |
| `src/lib/seo.ts` | `title`, meta description, canonical, Open Graph y JSON-LD |

### Imágenes

Las fotos son de **Unsplash** (licencia libre, sin atribución obligatoria) y el mapa de
ubicación es una imagen estática generada a partir de teselas de **OpenStreetMap** (datos
abiertos ODbL, con la atribución visible en la imagen y en el pie del bloque). Todo está
incluido en el repositorio, en `src/assets/`: el sitio no hace ningún pedido externo para
mostrarlas. Ningún componente referencia una imagen directamente: todo pasa por
`src/data/images.ts` y por el componente `Img`. Para cambiar una foto, se reemplaza el
archivo (o su import) en ese único archivo. Los retratos docentes son fotos de muestra de
personas anónimas, no representan a personas reales de una academia.

## Claves de `localStorage`

| Clave | Forma | Para qué |
| --- | --- | --- |
| `opositia.consultas` | `Array<{ id, fecha, nombre, email, telefono, cursoId, cursoNombre, mensaje, etapa?, horas?, terminosAceptados? }>` | Consultas enviadas por el formulario. `id` con formato `OPO-0001`; `etapa` y `horas` son las respuestas opcionales de la consulta guiada |
| `opositia.llamadas` | `Array<{ id, fecha, telefono, terminosAceptados? }>` | Pedidos del contacto rápido. `id` con formato `LLA-0001` |
| `opositia.cookies` | `{ estado: "accepted" \| "rejected", fecha: string }` | Decisión del banner de cookies |
| `opositia.probe` | `"1"` | Clave temporal: se escribe y se borra al instante para comprobar si el navegador permite usar `localStorage`. No queda guardada |

Todo acceso pasa por `src/lib/storage.ts`, con `try/catch`. Si el navegador bloquea el
almacenamiento, la página de contacto muestra un aviso visible y sigue funcionando.

## Datos de ejemplo y cómo reiniciarlos

La primera vez que se abre `/contacto` se precargan 3 consultas de ejemplo
(`OPO-0001` a `OPO-0003`) y 2 pedidos de llamada (`LLA-0001` y `LLA-0002`). El botón
**“Reiniciar datos de ejemplo”**, en el panel “Consultas guardadas en este navegador”,
vuelve ambos al estado inicial. Ese panel es solo de demostración, para poder
comprobar el guardado sin abrir las herramientas del navegador: hay que retirarlo al
integrar el backend real.

La decisión de cookies se puede reabrir desde **“Preferencias de cookies”** en el footer,
y borrar con el botón “Borrar decisión” del propio banner.

## Qué está simulado

- **Envío del formulario**: no sale ningún correo. La consulta se guarda en
  `localStorage` y se emite un `CustomEvent` `opositia:consulta-guardada` con la consulta
  en `detail`, listo para enganchar un envío real más adelante.
- **Contacto rápido**: “Quiero que me llamen” no hace ninguna llamada. Guarda el
  teléfono en `localStorage` y emite un `CustomEvent` `opositia:llamada-solicitada` con el
  pedido en `detail`, listo para conectar un servicio real más adelante.
- **Ubicación**: bloque estático con dirección, referencias y un mapa en imagen de Ciudad
  Vieja y Centro con el marcador. No hay iframe ni mapa interactivo.
- **Legales**: `/aviso-legal`, `/privacidad` y `/terminos` solo llevan encabezado y el
  aviso `[PENDIENTE: TEXTO LEGAL …]`, marcado en el DOM con `data-mock="true"`.
- **Contenido**: cifras, cursos, precios, fechas, docentes, testimonios y datos de
  contacto son ficticios y coherentes entre sí.

## Notas de seguridad para el despliegue

Este sitio es una demo sin backend. Lo siguiente queda para quien lo integre:

- **Cabeceras HTTP**: el build solo emite `cache-control`. En el hosting de producción hay
  que configurar `Content-Security-Policy` (el hidratado y el JSON-LD usan scripts en
  línea, así que hace falta `'unsafe-inline'` o un `nonce`), `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy` y `frame-ancestors`. No aplicar
  `frame-ancestors` en la vista previa de Lovable, que carga el sitio en un iframe.
- **Claves y secretos**: `.env*` y los archivos de claves están en el `.gitignore`. Las
  claves del servicio de correo van solo en variables de entorno del servidor, nunca con
  prefijo `VITE_`, porque quedarían en el código que descarga el navegador.
- **Validación**: la de `src/lib/validacion.ts` es solo de cliente. El backend tiene que
  volver a validar y limitar todo antes de enviar correos, y no guardar datos personales
  en el navegador.
- **Panel de demostración y telemetría**: retirar el panel de consultas guardadas de
  Contacto y `src/lib/lovable-error-reporting.ts` (ganchos que solo funcionan dentro del
  editor de Lovable).
- **Código de plantilla**: `src/components/ui/` y la mayoría de las dependencias de
  `package.json` no se usan; conviene eliminarlas para reducir la cadena de suministro.
  Instalar siempre con el lockfile (`bun install --frozen-lockfile`).
- **JSON-LD**: `src/routes/__root.tsx` escapa `<` al inyectarlo; mantener ese escape si
  los datos pasan a venir de una base de datos.

## Decisiones tomadas

- **Enrutador**: el proyecto usa TanStack Router en lugar de React Router. Es lo que fija
  la plantilla; el resultado es el mismo (una URL por sección, sin hash).
- **Tokens de color**: Tailwind v4 es CSS-first, así que navy, slate-soft, charcoal y
  amber se definen como variables en `src/styles.css` (los cuatro colores del briefing, en hexadecimal exacto) y se exponen como
  `primary`, `background`, `foreground` y `accent`. No hay `tailwind.config.js`.
- **Contraste del ámbar**: sobre fondo ámbar se usa blanco solo en botones (texto grande y
  en negrita); para texto chico se usa `accent-ink`, una variante más oscura del ámbar
  sobre fondo claro.
- **Curso preseleccionado**: “Consultar por este curso” navega a `/contacto?curso=<id>` y
  el `select` del formulario queda preseleccionado.
- **Página activa**: los enlaces del menú llevan subrayado ámbar, peso mayor y
  `aria-current="page"`, en escritorio y en móvil.
- **Enlaces legales del formulario**: “términos” y “política de privacidad” abren en otra
  pestaña para no perder lo escrito. Las tres páginas legales tienen un botón “Volver”
  (vuelve a la página anterior del sitio; si se abrieron directamente, lleva a Contacto).
- **Ubicación**: el bloque de “Cómo llegar” usa un mapa estático de Ciudad Vieja y Centro
  (OpenStreetMap, con atribución). La dirección es de ejemplo, sobre una calle real
  (Ituzaingó 1488) y el marcador es ilustrativo, no identifica un edificio concreto.
- **Consulta guiada**: además de los datos de contacto, el formulario hace dos preguntas
  opcionales (etapa en la que está la persona y horas de estudio por semana) para que la
  respuesta se pueda orientar, tal como promete el cierre de Inicio.
- **Convocatorias destacadas**: los accesos directos de Inicio son por tipo de llamado y
  no reproducen convocatorias reales con fechas, para no dar información que pueda
  quedar desactualizada.
- **Validación de los formularios** (`src/lib/validacion.ts`): el nombre exige nombre y apellido
  con letras (2 a 80 caracteres, sin números ni símbolos); el correo, un formato real (sin
  puntos seguidos ni guiones al borde del dominio, hasta 120 caracteres); el mensaje, al
  menos 2 palabras y 10 letras (hasta 1000 caracteres). Antes de guardar se quitan los
  caracteres invisibles y se colapsan los espacios. Un envío repetido en menos de 1,5 s se
  ignora. Cada registro guarda `terminosAceptados: true`. Es validación de cliente: el
  backend tiene que volver a validar todo antes de enviar correos.
- **Formato del teléfono**: en los dos formularios se acepta un `+` opcional al inicio
  (código de país) y el resto solo dígitos, sin espacios, puntos ni guiones, entre 8 y 12
  dígitos. El campo muestra un ejemplo (`099555123 o +59899555123`) y una línea de ayuda.
- **Retratos docentes**: se muestran en formato cuadrado y anclados arriba, porque en
  formato apaisado se cortaba la cabeza de algunas fotos.
- **Contenido sobre concursos**: se contrastó con fuentes oficiales. El reparto de puntos
  que se muestra en Inicio es el del Decreto 440/022 (Administración Central: prueba de
  conocimientos 50, méritos 20, evaluación psicolaboral 15, entrevista 15, mínimo 70) y se
  presenta como ejemplo, no como regla general: BPS, BROU y otros organismos usan otros
  repartos. La carrera diplomática exige título universitario de grado (mínimo cuatro
  años).
- **Fechas y precios de los cursos**: son ficticios pero coherentes: cada inicio cae en un
  día en que ese curso se dicta.
