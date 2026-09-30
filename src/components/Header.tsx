import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/cursos", label: "Cursos" },
  { to: "/equipo", label: "Quiénes somos" },
  { to: "/contacto", label: "Contacto" },
] as const;

function Wordmark() {
  return (
    <span className="text-xl font-extrabold tracking-tight text-primary">
      Opositia<span className="text-accent">.</span>
    </span>
  );
}

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [abierto]);

  const baseClases = "block border-b-2 py-2 text-[0.9375rem] transition-colors";
  const inactiveClases = `${baseClases} border-transparent font-medium text-foreground hover:text-primary`;
  const activeClases = `${baseClases} border-accent font-bold text-primary`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="container-page">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 md:flex md:justify-between md:py-4">
          <Link to="/" className="min-w-0" aria-label="Academia Opositia, ir al inicio">
            <Wordmark />
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{
                      className: activeClases,
                      "aria-current": "page",
                    }}
                    inactiveProps={{ className: inactiveClases }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={botonRef}
            type="button"
            className="btn-base btn-outline shrink-0 px-3 py-2 md:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <span className="sr-only">
              {abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            </span>
            <span aria-hidden="true" className="grid gap-[5px]">
              <span className="block h-[2px] w-5 bg-primary" />
              <span className="block h-[2px] w-5 bg-primary" />
              <span className="block h-[2px] w-5 bg-primary" />
            </span>
          </button>
        </div>
      </div>

      {abierto ? (
        <nav
          id="menu-movil"
          aria-label="Navegación principal móvil"
          className="border-t border-border bg-surface md:hidden"
        >
          <ul className="container-page divide-y divide-border py-1">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setAbierto(false)}
                  activeProps={{
                    className:
                      "flex items-center justify-between border-l-4 border-accent py-3 pl-3 font-bold text-primary",
                    "aria-current": "page",
                  }}
                  inactiveProps={{
                    className:
                      "flex items-center justify-between border-l-4 border-transparent py-3 pl-3 text-foreground",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
