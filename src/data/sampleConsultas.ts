import type { Consulta } from "@/lib/storage";

/** Consultas de ejemplo precargadas para la demo. */
export const sampleConsultas: Consulta[] = [
  {
    id: "OPO-0001",
    fecha: "2026-09-12T13:24:00.000Z",
    nombre: "Paula Giménez",
    email: "paula.gimenez@example.com",
    telefono: "099 412 785",
    cursoId: "bps-brou",
    cursoNombre: "Concursos BPS y BROU: prueba escrita",
    etapa: "Voy a rendir mi primer concurso",
    horas: "Entre 4 y 8 horas por semana",
    mensaje:
      "Buenas. Quiero rendir el próximo llamado del BPS y hace años que no estudio matemática. ¿El curso arranca desde cero?",
  },
  {
    id: "OPO-0002",
    fecha: "2026-09-18T20:05:00.000Z",
    nombre: "Rodrigo Silveira",
    email: "rsilveira@example.com",
    telefono: "",
    cursoId: "meritos",
    cursoNombre: "Currículum, méritos y entrevista",
    etapa: "Aprobé la prueba escrita y sigo con méritos y entrevista",
    horas: "Menos de 4 horas por semana",
    mensaje:
      "Aprobé la prueba escrita de un llamado y tengo que presentar méritos en tres semanas. ¿Llego con el curso corto?",
  },
  {
    id: "OPO-0003",
    fecha: "2026-09-24T09:47:00.000Z",
    nombre: "Mariana Castro",
    email: "mariana.castro@example.com",
    telefono: "091 330 204",
    cursoId: "",
    cursoNombre: "Todavía no sé",
    etapa: "Todavía no elegí un llamado",
    horas: "Entre 4 y 8 horas por semana",
    mensaje:
      "Vivo en Las Piedras y me queda difícil viajar de noche. ¿Tienen algo online que sirva como base general?",
  },
];
