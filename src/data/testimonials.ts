export type Testimonial = {
  nombre: string;
  contexto: string;
  texto: string;
};

export const testimonials: Testimonial[] = [
  {
    nombre: "Andrea R.",
    contexto: "Ingresó a un organismo de seguridad social",
    texto:
      "Venía de rendir dos llamados sin preparación y me quedaba corta de tiempo en la escrita. Los simulacros cronometrados me ordenaron: llegué al examen sabiendo cuánto podía demorar en cada parte.",
  },
  {
    nombre: "Sebastián L.",
    contexto: "Concurso en una intendencia del interior",
    texto:
      "Lo que más me sirvió fue la corrección individual. No era una devolución general para todo el grupo, era sobre lo que yo había escrito, con la grilla del llamado al lado.",
  },
  {
    nombre: "Natalia P.",
    contexto: "Llamado administrativo en un ente público",
    texto:
      "Hice el curso corto de méritos y entrevista. Tenía los certificados desordenados y sin foliar; salí con la carpeta armada y con dos entrevistas de práctica grabadas.",
  },
];
