import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Img } from "@/components/Img";
import { contacto } from "@/data/contacto";
import { courses, getCourse } from "@/data/courses";
import { images } from "@/data/images";
import { sampleConsultas } from "@/data/sampleConsultas";
import { sampleLlamadas } from "@/data/sampleLlamadas";
import {
  agregarConsulta,
  agregarLlamada,
  formatearFecha,
  guardarConsultas,
  guardarLlamadas,
  leerConsultas,
  leerLlamadas,
  storageDisponible,
  STORAGE_KEYS,
  type Consulta,
  type Llamada,
} from "@/lib/storage";
import { seo } from "@/lib/seo";

type Search = { curso?: string | undefined };

export const Route = createFileRoute("/contacto")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    curso: typeof search["curso"] === "string" ? search["curso"] : undefined,
  }),
  head: () =>
    seo({
      titulo: "Contacto — Academia Opositia",
      descripcion:
        "Escribinos por el formulario para consultar por un curso de preparación para concursos públicos. Sede en Ciudad Vieja, Montevideo.",
      path: "/contacto",
    }),
  component: Contacto,
});

type Errores = Partial<Record<"nombre" | "email" | "telefono" | "mensaje" | "acepta", string>>;

const emailValido = (valor: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());

type ErroresLlamada = Partial<Record<"telefono" | "acepta", string>>;

const PLACEHOLDER_TELEFONO = "099555123 o +59899555123";

const AYUDA_TELEFONO =
  "Solo números, sin espacios ni signos. Con código de país, empezá con + (ej.: +59899555123).";

const MENSAJE_TELEFONO =
  "Revisá el teléfono: solo números, con un + al inicio si incluís el código de país (entre 8 y 12 dígitos).";

const telefonoValido = (valor: string) => /^\+?\d{8,12}$/.test(valor.trim());

const ETAPAS = [
  "Todavía no elegí un llamado",
  "Voy a rendir mi primer concurso",
  "Ya estoy inscripto y preparo la prueba escrita",
  "Aprobé la prueba escrita y sigo con méritos y entrevista",
];

const HORAS = [
  "Menos de 4 horas por semana",
  "Entre 4 y 8 horas por semana",
  "Más de 8 horas por semana",
];

function TerminosLabel({ htmlFor }: { htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm text-foreground">
      Acepto los{" "}
      <Link
        to="/terminos"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-ink underline underline-offset-4"
      >
        términos<span className="sr-only"> (se abre en otra pestaña)</span>
      </Link>{" "}
      y la{" "}
      <Link
        to="/privacidad"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-ink underline underline-offset-4"
      >
        política de privacidad
        <span className="sr-only"> (se abre en otra pestaña)</span>
      </Link>
      .
    </label>
  );
}

