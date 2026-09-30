import { images, type ImageKey } from "./images";

export type Teacher = {
  nombre: string;
  cargo: string;
  formacion: string;
  anios: number;
  especialidad: string;
  trayectoria: string;
  enfoque: string;
  imagen: ImageKey;
};

export const teachers: Teacher[] = [
  {
    nombre: "Valentina Sosa",
    cargo: "Dirección académica",
    formacion: "Abogada, Facultad de Derecho (Udelar)",
    anios: 14,
    especialidad: "Derecho administrativo y estatuto del funcionario",
    trayectoria:
      "Coordinó programas de preparación para llamados administrativos y diseñó las grillas de corrección que usa la academia.",
    enfoque: "“Antes de estudiar hay que leer las bases. Todo lo demás sale de ahí.”",
    imagen: "docente1",
  },
  {
    nombre: "Martín Cabrera",
    cargo: "Docente de razonamiento cuantitativo",
    formacion: "Contador público, Facultad de Ciencias Económicas y de Administración (Udelar)",
    anios: 11,
    especialidad: "Matemática financiera y lógica aplicada a pruebas escritas",
    trayectoria:
      "Da clases de cálculo y lógica a grupos de adultos que retoman el estudio después de varios años.",
    enfoque: "“No busco que sepas más fórmulas, busco que no pierdas puntos tontos.”",
    imagen: "docente2",
  },
  {
    nombre: "Lucía Methol",
    cargo: "Docente de comprensión lectora y redacción",
    formacion: "Licenciada en Letras, Facultad de Humanidades y Ciencias de la Educación (Udelar)",
    anios: 9,
    especialidad: "Redacción de informes y respuestas de desarrollo",
    trayectoria:
      "Corrige de forma individual cada consigna escrita y sostiene el taller de escritura del curso general.",
    enfoque: "“Escribir claro es una decisión, no un talento.”",
    imagen: "docente3",
  },
  {
    nombre: "Federico Arrieta",
    cargo: "Docente de organización del Estado",
    formacion: "Licenciado en Ciencia Política, Facultad de Ciencias Sociales (Udelar)",
    anios: 12,
    especialidad: "Estructura del Estado, intendencias y gobiernos departamentales",
    trayectoria:
      "Armó el material de casos prácticos municipales que se usa en el curso de intendencias.",
    enfoque: "“Entender cómo funciona el organismo cambia cómo respondés el examen.”",
    imagen: "docente4",
  },
  {
    nombre: "Camila Ferreira",
    cargo: "Docente de méritos y entrevista",
    formacion: "Licenciada en Psicología, Universidad Católica del Uruguay",
    anios: 8,
    especialidad: "Preparación de entrevistas y ordenamiento de antecedentes",
    trayectoria:
      "Conduce los simulacros de entrevista con tribunal y las devoluciones grabadas del curso corto.",
    enfoque: "“La entrevista se prepara igual que una prueba escrita: con ensayo.”",
    imagen: "docente5",
  },
  {
    nombre: "Diego Pintos",
    cargo: "Docente de relaciones internacionales",
    formacion: "Magíster en Estudios Internacionales, Udelar",
    anios: 10,
    especialidad: "Derecho internacional público e historia diplomática",
    trayectoria:
      "Acompaña al grupo de carrera diplomática en lectura pautada y en la preparación de las pruebas orales.",
    enfoque: "“Leer mucho no alcanza: hay que aprender a sostener un argumento.”",
    imagen: "docente6",
  },
];

export const teacherImage = (teacher: Teacher) => images[teacher.imagen];
