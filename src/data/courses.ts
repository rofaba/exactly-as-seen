export type Modalidad = "Presencial" | "Online" | "Mixta";

export type Course = {
  id: string;
  nombre: string;
  resumen: string;
  dirigidoA: string;
  temario: string[];
  semanas: number;
  cargaSemanal: string;
  modalidad: Modalidad;
  dias: string;
  franja: string;
  grupo: string;
  proximoInicio: string;
  precio: string;
};

export const courses: Course[] = [
  {
    id: "general",
    nombre: "Preparación general para concursos públicos",
    resumen:
      "Base transversal para rendir cualquier llamado: lectura, redacción, razonamiento y nociones de administración pública.",
    dirigidoA:
      "Personas que van a rendir su primer concurso o que quieren una base sólida antes de elegir un llamado concreto.",
    temario: [
      "Comprensión lectora aplicada a bases y textos normativos",
      "Redacción clara: informes breves y respuestas de desarrollo",
      "Razonamiento lógico-matemático con ejercicios tipo prueba",
      "Nociones de Constitución y organización del Estado uruguayo",
      "Administración pública: estatuto del funcionario y procedimiento",
      "Técnica de examen escrito y administración del tiempo",
    ],
    semanas: 14,
    cargaSemanal: "4 horas de clase + 2 de práctica guiada",
    modalidad: "Mixta",
    dias: "Martes y jueves",
    franja: "19:00 a 21:00",
    grupo: "Hasta 18 personas",
    proximoInicio: "13 de octubre de 2026",
    precio: "$U 5.900 por mes",
  },
  {
    id: "bps-brou",
    nombre: "Concursos BPS y BROU: prueba escrita",
    resumen:
      "Entrenamiento específico para las pruebas escritas de los llamados del BPS y del BROU, con simulacros cronometrados.",
    dirigidoA:
      "Aspirantes a llamados administrativos y de atención al público del BPS y del BROU.",
    temario: [
      "Matemática financiera básica: interés, descuentos y cuotas",
      "Razonamiento cuantitativo y lectura de tablas y gráficos",
      "Nociones introductorias de seguridad social uruguaya",
      "Sistema financiero uruguayo: actores y funciones a nivel introductorio",
      "Resolución de consignas tipo múltiple opción",
      "Cuatro simulacros cronometrados con corrección individual",
    ],
    semanas: 10,
    cargaSemanal: "4 horas de clase + 1 simulacro cada quince días",
    modalidad: "Presencial",
    dias: "Lunes y miércoles",
    franja: "18:30 a 20:30",
    grupo: "Hasta 16 personas",
    proximoInicio: "3 de noviembre de 2026",
    precio: "$U 6.400 por mes",
  },
  {
    id: "intendencias",
    nombre: "Intendencias departamentales",
    resumen:
      "Preparación orientada a llamados municipales, con casos prácticos de Montevideo y del interior del país.",
    dirigidoA:
      "Personas interesadas en llamados de intendencias y municipios, con o sin experiencia previa en el Estado.",
    temario: [
      "Organización departamental y municipal en Uruguay",
      "Congreso de Intendentes: rol y competencias",
      "Régimen del funcionario municipal y carrera administrativa",
      "Presupuesto departamental y tasas: nociones generales",
      "Casos prácticos de llamados de Montevideo y del interior",
      "Simulacros de prueba escrita con devolución por escrito",
    ],
    semanas: 12,
    cargaSemanal: "4 horas de clase",
    modalidad: "Online",
    dias: "Martes y viernes",
    franja: "20:00 a 22:00",
    grupo: "Hasta 22 personas",
    proximoInicio: "17 de noviembre de 2026",
    precio: "$U 5.400 por mes",
  },
  {
    id: "diplomatica",
    nombre: "Ingreso a la Carrera Diplomática",
    resumen:
      "Programa extenso y exigente para el concurso de ingreso al servicio exterior, con pruebas escritas y orales.",
    dirigidoA:
      "Egresados y estudiantes avanzados de grado que aspiran al concurso de ingreso a la carrera diplomática.",
    temario: [
      "Historia uruguaya y contemporánea de las relaciones internacionales",
      "Derecho internacional público: fuentes, tratados y organismos",
      "Economía internacional y comercio exterior",
      "Política exterior uruguaya y regional",
      "Preparación de la prueba escrita de desarrollo",
      "Entrenamiento oral e idiomas: inglés y francés a nivel de lectura",
    ],
    semanas: 24,
    cargaSemanal: "6 horas de clase + 3 de lectura pautada",
    modalidad: "Mixta",
    dias: "Lunes, miércoles y sábados",
    franja: "18:30 a 21:00 y sábados de 10:00 a 12:00",
    grupo: "Hasta 14 personas",
    proximoInicio: "9 de marzo de 2027",
    precio: "$U 8.900 por mes",
  },
  {
    id: "meritos",
    nombre: "Currículum, méritos y entrevista",
    resumen:
      "Curso corto para ordenar la carpeta de méritos y llegar preparado a la entrevista con el tribunal.",
    dirigidoA:
      "Quienes ya aprobaron o están rindiendo la prueba escrita y tienen que presentar méritos y entrevista.",
    temario: [
      "Lectura de la grilla de valoración de méritos del llamado",
      "Cómo documentar formación, experiencia y certificaciones",
      "Armado del currículum en el formato que piden las bases",
      "Simulacro de entrevista con tribunal, grabado",
      "Devolución individual sobre discurso, postura y respuestas",
    ],
    semanas: 3,
    cargaSemanal: "3 horas de clase + una entrevista individual",
    modalidad: "Online",
    dias: "Miércoles",
    franja: "19:00 a 22:00",
    grupo: "Hasta 12 personas",
    proximoInicio: "21 de octubre de 2026",
    precio: "$U 4.200 (pago único)",
  },
  {
    id: "razonamiento",
    nombre: "Razonamiento lógico-matemático intensivo",
    resumen:
      "Curso corto de sábados para la parte cuantitativa, la que más puntos deja en el camino.",
    dirigidoA:
      "Personas que rinden cualquier llamado y necesitan reforzar cálculo y lógica en poco tiempo.",
    temario: [
      "Series numéricas y de figuras",
      "Porcentajes, proporcionalidad y regla de tres",
      "Lógica proposicional y verdad de enunciados",
      "Interpretación de gráficos y tablas",
      "Problemas de tiempo, trabajo y mezcla",
      "Dos simulacros cronometrados de la sección cuantitativa",
    ],
    semanas: 5,
    cargaSemanal: "3 horas de clase los sábados",
    modalidad: "Presencial",
    dias: "Sábados",
    franja: "9:30 a 12:30",
    grupo: "Hasta 20 personas",
    proximoInicio: "7 de febrero de 2027",
    precio: "$U 4.800 (pago único)",
  },
];

export const modalidades: Array<"Todos" | Modalidad> = [
  "Todos",
  "Presencial",
  "Online",
  "Mixta",
];

export const getCourse = (id: string | undefined) =>
  courses.find((course) => course.id === id);
