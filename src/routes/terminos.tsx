import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terminos")({
  head: () =>
    seo({
      titulo: "Términos y condiciones — Academia Opositia",
      descripcion:
        "Términos y condiciones de inscripción y cursada en Academia Opositia, Montevideo. Texto pendiente de redacción.",
      path: "/terminos",
    }),
  component: () => (
    <LegalPage
      titulo="Términos y condiciones"
      bajada="Condiciones de inscripción, pagos, bajas y funcionamiento de los cursos."
    />
  ),
});
