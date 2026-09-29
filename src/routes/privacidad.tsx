import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    seo({
      titulo: "Política de privacidad — Academia Opositia",
      descripcion:
        "Política de privacidad de Academia Opositia: tratamiento de los datos que se envían por el formulario de contacto. Texto pendiente de redacción.",
      path: "/privacidad",
    }),
  component: () => (
    <LegalPage
      titulo="Política de privacidad"
      bajada="Qué datos recogemos por el formulario de contacto, con qué finalidad y por cuánto tiempo."
    />
  ),
});