function Contacto() {
  const { curso } = Route.useSearch();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cursoId, setCursoId] = useState(getCourse(curso)?.id ?? "");
  const [etapa, setEtapa] = useState("");
  const [horas, setHoras] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [confirmacion, setConfirmacion] = useState("");
  const [aviso, setAviso] = useState("");
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [llamadas, setLlamadas] = useState<Llamada[]>([]);
  const [telLlamada, setTelLlamada] = useState("");
  const [aceptaLlamada, setAceptaLlamada] = useState(false);
  const [erroresLlamada, setErroresLlamada] = useState<ErroresLlamada>({});
  const [confirmacionLlamada, setConfirmacionLlamada] = useState("");

  const refNombre = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refTelefono = useRef<HTMLInputElement>(null);
  const refMensaje = useRef<HTMLTextAreaElement>(null);
  const refAcepta = useRef<HTMLInputElement>(null);
  const refTelLlamada = useRef<HTMLInputElement>(null);
  const refAceptaLlamada = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!storageDisponible()) {
      setAviso(
        "Tu navegador no permite guardar datos en este sitio, así que las consultas no se van a conservar.",
      );
      setConsultas(sampleConsultas);
      setLlamadas(sampleLlamadas);
      return;
    }
    const existentes = window.localStorage.getItem(STORAGE_KEYS.consultas);
    if (existentes === null) {
      guardarConsultas(sampleConsultas);
      setConsultas(sampleConsultas);
    } else {
      setConsultas(leerConsultas());
    }
    const pedidos = window.localStorage.getItem(STORAGE_KEYS.llamadas);
    if (pedidos === null) {
      guardarLlamadas(sampleLlamadas);
      setLlamadas(sampleLlamadas);
    } else {
      setLlamadas(leerLlamadas());
    }
  }, []);

  useEffect(() => {
    const encontrado = getCourse(curso);
    if (encontrado) setCursoId(encontrado.id);
  }, [curso]);

  const validar = (): Errores => {
    const nuevos: Errores = {};
    if (!nombre.trim()) nuevos.nombre = "Escribí tu nombre.";
    if (!email.trim()) nuevos.email = "Escribí tu correo.";
    else if (!emailValido(email)) nuevos.email = "El correo no tiene un formato válido.";
    if (telefono.trim() && !telefonoValido(telefono)) nuevos.telefono = MENSAJE_TELEFONO;
    if (!mensaje.trim()) nuevos.mensaje = "Contanos brevemente tu consulta.";
    if (!acepta)
      nuevos.acepta = "Tenés que aceptar los términos y la política de privacidad.";
    return nuevos;
  };

  const onSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setConfirmacion("");
      if (nuevos.nombre) refNombre.current?.focus();
      else if (nuevos.email) refEmail.current?.focus();
      else if (nuevos.telefono) refTelefono.current?.focus();
      else if (nuevos.mensaje) refMensaje.current?.focus();
      else refAcepta.current?.focus();
      return;
    }

    const elegido = getCourse(cursoId);
    const { consulta, consultas: actualizadas, ok } = agregarConsulta({
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      cursoId: elegido?.id ?? "",
      cursoNombre: elegido?.nombre ?? "Todavía no sé",
      mensaje: mensaje.trim(),
      ...(etapa ? { etapa } : {}),
      ...(horas ? { horas } : {}),
    });

    setConsultas(actualizadas);
    setConfirmacion(
      `Recibimos tu consulta, N.º ${consulta.id}. Te respondemos al correo que dejaste dentro de las 48 horas hábiles.`,
    );
    if (!ok) {
      setAviso(
        "No pudimos guardar la consulta en este navegador, pero el formulario se envió correctamente en la demo.",
      );
    }

    setNombre("");
    setEmail("");
    setTelefono("");
    setCursoId("");
    setEtapa("");
    setHoras("");
    setMensaje("");
    setAcepta(false);
  };

  const onLlamada = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevos: ErroresLlamada = {};
    if (!telLlamada.trim()) nuevos.telefono = "Escribí un teléfono para que te llamemos.";
    else if (!telefonoValido(telLlamada))
      nuevos.telefono = MENSAJE_TELEFONO;
    if (!aceptaLlamada)
      nuevos.acepta = "Tenés que aceptar los términos y la política de privacidad.";
    setErroresLlamada(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setConfirmacionLlamada("");
      if (nuevos.telefono) refTelLlamada.current?.focus();
      else refAceptaLlamada.current?.focus();
      return;
    }

    const { llamada, llamadas: actualizadas, ok } = agregarLlamada(telLlamada.trim());
    setLlamadas(actualizadas);
    setConfirmacionLlamada(
      `Listo, N.º ${llamada.id}. Te llamamos dentro del horario de atención (en la demo no se realiza ninguna llamada).`,
    );
    if (!ok) {
      setAviso(
        "No pudimos guardar el pedido de llamada en este navegador, pero se registró correctamente en la demo.",
      );
    }
    setTelLlamada("");
    setAceptaLlamada(false);
  };

  const reiniciar = () => {
    guardarConsultas(sampleConsultas);
    setConsultas(sampleConsultas);
    guardarLlamadas(sampleLlamadas);
    setLlamadas(sampleLlamadas);
    setConfirmacionLlamada("");
    setConfirmacion("");
    setAviso("Volvimos a los datos de ejemplo iniciales.");
  };

  const campoClases =
    "mt-2 w-full rounded-sm border border-border-strong bg-card px-3 py-2.5 text-sm text-foreground";

  return (
    <main id="contenido" className="container-page py-12 md:py-16">
      <p className="eyebrow">Contacto</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">
        Contanos qué llamado te interesa
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Respondemos por correo dentro de las 48 horas hábiles. Si ya sabés por qué curso
        consultás, elegilo en el formulario para que la respuesta sea más precisa.
      </p>

      {aviso ? (
        <p
          role="status"
          className="mt-6 rounded-sm border border-border-strong bg-primary-soft px-4 py-3 text-sm text-primary"
        >
          {aviso}
        </p>
      ) : null}

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section aria-labelledby="formulario">
          <h2 id="formulario" className="text-xl font-bold">
            Formulario de consulta
          </h2>

          <div aria-live="polite" className="min-h-0">
            {confirmacion ? (
              <p className="mt-4 rounded-sm border-l-4 border-l-accent bg-card px-4 py-3 text-sm font-semibold text-primary">
                {confirmacion}
              </p>
            ) : null}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
            <div>
              <label htmlFor="nombre" className="text-sm font-semibold text-primary">
                Nombre y apellido
              </label>
              <input
                id="nombre"
                ref={refNombre}
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? "error-nombre" : undefined}
                className={campoClases}
              />
              {errores.nombre ? (
                <p id="error-nombre" className="mt-1 text-sm text-destructive">
                  {errores.nombre}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-primary">
                Correo electrónico
              </label>
              <input
                id="email"
                ref={refEmail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errores.email)}
                aria-describedby={errores.email ? "error-email" : undefined}
                className={campoClases}
              />
              {errores.email ? (
                <p id="error-email" className="mt-1 text-sm text-destructive">
                  {errores.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="telefono" className="text-sm font-semibold text-primary">
                Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <input
                id="telefono"
                ref={refTelefono}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={PLACEHOLDER_TELEFONO}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                aria-invalid={Boolean(errores.telefono)}
                aria-describedby={
                  errores.telefono ? "ayuda-telefono error-telefono" : "ayuda-telefono"
                }
                className={campoClases}
              />
              <p id="ayuda-telefono" className="mt-1 text-xs text-muted-foreground">
                {AYUDA_TELEFONO}
              </p>
              {errores.telefono ? (
                <p id="error-telefono" className="mt-1 text-sm text-destructive">
                  {errores.telefono}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="curso" className="text-sm font-semibold text-primary">
                Curso de interés
              </label>
              <select
                id="curso"
                value={cursoId}
                onChange={(e) => setCursoId(e.target.value)}
                className={campoClases}
              >
                <option value="">Todavía no sé</option>
                {courses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="space-y-4 rounded-sm border border-border p-4">
              <legend className="px-2 text-sm font-semibold text-primary">
                Para orientarte mejor{" "}
                <span className="font-normal text-muted-foreground">(opcional)</span>
              </legend>
              <div>
                <label htmlFor="etapa" className="text-sm font-semibold text-primary">
                  ¿En qué etapa estás?
                </label>
                <select
                  id="etapa"
                  value={etapa}
                  onChange={(e) => setEtapa(e.target.value)}
                  className={campoClases}
                >
                  <option value="">Prefiero no decirlo</option>
                  {ETAPAS.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="horas" className="text-sm font-semibold text-primary">
                  ¿Cuánto tiempo podés estudiar por semana?
                </label>
                <select
                  id="horas"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  className={campoClases}
                >
                  <option value="">Prefiero no decirlo</option>
                  {HORAS.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            <div>
              <label htmlFor="mensaje" className="text-sm font-semibold text-primary">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                ref={refMensaje}
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                aria-invalid={Boolean(errores.mensaje)}
                aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
                className={campoClases}
              />
              {errores.mensaje ? (
                <p id="error-mensaje" className="mt-1 text-sm text-destructive">
                  {errores.mensaje}
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex items-start gap-3">
                <input
                  id="acepta"
                  ref={refAcepta}
                  type="checkbox"
                  checked={acepta}
                  onChange={(e) => setAcepta(e.target.checked)}
                  aria-invalid={Boolean(errores.acepta)}
                  aria-describedby={errores.acepta ? "error-acepta" : undefined}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#d97706]"
                />
                <TerminosLabel htmlFor="acepta" />
              </div>
              {errores.acepta ? (
                <p id="error-acepta" className="mt-1 text-sm text-destructive">
                  {errores.acepta}
                </p>
              ) : null}
            </div>

            <button type="submit" className="btn-base btn-accent w-full md:w-auto">
              Enviar consulta
            </button>
          </form>
        </section>

        <div className="space-y-10">
          <section aria-labelledby="rapido" className="card-flat border-l-4 border-l-accent p-6">
            <h2 id="rapido" className="text-xl font-bold">
              Contacto rápido
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dejá tu teléfono y te llamamos dentro del horario de atención. Es una
              simulación: no se realiza ninguna llamada.
            </p>

            <div aria-live="polite" className="min-h-0">
              {confirmacionLlamada ? (
                <p className="mt-4 rounded-sm border-l-4 border-l-accent bg-surface px-4 py-3 text-sm font-semibold text-primary">
                  {confirmacionLlamada}
                </p>
              ) : null}
            </div>

            <form onSubmit={onLlamada} noValidate className="mt-4 space-y-4">
              <div>
                <label htmlFor="tel-llamada" className="text-sm font-semibold text-primary">
                  Tu teléfono
                </label>
                <input
                  id="tel-llamada"
                  ref={refTelLlamada}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={PLACEHOLDER_TELEFONO}
                  value={telLlamada}
                  onChange={(e) => setTelLlamada(e.target.value)}
                  aria-invalid={Boolean(erroresLlamada.telefono)}
                  aria-describedby={
                    erroresLlamada.telefono ? "ayuda-tel-llamada error-tel-llamada" : "ayuda-tel-llamada"
                  }
                  className={campoClases}
                />
                <p id="ayuda-tel-llamada" className="mt-1 text-xs text-muted-foreground">
                  {AYUDA_TELEFONO}
                </p>
                {erroresLlamada.telefono ? (
                  <p id="error-tel-llamada" className="mt-1 text-sm text-destructive">
                    {erroresLlamada.telefono}
                  </p>
                ) : null}
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="acepta-llamada"
                    ref={refAceptaLlamada}
                    type="checkbox"
                    checked={aceptaLlamada}
                    onChange={(e) => setAceptaLlamada(e.target.checked)}
                    aria-invalid={Boolean(erroresLlamada.acepta)}
                    aria-describedby={erroresLlamada.acepta ? "error-acepta-llamada" : undefined}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#d97706]"
                  />
                  <TerminosLabel htmlFor="acepta-llamada" />
                </div>
                {erroresLlamada.acepta ? (
                  <p id="error-acepta-llamada" className="mt-1 text-sm text-destructive">
                    {erroresLlamada.acepta}
                  </p>
                ) : null}
              </div>

              <button type="submit" className="btn-base btn-accent w-full">
                Quiero que me llamen
              </button>
            </form>
          </section>

          <section aria-labelledby="datos" className="card-flat p-6">
            <h2 id="datos" className="text-xl font-bold">
              Atención comercial
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Dirección</dt>
                <dd>
                  {contacto.direccion} — {contacto.barrio}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Teléfonos</dt>
                <dd>
                  {contacto.telefono} · {contacto.celular}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Correo</dt>
                <dd>{contacto.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Horario</dt>
                <dd>{contacto.horario}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Canal preferido</dt>
                <dd>{contacto.canalPreferido}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              Datos ficticios de demostración.
            </p>
          </section>

          <section aria-labelledby="ubicacion" className="card-flat overflow-hidden">
            <Img
              image={images.mapaCentro}
              className="aspect-[3/2] w-full object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="p-6">
              <h2 id="ubicacion" className="text-xl font-bold">
                Cómo llegar
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {contacto.direccion}, {contacto.barrio} (CP {contacto.cp}).
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {contacto.comoLlegar.map((referencia) => (
                  <li key={referencia} className="border-l-2 border-border pl-4">
                    {referencia}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Mapa estático · © colaboradores de OpenStreetMap. El mapa interactivo se integra en el lanzamiento.
              </p>
            </div>
          </section>
        </div>
      </div>

      <section aria-labelledby="guardadas" className="mt-16 rule-top pt-10">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <p className="eyebrow">Panel de demostración</p>
            <h2 id="guardadas" className="mt-3 text-xl font-bold">
              Consultas guardadas en este navegador
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Este panel existe solo para la demo: permite comprobar que el formulario y el
              contacto rápido guardan datos, y desaparece cuando se conecte el backend. Se
              guardan solo en este dispositivo, en la clave{" "}
              <code className="font-mono text-xs">{STORAGE_KEYS.consultas}</code>.
            </p>
          </div>
          <button type="button" onClick={reiniciar} className="btn-base btn-outline">
            Reiniciar datos de ejemplo
          </button>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {consultas.map((item) => (
            <li key={item.id} className="card-flat p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-sm font-bold text-accent-ink">{item.id}</p>
                <p className="text-xs text-muted-foreground">
                  {formatearFecha(item.fecha)}
                </p>
              </div>
              <p className="mt-3 text-sm font-bold text-primary">{item.nombre}</p>
              <p className="text-xs text-muted-foreground">{item.email}</p>
              {item.telefono ? (
                <p className="text-xs text-muted-foreground">{item.telefono}</p>
              ) : null}
              <p className="mt-3 text-xs font-semibold text-primary">
                {item.cursoNombre}
              </p>
              {item.etapa || item.horas ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  {[item.etapa, item.horas].filter(Boolean).join(" · ")}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-muted-foreground">{item.mensaje}</p>
            </li>
          ))}
        </ul>
        {consultas.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">
            No hay consultas guardadas en este navegador.
          </p>
        ) : null}

        <h3 className="mt-12 text-lg font-bold">Pedidos de llamada guardados</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Del contacto rápido. Se guardan en la clave{" "}
          <code className="font-mono text-xs">{STORAGE_KEYS.llamadas}</code>.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {llamadas.map((item) => (
            <li key={item.id} className="card-flat flex flex-wrap items-baseline justify-between gap-2 p-4">
              <p className="font-mono text-sm font-bold text-accent-ink">{item.id}</p>
              <p className="text-sm text-primary">{item.telefono}</p>
              <p className="w-full text-xs text-muted-foreground">
                {formatearFecha(item.fecha)}
              </p>
            </li>
          ))}
        </ul>
        {llamadas.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No hay pedidos de llamada guardados en este navegador.
          </p>
        ) : null}
      </section>
    </main>
  );
}
