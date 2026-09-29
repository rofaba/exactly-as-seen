import { contacto } from "@/data/contacto";

const SITE_URL = "https://opositia.example";
export const SITE_NAME = "Academia Opositia";

type SeoInput = {
  titulo: string;
  descripcion: string;
  path: string;
};

/** Meta + canonical para usar desde el `head()` de cada ruta. */
export const seo = ({ titulo, descripcion, path }: SeoInput) => {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title: titulo },
      { name: "description", content: descripcion },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descripcion },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "es_UY" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: titulo },
      { name: "twitter:description", content: descripcion },
    ],
    links: [{ rel: "canonical", href: url }],
  };
};

export const organizacionJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: SITE_NAME,
  description:
    "Academia de preparación para concursos públicos en Montevideo, Uruguay. Cursos presenciales, online y mixtos con simulacros y corrección individual.",
  url: SITE_URL,
  email: contacto.email,
  telephone: contacto.telefono,
  address: {
    "@type": "PostalAddress",
    streetAddress: contacto.direccion,
    addressLocality: "Montevideo",
    addressRegion: "Montevideo",
    postalCode: contacto.cp,
    addressCountry: "UY",
  },
  areaServed: "Uruguay",
  openingHours: ["Mo-Fr 10:00-20:00", "Sa 09:30-13:00"],
  inLanguage: "es-UY",
};
