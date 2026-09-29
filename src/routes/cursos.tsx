import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { courses, modalidades, type Modalidad } from "@/data/courses";
import { seo } from "@/lib/seo";

type Search = { curso: string | undefined };

export const Route = createFileRoute("/cursos")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    curso: typeof search["curso"] === "string" ? search["curso"] : undefined,
  }),
  head: () =>
    seo({
      titulo: "Cursos para concursos públicos — Academia Opositia",
      descripcion:
        "Seis cursos para concursos públicos en Uruguay: preparación general, BPS y BROU, intendencias, carrera diplomática, méritos y entrevista, y razonamiento intensivo.",
      path: "/cursos",
    }),
  component: Cursos,
});

function Cursos() {
  const { curso } = Route.useSearch();
  const [filtro, setFiltro] = useState<"Todos" | Modalidad>("Todos");
  const [abierto, setAbierto] = useState<string | null>(curso ?? null);

  useEffect(() => {
    if (curso) setAbierto(curso);
  }, [curso]);

  const visibles =
    filtro === "Todos" ? courses : courses.filter((item) => item.modalidad === filtro);

  return (
    <main id="contenido" className="container-page py-12 md:py-16">
      <p className="eyebrow">Catálogo</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">
        Cursos de preparación para concursos públicos
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Cada curso tiene su temario, su carga horaria y su tamaño de grupo. Los precios
        son de referencia para esta demostración y están expresados en pesos uruguayos.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar cursos por modalidad">
        {modalidades.map((modalidad) => {
          const activo = filtro === modalidad;
          return (
            <button
              key={modalidad}
              type="button"
              aria-pressed={activo}
              onClick={() => setFiltro(modalidad)}
              className={`btn-base px-4 py-2 text-sm ${
                activo
                  ? "bg-primary text-primary-foreground"
                  : "border border-border-strong text-primary hover:bg-primary-soft"
              }`}
            >
              {modalidad}
            </button>
          );
        })}
        <p aria-live="polite" className="ml-auto text-sm text-muted-foreground">
          {visibles.length} {visibles.length === 1 ? "curso" : "cursos"}
        </p>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {visibles.map((item) => {
          const expandido = abierto === item.id;
          return (
            <li key={item.id} className="card-flat flex flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-sm bg-primary-soft px-2 py-1 text-xs font-bold text-primary">
                  {item.modalidad}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.semanas} semanas · {item.grupo.toLowerCase()}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-bold">{item.nombre}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.resumen}</p>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Próximo inicio</dt>
                  <dd className="font-semibold text-primary">{item.proximoInicio}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Precio de referencia</dt>
                  <dd className="font-semibold text-primary">{item.precio}</dd>
                </div>
              </dl>

              <button
                type="button"
                aria-expanded={expandido}
                aria-controls={`detalle-${item.id}`}
                onClick={() => setAbierto(expandido ? null : item.id)}
                className="mt-5 self-start text-sm font-semibold text-accent-ink underline underline-offset-4"
              >
                {expandido ? "Ocultar el detalle" : "Ver temario y horarios"}
              </button>

              {expandido ? (
                <div id={`detalle-${item.id}`} className="mt-5 rule-top pt-5">
                  <h3 className="text-sm font-bold">A quién va dirigido</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.dirigidoA}</p>

                  <h3 className="mt-4 text-sm font-bold">Temario por módulos</h3>
                  <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {item.temario.map((modulo, indice) => (
                      <li key={modulo} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                        <span className="font-mono text-xs text-accent-ink">
                          {String(indice + 1).padStart(2, "0")}
                        </span>
                        <span>{modulo}</span>
                      </li>
                    ))}
                  </ol>

                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2">
                      <dt className="text-muted-foreground">Duración</dt>
                      <dd>{item.semanas} semanas</dd>
                    </div>
                    <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2">
                      <dt className="text-muted-foreground">Carga semanal</dt>
                      <dd>{item.cargaSemanal}</dd>
                    </div>
                    <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2">
                      <dt className="text-muted-foreground">Días y horario</dt>
                      <dd>
                        {item.dias} · {item.franja}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2">
                      <dt className="text-muted-foreground">Tamaño de grupo</dt>
                      <dd>{item.grupo}</dd>
                    </div>
                  </dl>

                  <Link
                    to="/contacto"
                    search={{ curso: item.id }}
                    className="btn-base btn-accent mt-6"
                  >
                    Consultar por este curso
                  </Link>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
