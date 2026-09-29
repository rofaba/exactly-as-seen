import { useEffect, useState } from "react";

import {
  borrarCookies,
  guardarCookies,
  leerCookies,
  type CookieDecision,
} from "@/lib/storage";

export function CookieBanner({
  forzarApertura,
  onCerrar,
}: {
  forzarApertura: boolean;
  onCerrar: () => void;
}) {
  const [decision, setDecision] = useState<CookieDecision | null>(null);
  const [visible, setVisible] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const guardada = leerCookies();
    setDecision(guardada);
    setVisible(!guardada);
    setListo(true);
  }, []);

  useEffect(() => {
    if (forzarApertura) setVisible(true);
  }, [forzarApertura]);

  const decidir = (estado: CookieDecision["estado"]) => {
    setDecision(guardarCookies(estado));
    setVisible(false);
    onCerrar();
  };

  const reiniciar = () => {
    borrarCookies();
    setDecision(null);
    setVisible(true);
  };

  if (!listo || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-strong bg-card shadow-[0_-8px_24px_-20px_oklch(0.335_0.058_255/40%)]"
    >
      <div className="container-page grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <h2 id="cookies-titulo" className="text-base font-bold">
            Cookies en este sitio
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Este sitio de demostración no carga servicios externos. Guardamos tu decisión
            en este navegador para no volver a preguntarte.
            {decision ? (
              <>
                {" "}
                Decisión actual:{" "}
                <strong className="text-primary">
                  {decision.estado === "accepted" ? "aceptadas" : "rechazadas"}
                </strong>
                .
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => decidir("accepted")}
            className="btn-base btn-primary"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => decidir("rejected")}
            className="btn-base btn-outline"
          >
            Rechazar
          </button>
          {decision ? (
            <button
              type="button"
              onClick={reiniciar}
              className="btn-base px-2 text-sm text-muted-foreground underline underline-offset-4"
            >
              Borrar decisión
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
