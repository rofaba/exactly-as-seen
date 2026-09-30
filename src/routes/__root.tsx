import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { organizacionJsonLd, SITE_NAME } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-3xl font-extrabold">No encontramos esta página</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Puede que el enlace esté viejo o que la dirección tenga un error.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-base btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold">Esta página no cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Probá de nuevo o volvé al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-primary"
          >
            Probar de nuevo
          </button>
          <Link to="/" className="btn-base btn-outline">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE_NAME },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Cada "<" del JSON-LD se reemplaza por su escape Unicode de seis caracteres, para que un valor
// con </script> no pueda cerrar la etiqueta. La barra invertida se arma por código a propósito.
const MENOR_ESCAPADO = String.fromCharCode(92) + "u003c";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-UY">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizacionJsonLd).replace(/</g, MENOR_ESCAPADO),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [abrirCookies, setAbrirCookies] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <Header />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Footer onAbrirCookies={() => setAbrirCookies(true)} />
      <CookieBanner
        forzarApertura={abrirCookies}
        onCerrar={() => setAbrirCookies(false)}
      />
    </QueryClientProvider>
  );
}
