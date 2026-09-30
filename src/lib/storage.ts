/**
 * Única capa que toca localStorage. Todo el resto de la app pasa por acá.
 * Claves: `opositia.consultas`, `opositia.llamadas`, `opositia.cookies` y la clave
 * temporal `opositia.probe`, que solo se usa para comprobar si el almacenamiento existe.
 */

export const STORAGE_KEYS = {
  consultas: "opositia.consultas",
  llamadas: "opositia.llamadas",
  cookies: "opositia.cookies",
} as const;

export const CONSULTA_EVENT = "opositia:consulta-guardada";
export const LLAMADA_EVENT = "opositia:llamada-solicitada";

export type Consulta = {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  cursoId: string;
  cursoNombre: string;
  mensaje: string;
  /** Respuestas opcionales de la consulta guiada. */
  etapa?: string;
  horas?: string;
};

export type Llamada = {
  id: string;
  fecha: string;
  telefono: string;
};

export type CookieDecision = {
  estado: "accepted" | "rejected";
  fecha: string;
};

export const storageDisponible = (): boolean => {
  try {
    if (typeof window === "undefined") return false;
    const probe = "opositia.probe";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
};

const leer = <T>(clave: string): T | null => {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(clave);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const escribir = (clave: string, valor: unknown): boolean => {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
};

export const leerConsultas = (): Consulta[] => {
  const datos = leer<Consulta[]>(STORAGE_KEYS.consultas);
  return Array.isArray(datos) ? datos : [];
};

export const guardarConsultas = (consultas: Consulta[]) =>
  escribir(STORAGE_KEYS.consultas, consultas);

export const siguienteNumero = (consultas: Consulta[]): string => {
  const numeros = consultas
    .map((consulta) => Number.parseInt(consulta.id.replace("OPO-", ""), 10))
    .filter((numero) => Number.isFinite(numero));
  const siguiente = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `OPO-${String(siguiente).padStart(4, "0")}`;
};

export const agregarConsulta = (
  datos: Omit<Consulta, "id" | "fecha">,
): { consulta: Consulta; consultas: Consulta[]; ok: boolean } => {
  const actuales = leerConsultas();
  const consulta: Consulta = {
    ...datos,
    id: siguienteNumero(actuales),
    fecha: new Date().toISOString(),
  };
  const consultas = [consulta, ...actuales];
  const ok = guardarConsultas(consultas);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSULTA_EVENT, { detail: consulta }));
  }
  return { consulta, consultas, ok };
};

export const leerLlamadas = (): Llamada[] => {
  const datos = leer<Llamada[]>(STORAGE_KEYS.llamadas);
  return Array.isArray(datos) ? datos : [];
};

export const guardarLlamadas = (llamadas: Llamada[]) =>
  escribir(STORAGE_KEYS.llamadas, llamadas);

const siguienteNumeroLlamada = (llamadas: Llamada[]): string => {
  const numeros = llamadas
    .map((llamada) => Number.parseInt(llamada.id.replace("LLA-", ""), 10))
    .filter((numero) => Number.isFinite(numero));
  const siguiente = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `LLA-${String(siguiente).padStart(4, "0")}`;
};

export const agregarLlamada = (
  telefono: string,
): { llamada: Llamada; llamadas: Llamada[]; ok: boolean } => {
  const actuales = leerLlamadas();
  const llamada: Llamada = {
    id: siguienteNumeroLlamada(actuales),
    fecha: new Date().toISOString(),
    telefono,
  };
  const llamadas = [llamada, ...actuales];
  const ok = guardarLlamadas(llamadas);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LLAMADA_EVENT, { detail: llamada }));
  }
  return { llamada, llamadas, ok };
};

export const leerCookies = (): CookieDecision | null =>
  leer<CookieDecision>(STORAGE_KEYS.cookies);

export const guardarCookies = (estado: CookieDecision["estado"]): CookieDecision => {
  const decision: CookieDecision = { estado, fecha: new Date().toISOString() };
  escribir(STORAGE_KEYS.cookies, decision);
  return decision;
};

export const borrarCookies = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEYS.cookies);
  } catch {
    /* almacenamiento no disponible */
  }
};

export const formatearFecha = (iso: string): string => {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return iso;
  return fecha.toLocaleString("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
