import { Link, useRouterState } from "@tanstack/react-router";

import { contacto } from "@/data/contacto";

const RUTAS_LEGALES = ["/aviso-legal", "/privacidad", "/terminos"];

export function Footer({ onAbrirCookies }: { onAbrirCookies: () => void }) {
  // Estando en una página legal, ir a otra la reemplaza en el historial: así "Volver"
  // y el botón atrás del navegador regresan a la página de origen, no a la legal anterior.
  const pathname = useRouterState({ select: (estado) => estado.location.pathname });
  const enLegal = RUTAS_LEGALES.includes(pathname);

  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">
            Opositia<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/80">
            Academia de preparación para concursos públicos en Montevideo, Uruguay.
          </p>
        </div>

        <div className="text-sm">
          <h2 className="text-sm font-bold text-primary-foreground">Contacto</h2>
          <address className="mt-3 space-y-1 not-italic text-primary-foreground/80">
            <p>
              {contacto.direccion} — {contacto.barrio}
            </p>
            <p>{contacto.telefono}</p>
            <p>{contacto.email}</p>
            <p>{contacto.horario}</p>
          </address>
        </div>

        <div className="text-sm">
          <h2 className="text-sm font-bold text-primary-foreground">Información legal</h2>
          <ul className="mt-3 space-y-2 text-primary-foreground/80">
            <li>
              <Link to="/aviso-legal" replace={enLegal} className="underline underline-offset-4">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link to="/privacidad" replace={enLegal} className="underline underline-offset-4">
                Privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" replace={enLegal} className="underline underline-offset-4">
                Términos
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={onAbrirCookies}
                className="underline underline-offset-4"
              >
                Preferencias de cookies
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="container-page py-5 text-xs text-primary-foreground/70">
          Sitio de demostración. Los datos, precios, fechas y personas son ficticios.
        </p>
      </div>
    </footer>
  );
}
