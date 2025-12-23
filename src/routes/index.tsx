import { createFileRoute } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { Toaster } from "@/components/adapted/sonner";
import { BtnLink } from "@/components/btn";
import { GridBackground } from "@/components/grid-background";
import { Hero, HeroContent } from "@/components/hero";
import { Section, SectionContent, SectionImage, SectionMain, SectionTitle } from "@/components/section";
import { WorksGrid } from "@/components/works-grid";
import { readIndexPage } from "@/functions/pages";
import { IndexForm } from "./index/-form";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/")({
  component: App,
  loader: () => readIndexPage(),
});

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const QUOTE = {
  author: cva(`text-lg font-black text-neutral-500
    sm:text-xl
    md:text-2xl
    2xl:text-3xl`),
  base: cva(`relative px-4 py-8
    sm:px-8
    md:py-20`),
  content: cva(`relative flex flex-col items-center gap-4
    sm:gap-8`),
  sentence: cva(`font-heading font-bold text-3xl text-center
    sm:text-5xl
    md:text-6xl
    2xl:text-7xl`),
};

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function App() {
  const { contact, hero, quote, works } = Route.useLoaderData();

  return (
    <>
      <Hero className={{ aside: "flex" }} image={hero.image} title={hero.title}>
        <HeroContent>{hero.content}</HeroContent>
        <BtnLink href="/#contact">{hero.button}</BtnLink>
      </Hero>
      <Section className={{ base: "lg:-mt-20" }} intent="secondary">
        <SectionMain>
          <SectionTitle intent="secondary" title={works.title} />
          <WorksGrid works={works.items} />
        </SectionMain>
      </Section>
      <section className={QUOTE.base()}>
        <GridBackground />
        <div className={QUOTE.content()}>
          <h3 className={QUOTE.sentence()}>{quote.sentence}</h3>
          <h4 className={QUOTE.author()}>{quote.author}</h4>
        </div>
      </section>
      <Section id="contact" intent="primary">
        <SectionImage image={contact.image} reverse />
        <SectionMain>
          <SectionTitle title={contact.title} />
          <SectionContent>{contact.content}</SectionContent>
          <IndexForm />
        </SectionMain>
      </Section>
      <Toaster position="bottom-center" />
    </>
  );
}
