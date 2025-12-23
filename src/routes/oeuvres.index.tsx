import { createFileRoute, redirect } from "@tanstack/react-router";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/oeuvres/")({
  beforeLoad: () => {
    throw redirect({ to: "/oeuvres/$slug", params: { slug: "ode-a-la-beaute" } });
  },
});
