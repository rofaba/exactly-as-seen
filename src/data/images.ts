/**
 * Única fuente de imágenes del sitio. Los archivos viven en `src/assets/`
 * (fotos de Unsplash y un mapa de OpenStreetMap, ambos de licencia libre) y se importan acá; ningún componente
 * referencia una imagen directamente.
 */
import heroAula from "@/assets/heroAula.jpg";
import metodoEstudio from "@/assets/metodoEstudio.jpg";
import biblioteca from "@/assets/biblioteca.jpg";
import simulacro from "@/assets/simulacro.jpg";
import institucional from "@/assets/institucional.jpg";
import mapaCentro from "@/assets/mapaCentro.jpg";
import docente1 from "@/assets/docente1.jpg";
import docente2 from "@/assets/docente2.jpg";
import docente3 from "@/assets/docente3.jpg";
import docente4 from "@/assets/docente4.jpg";
import docente5 from "@/assets/docente5.jpg";
import docente6 from "@/assets/docente6.jpg";

export type SiteImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  heroAula: {
    url: heroAula,
    alt: "Sala de capacitación con una docente frente a una pantalla de proyección y personas adultas sentadas atendiendo",
    width: 1600,
    height: 1067,
  },
  metodoEstudio: {
    url: metodoEstudio,
    alt: "Cuaderno abierto con la palabra “Notes”, pluma estilográfica y anteojos sobre una mesa de madera",
    width: 1200,
    height: 800,
  },
  biblioteca: {
    url: biblioteca,
    alt: "Pasillo de biblioteca con estantes llenos de libros y lámparas colgantes encendidas",
    width: 1200,
    height: 800,
  },
  simulacro: {
    url: simulacro,
    alt: "Persona escribiendo con birome sobre hojas de examen en una mesa, con una taza al fondo",
    width: 1200,
    height: 800,
  },
  institucional: {
    url: institucional,
    alt: "Grupo de jóvenes sonriendo alrededor de notebooks frente a una biblioteca",
    width: 1200,
    height: 800,
  },
  mapaCentro: {
    url: mapaCentro,
    alt: "Mapa de Ciudad Vieja y Centro de Montevideo con un marcador en Ituzaingó, junto a la Plaza Matriz",
    width: 720,
    height: 480,
  },
  docente1: {
    url: docente1,
    alt: "Retrato de una docente de cabello oscuro sobre fondo neutro",
    width: 600,
    height: 600,
  },
  docente2: {
    url: docente2,
    alt: "Retrato de un docente sonriente con camiseta blanca sobre fondo gris",
    width: 600,
    height: 600,
  },
  docente3: {
    url: docente3,
    alt: "Retrato de una docente sonriente sobre fondo claro",
    width: 600,
    height: 600,
  },
  docente4: {
    url: docente4,
    alt: "Retrato de un docente de cabello canoso con anteojos y polo verde sobre fondo gris",
    width: 600,
    height: 600,
  },
  docente5: {
    url: docente5,
    alt: "Retrato de una docente de pelo recogido sobre fondo gris",
    width: 600,
    height: 600,
  },
  docente6: {
    url: docente6,
    alt: "Retrato de un docente joven de traje oscuro y corbata con los brazos cruzados",
    width: 600,
    height: 600,
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
