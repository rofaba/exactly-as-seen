import { createFileRoute, Link } from "@tanstack/react-router";

import { Img } from "@/components/Img";
import { courses } from "@/data/courses";
import { images } from "@/data/images";
import { testimonials } from "@/data/testimonials";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      titulo: "Academia Opositia — Preparación para concursos públicos en Montevideo",
      descripcion:
        "Academia en Montevideo que prepara para concursos públicos: cursos presenciales, online y mixtos, simulacros cronometrados y corrección individual.",
      path: "/",
    }),
  component: Inicio,
});

const cifras = [
  { valor: "120", detalle: "alumnos activos en cursada" },
  { valor: "9 años", detalle: "de trayectoria en Montevideo" },
  { valor: "6", detalle: "docentes con corrección individual" },
  { valor: "12 a 22", detalle: "personas por grupo" },
];

const atajos = [
  {
    titulo: "Llamados de BPS y BROU",
    detalle: "Pruebas escritas con parte cuantitativa y normativa introductoria.",
    cursoId: "bps-brou",
  },
  {
    titulo: "Intendencias",
    detalle: "Montevideo y el interior: régimen municipal y casos prácticos.",
    cursoId: "intendencias",
  },
  {
    titulo: "Cancillería",
    detalle: "Ingreso a la carrera diplomática: escrito, oral e idiomas.",
    cursoId: "diplomatica",
  },
  {
    titulo: "Primer concurso",
    detalle: "Base general para quien todavía no eligió a qué llamado presentarse.",
    cursoId: "general",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Diagnóstico inicial",
    detalle:
      "Una prueba corta de lectura, redacción y cálculo para saber desde dónde arrancás y qué módulos priorizar.",
  },
  {
    numero: "02",
    titulo: "Simulacros con corrección individual",
    detalle:
      "Exámenes cronometrados con el formato del llamado y una devolución escrita por persona, no una devolución general al grupo.",
  },
  {
    numero: "03",
    titulo: "Méritos y entrevista",
    detalle:
      "Armado de la carpeta de antecedentes según el esquema de valoración del llamado y ensayo de entrevista con tribunal, grabado.",
  },
];

