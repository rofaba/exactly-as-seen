/**
 * Única fuente de URLs de imágenes del sitio.
 * Para migrar a archivos locales, reemplazar cada `url` por un import
 * desde `src/assets/` sin tocar ningún componente.
 */

export type SiteImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  heroAula: {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=70",
    alt: "Aula luminosa con personas adultas estudiando en mesas largas",
    width: 1600,
    height: 1067,
  },
  metodoEstudio: {
    url: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=70",
    alt: "Escritorio de estudio con cuaderno, apuntes y lápiz",
    width: 1200,
    height: 800,
  },
  biblioteca: {
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=70",
    alt: "Estantes de biblioteca con libros ordenados y luz cálida",
    width: 1200,
    height: 800,
  },
  simulacro: {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=70",
    alt: "Persona resolviendo un examen escrito sobre una mesa de aula",
    width: 1200,
    height: 800,
  },
  institucional: {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70",
    alt: "Grupo reducido de personas trabajando alrededor de una mesa de estudio",
    width: 1200,
    height: 800,
  },
  barrioMontevideo: {
    url: "https://images.unsplash.com/photo-1600792996254-5b4e7eefd6c4?auto=format&fit=crop&w=1200&q=70",
    alt: "Calle peatonal de Ciudad Vieja, Montevideo, con edificios antiguos",
    width: 1200,
    height: 800,
  },
  docente1: {
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=70",
    alt: "Retrato de una docente de cabello oscuro sobre fondo neutro",
    width: 600,
    height: 600,
  },
  docente2: {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70",
    alt: "Retrato de un docente con camisa clara sobre fondo neutro",
    width: 600,
    height: 600,
  },
  docente3: {
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=70",
    alt: "Retrato de una docente sonriente sobre fondo claro",
    width: 600,
    height: 600,
  },
  docente4: {
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=70",
    alt: "Retrato de un docente de barba corta con saco oscuro",
    width: 600,
    height: 600,
  },
  docente5: {
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=70",
    alt: "Retrato de una docente de pelo recogido sobre fondo gris",
    width: 600,
    height: 600,
  },
  docente6: {
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=70",
    alt: "Retrato de un docente joven con camisa de vestir",
    width: 600,
    height: 600,
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
