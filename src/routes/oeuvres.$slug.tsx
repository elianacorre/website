import { createFileRoute } from "@tanstack/react-router";
import { GridBackground } from "@/components/grid-background";
import { Section, SectionMain } from "@/components/section";
import { WorksGrid } from "@/components/works-grid";
import { readWorksSetPage } from "@/functions/pages";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/oeuvres/$slug")({
  component: WorksSetPage,
  loader: ({ params: { slug } }) => readWorksSetPage(slug),
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function WorksSetPage() {
  const works = Route.useLoaderData();

  return (
    <Section>
      <GridBackground />
      <SectionMain>
        <WorksGrid works={works} />
      </SectionMain>
    </Section>
  );
}