function Inicio() {
  return (
    <main id="contenido">
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-10 py-12 md:grid-cols-2 md:items-center md:gap-14 md:py-20">
          <div>
            <p className="eyebrow">Montevideo · Uruguay</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Prepará tu ingreso al Estado con método y con seguimiento
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Cursos para los llamados de organismos públicos e intendencias, con
              simulacros cronometrados y corrección individual. Grupos chicos, docentes
              que conocen el formato de las pruebas y acompañamiento hasta la entrevista.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cursos" className="btn-base btn-accent">
                Ver cursos
              </Link>
              <Link to="/contacto" className="btn-base btn-outline">
                Consultá sin compromiso
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded border border-border">
            <Img
              image={images.heroAula}
              priority
              className="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="cifras" className="border-b border-border">
        <div className="container-page py-10">
          <h2 id="cifras" className="sr-only">
            Cifras de la academia
          </h2>
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {cifras.map((cifra) => (
              <div key={cifra.detalle} className="border-l-2 border-accent pl-4">
                <dt className="text-2xl font-extrabold text-primary md:text-3xl">
                  {cifra.valor}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{cifra.detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="atajos" className="container-page py-14 md:py-20">
        <p className="eyebrow">Convocatorias destacadas</p>
        <h2 id="atajos" className="mt-3 text-2xl font-extrabold md:text-3xl">
          Los llamados que más preparamos
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Accesos directos por tipo de llamado para llegar rápido al curso que
          corresponde. Son orientativos: no reemplazan las bases de ninguna convocatoria.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {atajos.map((atajo) => (
            <li key={atajo.titulo} className="card-flat p-5">
              <h3 className="text-base font-bold">{atajo.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{atajo.detalle}</p>
              <Link
                to="/cursos"
                search={{ curso: atajo.cursoId }}
                className="mt-4 inline-block text-sm font-semibold text-accent-ink underline underline-offset-4"
              >
                Ver el curso
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="como-funciona"
        className="border-y border-border bg-surface"
      >
        <div className="container-page grid gap-10 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:py-20">
          <div>
            <p className="eyebrow">Para entender el proceso</p>
            <h2 id="como-funciona" className="mt-3 text-2xl font-extrabold md:text-3xl">
              Cómo funciona un concurso público en Uruguay
            </h2>
            <p className="mt-4 text-muted-foreground">
              Los llamados de la Administración Central y de organismos como BPS, BROU,
              UTE, ANTEL y OSE se publican a través del portal oficial{" "}
              <strong className="text-primary">Uruguay Concursa</strong>, de la Oficina
              Nacional del Servicio Civil (ONSC). Ahí aparecen las bases, los plazos de
              inscripción y los resultados de cada etapa. Las intendencias suelen publicar
              además en su propio sitio, como hace la de Montevideo.
            </p>
            <p className="mt-4 text-muted-foreground">
              Las etapas más comunes son la prueba de conocimientos, los méritos y
              antecedentes, la evaluación psicolaboral y la entrevista con el tribunal;
              cada llamado elige cuáles usa, y algunos suman un sorteo previo entre los
              inscriptos. Como ejemplo, así reparte los puntos el Decreto 440/022 en los
              concursos de oposición y méritos de la Administración Central:
            </p>
            <dl className="mt-6 divide-y divide-border rule-top">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
                <dt className="font-mono text-sm font-bold text-accent-ink">50 pts</dt>
                <dd className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Prueba de conocimientos.</span>{" "}
                  Es eliminatoria: hay que superar el 60 % del puntaje para pasar a las
                  demás etapas.
                </dd>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
                <dt className="font-mono text-sm font-bold text-accent-ink">20 pts</dt>
                <dd className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">
                    Méritos y antecedentes.
                  </span>{" "}
                  Formación, experiencia y certificaciones, según el esquema de
                  valoración del llamado.
                </dd>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
                <dt className="font-mono text-sm font-bold text-accent-ink">15 pts</dt>
                <dd className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Evaluación psicolaboral.</span>{" "}
                  Explora las competencias de cada postulante en relación con el perfil
                  del puesto.
                </dd>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
                <dt className="font-mono text-sm font-bold text-accent-ink">15 pts</dt>
                <dd className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Entrevista.</span> Instancia
                  con tribunal, donde se valora el perfil para el puesto.
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              Para aprobar hay que sumar como mínimo 70 puntos. Otros organismos usan otros
              repartos: en el llamado del BPS para auxiliares administrativos de 2026 hubo
              prueba de conocimientos y evaluación psicolaboral, sin méritos ni entrevista.
              Cada llamado fija sus propias bases: los puntajes, los mínimos y las etapas
              pueden variar. Hay que leerlas siempre antes de inscribirse.
            </p>
          </div>
          <div className="overflow-hidden rounded border border-border">
            <Img
              image={images.simulacro}
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="metodo" className="container-page py-14 md:py-20">
        <p className="eyebrow">Nuestro método</p>
        <h2 id="metodo" className="mt-3 text-2xl font-extrabold md:text-3xl">
          Tres pasos, siempre en el mismo orden
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {pasos.map((paso) => (
            <li key={paso.numero} className="card-flat p-6">
              <p className="font-mono text-sm font-bold text-accent-ink">{paso.numero}</p>
              <h3 className="mt-3 text-lg font-bold">{paso.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{paso.detalle}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded border border-border">
            <Img
              image={images.metodoEstudio}
              className="aspect-[3/2] w-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-bold">Qué incluye cada cursada</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="border-l-2 border-border pl-4">
                Material propio por módulo, en PDF y en papel para los grupos
                presenciales.
              </li>
              <li className="border-l-2 border-border pl-4">
                Simulacros con el formato y el tiempo real de la prueba del llamado.
              </li>
              <li className="border-l-2 border-border pl-4">
                Devolución escrita e individual de cada simulacro, con puntaje estimado.
              </li>
              <li className="border-l-2 border-border pl-4">
                Consultas por fuera de clase con el docente del módulo.
              </li>
            </ul>
            <p className="mt-6 text-sm">
              <Link
                to="/cursos"
                className="font-semibold text-accent-ink underline underline-offset-4"
              >
                Ver los {courses.length} cursos disponibles
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="testimonios"
        className="border-y border-border bg-surface"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Exalumnos</p>
          <h2 id="testimonios" className="mt-3 text-2xl font-extrabold md:text-3xl">
            Qué dicen quienes ya rindieron
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonio) => (
              <li key={testimonio.nombre} className="card-flat p-6">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  {testimonio.texto}
                </blockquote>
                <p className="mt-4 text-sm font-bold text-primary">
                  {testimonio.nombre}
                </p>
                <p className="text-xs text-muted-foreground">{testimonio.contexto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Testimonios ficticios, creados para esta demostración.
          </p>
        </div>
      </section>

      <section aria-labelledby="cta-final" className="container-page py-14 md:py-20">
        <div className="grid gap-6 rounded border border-border bg-primary p-8 text-primary-foreground md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-12">
          <div>
            <h2
              id="cta-final"
              className="text-2xl font-extrabold text-primary-foreground md:text-3xl"
            >
              ¿No sabés por qué curso empezar?
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/85">
              Escribinos y te orientamos según el llamado que te interesa y el tiempo que
              tenés disponible por semana.
            </p>
          </div>
          <Link to="/contacto" className="btn-base btn-accent justify-self-start">
            Consultá sin compromiso
          </Link>
        </div>
      </section>
    </main>
  );
}
