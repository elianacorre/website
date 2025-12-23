import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { readRootLayout } from "@/functions/layouts";
import appCss from "../styles/app.css?url";
import { Header } from "./-header";
import "@fontsource-variable/dancing-script";
import "@fontsource-variable/lexend";
import { GridBackground } from "@/components/grid-background";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "TanStack Start Starter" }],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  loader: () => readRootLayout(),
  shellComponent: RootDocument,
});

// LAYOUT ----------------------------------------------------------------------------------------------------------------------------------
function RootDocument({ children }: RootDocumentProps) {
  const data = Route.useLoaderData();

  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden antialiased">
        <GridBackground />
        <Header {...data} />
        <main className="relative mt-20 flex-1 sm:mt-28 md:mt-40">{children}</main>
        <section className="relative flex justify-between bg-neutral-700 p-4 text-white">
          <span>© 2025 Eliana Corré</span>
          <Link to="/">Mentions légales</Link>
        </section>
        <Scripts />
      </body>
    </html>
  );
}
type RootDocumentProps = { children: React.ReactNode };
