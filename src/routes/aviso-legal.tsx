import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () =>
    seo({
      titulo: "Aviso legal — Academia Opositia",
      descripcion:
        "Aviso legal de Academia Opositia, academia de preparación para concursos públicos en Montevideo. Texto pendiente de redacción.",
      path: "/aviso-legal",
    }),
  component: () => (
    <LegalPage
      titulo="Aviso legal"
      bajada="Datos identificativos de la academia y condiciones de uso del sitio."
    />
  ),
});
