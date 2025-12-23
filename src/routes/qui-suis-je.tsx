import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionContent, SectionImage, SectionMain, SectionTitle } from "@/components/section";
import { readAboutPage } from "@/functions/pages";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/qui-suis-je")({
  component: RouteComponent,
  loader: () => readAboutPage(),
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function RouteComponent() {
  const data = Route.useLoaderData();
  const intents = ["default", "secondary", "primary"] as const;

  return (
    <>
      {data.map(({ content, img, slug, title }, i) => (
        <Section className={{ container: i % 2 !== 0 ? "lg:flex-row-reverse" : "" }} intent={intents[i]} key={slug}>
          <SectionMain className="basis-1/2">
            <SectionTitle intent={intents[i] === "secondary" ? "secondary" : "primary"} title={title} />
            <SectionContent>{content}</SectionContent>
          </SectionMain>
          <SectionImage className={{ figure: "flex basis-1/2" }} image={img} reverse={i % 2 !== 0} />
        </Section>
      ))}
    </>
  );
}
