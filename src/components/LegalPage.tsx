import { useRouter } from "@tanstack/react-router";

export function LegalPage({ titulo, bajada }: { titulo: string; bajada: string }) {
  const router = useRouter();
  const volver = () => {
    const hayPaginaAnterior = (router.history.location.state.__TSR_index ?? 0) > 0;
    if (hayPaginaAnterior) router.history.back();
    else router.navigate({ to: "/contacto" });
  };

  return (
    <main id="contenido" className="container-page py-14 md:py-20">
      <button
        type="button"
        onClick={volver}
        className="mb-8 text-sm font-semibold text-accent-ink underline underline-offset-4"
      >
        ← Volver
      </button>
      <p className="eyebrow">Información legal</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">{titulo}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{bajada}</p>

      <div
        data-mock="true"
        className="card-flat mt-10 max-w-2xl border-l-4 border-l-accent p-6"
      >
        <p className="eyebrow">Contenido pendiente</p>
        <p className="mt-2 font-mono text-sm text-primary">
          [PENDIENTE: TEXTO LEGAL — lo redacta Kodarvia antes del lanzamiento]
        </p>
      </div>
    </main>
  );
}
