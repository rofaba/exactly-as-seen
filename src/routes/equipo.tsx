import { createFileRoute, Link } from "@tanstack/react-router";

import { Img } from "@/components/Img";
import { images } from "@/data/images";
import { teachers, teacherImage } from "@/data/teachers";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/equipo")({
  head: () =>
    seo({
      titulo: "Quiénes somos — Academia Opositia",
      descripcion:
        "Reseña institucional, valores y plantel docente de Academia Opositia, academia de preparación para concursos públicos en Montevideo.",
      path: "/equipo",
    }),
  component: Equipo,
});

const valores = [
  {
    titulo: "Decimos lo que el curso da y lo que no",
    detalle:
      "Ningún curso garantiza un ingreso. Lo que garantizamos es preparación, práctica cronometrada y una devolución honesta sobre dónde estás parado.",
  },
  {
    titulo: "Grupos chicos, corrección individual",
    detalle:
      "Cerramos la inscripción cuando el grupo llega al tope. Si no podemos corregir cada escrito uno por uno, no abrimos otra clase.",
  },
  {
    titulo: "El material se actualiza con cada llamado",
    detalle:
      "Cuando cambian las bases o el formato de una prueba, rehacemos los módulos y los simulacros antes de volver a dictarlos.",
  },
  {
    titulo: "Acompañamiento hasta la última etapa",
    detalle:
      "La escrita es el inicio. Seguimos con la carpeta de méritos y el ensayo de entrevista, que es donde muchos quedan a mitad de camino.",
  },
];

function Equipo() {
  return (
    <main id="contenido">
      <section className="container-page py-12 md:py-16">
        <p className="eyebrow">Institucional</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">
          Una academia chica, con docentes que corrigen
        </h1>
        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Opositia abrió en 2017 en Ciudad Vieja, con un solo curso de preparación
              general y dos docentes. La idea salió de una constatación simple: mucha gente
              rendía concursos sin haber escrito nunca una respuesta de desarrollo con
              tiempo contado, y perdía puntos por la forma antes que por el contenido.
            </p>
            <p>
              Hoy somos seis docentes y sostenemos 120 personas en cursada por año, entre
              grupos presenciales en Montevideo y grupos online con gente del interior. No
              crecimos en cantidad de alumnos por clase: crecimos en cantidad de
              simulacros y en material propio.
            </p>
            <p>
              Trabajamos siempre con la misma secuencia: diagnóstico, práctica corregida y
              preparación de méritos y entrevista. Cada docente arma su módulo, corrige lo
              de su área y atiende consultas por fuera del horario de clase.
            </p>
          </div>
          <div className="overflow-hidden rounded border border-border">
            <Img
              image={images.institucional}
              className="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="valores" className="border-y border-border bg-surface">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2 id="valores" className="mt-3 text-2xl font-extrabold md:text-3xl">
            Nuestros valores
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {valores.map((valor) => (
              <li key={valor.titulo} className="border-l-2 border-accent pl-5">
                <h3 className="text-base font-bold">{valor.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{valor.detalle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="plantel" className="container-page py-14 md:py-20">
        <p className="eyebrow">Plantel docente</p>
        <h2 id="plantel" className="mt-3 text-2xl font-extrabold md:text-3xl">
          Quiénes dan las clases
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Todos dictan, corrigen y atienden consultas. Ninguno integra tribunales ni
          representa a los organismos que aparecen mencionados en los cursos.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((docente) => (
            <li key={docente.nombre} className="card-flat overflow-hidden">
              <Img
                image={teacherImage(docente)}
                className="aspect-[4/3] w-full object-cover"
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              />
              <div className="p-5">
                <h3 className="text-base font-bold">{docente.nombre}</h3>
                <p className="text-sm text-accent-ink">{docente.cargo}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Especialidad</dt>
                    <dd>{docente.especialidad}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Formación</dt>
                    <dd>{docente.formacion}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Docencia</dt>
                    <dd>{docente.anios} años</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-muted-foreground">
                  {docente.trayectoria}
                </p>
                <p className="mt-3 text-sm italic text-primary">{docente.enfoque}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-muted-foreground">
          Docentes y trayectorias son ficticios, creados para esta demostración.
        </p>

        <div className="mt-10">
          <Link to="/contacto" className="btn-base btn-accent">
            Consultá por un curso
          </Link>
        </div>
      </section>
    </main>
  );
}
