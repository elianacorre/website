import { createFileRoute, type LinkOptions, Outlet, useParams } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import { BtnLink } from "@/components/btn";
import { Hero, HeroContent } from "@/components/hero";
import { Section, SectionContent, SectionMain, SectionTitle } from "@/components/section";
import { readWorksLayout } from "@/functions/layouts";
import type { Sets } from "@/functions/sets";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/oeuvres")({
  component: WorksLayout,
  loader: () => readWorksLayout(),
});

// LAYOUT ----------------------------------------------------------------------------------------------------------------------------------
function WorksLayout() {
  const { hero, sets } = Route.useLoaderData();

  return (
    <>
      <Hero image={hero.image} title={hero.title}>
        <HeroContent>{hero.content}</HeroContent>
      </Hero>
      <WorksLayoutSets sets={sets} />
      <Outlet />
    </>
  );
}

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const WORKS = {
  base: cva(
    `min-h-[470px]
    lg:min-h-[500px] lg:items-stretch lg:gap-20
    xl:min-h-auto`
  ),
  aside: cva(
    `relative hidden flex-none aspect-square self-center
    lg:flex lg:w-xs
    xl:w-sm 
    2xl:w-md`
  ),
  description: cva(
    `flex flex-1 flex-col justify-center gap-8 transition
    starting:translate-x-10 starting:opacity-0`
  ),
  figure: cva("absolute size-full overflow-hidden rounded-3xl bg-neutral-200 shadow-2xl transition", {
    variants: {
      active: {
        false: "-translate-z-96 z-10 scale-90 opacity-80",
        true: "translate-z-0 z-40 scale-100 opacity-100",
      },
    },
  }),
  image: cva("size-full object-cover"),
  main: cva("flex-1 justify-between"),
  nav: cva("flex w-full justify-between"),
  title: cva(
    `text-2xl 
    sm:text-4xl 
    2xl:text-5xl`
  ),
};

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function WorksLayoutSets({ sets }: WorksLayoutSetsProps) {
  const { slug } = useParams({ from: "/oeuvres/$slug" });
  const count = useMemo(() => sets.length, [sets]);
  const activeIndex = useMemo(() => sets.findIndex((set) => set.slug === slug), [slug, sets]);
  const activeSet = useMemo(() => sets[activeIndex], [activeIndex, sets]);

  const nextLink: LinkOptions = useMemo(
    () => ({ to: "/oeuvres/$slug", params: { slug: sets[(activeIndex + 1) % count]?.slug }, resetScroll: false }),
    [activeIndex, count, sets]
  );
  const previousLink: LinkOptions = useMemo(
    () => ({ to: "/oeuvres/$slug", params: { slug: sets[(activeIndex + count - 1) % count]?.slug }, resetScroll: false }),
    [activeIndex, count, sets]
  );

  return (
    <Section className={{ container: WORKS.base() }} intent="secondary">
      <aside className={WORKS.aside()}>
        {sets.map((set, i) => {
          const { height: _, ...r } = set.image;
          return (
            <figure
              className={WORKS.figure({ active: i === activeIndex })}
              key={set.slug}
              style={{ rotate: `${((i - activeIndex) * 45) / count}deg` }}
            >
              <Image
                {...r}
                aspectRatio={1}
                className={WORKS.image()}
                operations={{ imagekit: { f: "avif" } }}
                sizes="(min-width: 1536px) 448px, (min-width: 1280px) 384px, (min-width: 1024px) 320px, 1px"
              />
            </figure>
          );
        })}
      </aside>
      <SectionMain className={WORKS.main()}>
        <div className={WORKS.description()} key={activeSet.slug}>
          <SectionTitle className={{ titleRow: WORKS.title() }} intent="secondary" title={["Collection", activeSet.title]} />
          <SectionContent>{activeSet.content}</SectionContent>
        </div>
        <div className={WORKS.nav()}>
          <BtnLink {...previousLink} icon="icon-lucide--chevron-left" intent="secondary" reverse>
            Précédente
          </BtnLink>
          <BtnLink {...nextLink} intent="secondary">
            Suivante
          </BtnLink>
        </div>
      </SectionMain>
    </Section>
  );
}
export type WorksLayoutSetsProps = { sets: Sets["Entity"][] };
