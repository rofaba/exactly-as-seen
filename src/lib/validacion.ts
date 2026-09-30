/**
 * Validación y limpieza de los datos de los formularios de contacto.
 *
 * Es validación de cliente: sirve para guiar a la persona y para no guardar basura en
 * `localStorage`. El backend real tiene que volver a validar todo antes de usar los datos
 * (por ejemplo, antes de enviar un correo).
 */

export const LIMITES = {
  nombre: 80,
  email: 120,
  telefono: 13,
  mensaje: 1000,
} as const;

export const PLACEHOLDER_TELEFONO = "099555123 o +59899555123";

export const AYUDA_TELEFONO =
  "Solo números, sin espacios ni signos. Con código de país, empezá con + (ej.: +59899555123).";

export const MENSAJE_TELEFONO =
  "Revisá el teléfono: solo números, con un + al inicio si incluís el código de país (entre 8 y 12 dígitos).";

const MENSAJE_NOMBRE =
  "Escribí tu nombre y apellido, solo con letras (se aceptan espacios, guiones, puntos y apóstrofes).";

// Caracteres de control y de ancho cero, que no aportan nada a un texto visible.
// Se comparan por código numérico para no llevar caracteres invisibles en el fuente.
const ANCHO_CERO = [0x200b, 0x200c, 0x200d, 0x2060, 0xfeff];

const esInvisible = (caracter: string): boolean => {
  const codigo = caracter.codePointAt(0) ?? 0;
  return (
    codigo <= 0x08 ||
    codigo === 0x0b ||
    codigo === 0x0c ||
    (codigo >= 0x0e && codigo <= 0x1f) ||
    codigo === 0x7f ||
    ANCHO_CERO.includes(codigo)
  );
};

const sinInvisibles = (valor: string): string =>
  Array.from(valor)
    .filter((caracter) => !esInvisible(caracter))
    .join("");

/** Texto de una sola línea: sin caracteres invisibles y con los espacios colapsados. */
export const limpiarLinea = (valor: string): string =>
  sinInvisibles(valor).replace(/\s+/g, " ").trim();

/** Texto de varias líneas: conserva los saltos de línea, pero no más de una línea en blanco. */
export const limpiarTexto = (valor: string): string =>
  sinInvisibles(valor)
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const contarLetras = (texto: string): number => (texto.match(/\p{L}/gu) ?? []).length;

const palabrasConLetras = (texto: string): string[] =>
  texto.split(/\s+/).filter((palabra) => /\p{L}/u.test(palabra));

const NOMBRE_VALIDO = /^\p{L}[\p{L}\p{M}'’.\- ]*$/u;

export const validarNombre = (valor: string): string | null => {
  const nombre = limpiarLinea(valor);
  if (!nombre) return "Escribí tu nombre y apellido.";
  if (nombre.length > LIMITES.nombre) {
    return `El nombre es demasiado largo (máximo ${LIMITES.nombre} caracteres).`;
  }
  if (!NOMBRE_VALIDO.test(nombre) || palabrasConLetras(nombre).length < 2 || contarLetras(nombre) < 4) {
    return MENSAJE_NOMBRE;
  }
  return null;
};

const EMAIL_VALIDO =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,24}$/;

export const validarEmail = (valor: string): string | null => {
  const email = valor.trim();
  if (!email) return "Escribí tu correo.";
  if (email.length > LIMITES.email) {
    return `El correo es demasiado largo (máximo ${LIMITES.email} caracteres).`;
  }
  const local = email.split("@")[0] ?? "";
  if (!EMAIL_VALIDO.test(email) || /^\.|\.$|\.\./.test(local)) {
    return "El correo no tiene un formato válido.";
  }
  return null;
};

export const telefonoValido = (valor: string): boolean => /^\+?\d{8,12}$/.test(valor.trim());

export const validarMensaje = (valor: string): string | null => {
  const mensaje = limpiarTexto(valor);
  if (!mensaje) return "Contanos brevemente tu consulta.";
  if (mensaje.length > LIMITES.mensaje) {
    return `El mensaje es demasiado largo (máximo ${LIMITES.mensaje} caracteres).`;
  }
  if (contarLetras(mensaje) < 10 || palabrasConLetras(mensaje).length < 2) {
    return "Contanos un poco más sobre tu consulta (al menos 2 palabras y 10 letras).";
  }
  return null;
};
