"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SECTION_MAIN, SectionTitle } from "@/components/ui/section";
import { type Workshop } from "@/content";
// import { api } from "@/convex/_generated/api";
// import type { Workshop } from "@/convex/model/workshops";
// import { type Preloaded, usePreloadedQuery } from "convex/react";
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Img from "next/image";
import Link from "next/link";
import { useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

// ROOT ************************************************************************************************************************************
export function Items({ className, preloaded }: ItemsProps) {
  const workshops = preloaded;
  // const workshops = usePreloadedQuery(preloaded);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section intent="secondary">
      <main className={SECTION_MAIN()}>
        <SectionTitle title={["Rejoignez-moi", "pour expérimenter"]} intent="secondary" />
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {workshops.map((workshop, i) => (
            <div
              key={i}
              className="group relative block size-full p-4"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    className="bg-secondary absolute inset-0 block size-full rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      // opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Item key={i} workshop={workshop} index={i} />
            </div>
          ))}
        </ul>
      </main>
    </Section>
  );
}

// ITEM ************************************************************************************************************************************
const ITEM = tv({
  slots: {
    BASE: ``,
    IMG: `size-full object-cover`,
    INFOS: `absolute inset-0 flex flex-col justify-between bg-black/50 text-white p-5 transition-opacity duration-300 opacity-0 pointer-events-none
    group-hover:opacity-100`,
    WRAPPER: `group z-20 relative gap-8 w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-lg inset-shadow-2xs transition-all duration-300 ease-out`,
  },
  variants: {
    otherHovered: {
      true: {
        WRAPPER: "scale-[0.98] blur-sm",
      },
    },
  },
});

export function Item({ className: C = {}, index, workshop }: ItemProps) {
  const { BASE, IMG, INFOS, WRAPPER } = ITEM();

  return (
    <div className={WRAPPER({ className: C.WRAPPER })}>
      <figure className="relative aspect-square w-full max-w-xl">
        <Img {...workshop.image} className="size-full object-cover" />
      </figure>
      <div className="flex flex-col gap-8 p-4">
        <h3 className="font-heading text-center text-4xl font-black">{workshop.title}</h3>
        <p className="text-justify font-light text-balance">{workshop.content}</p>
        <ul className="flex flex-col gap-2">
          <li className="flex gap-2">
            <MapPinIcon className="text-secondary" />
            {workshop.place}
          </li>
          <li className="flex gap-2">
            <ClockIcon className="text-secondary" />
            {workshop.duration}
          </li>
          <li className="flex gap-2">
            <CalendarIcon className="text-secondary flex-none" />
            <ul className="flex w-full flex-col gap-2">
              <li className="flex items-center justify-between gap-2">
                05 Juillet 2025
                <Badge variant="outline" className="bg-white">
                  3<UserIcon />
                </Badge>
              </li>
              <li className="flex items-center justify-between gap-2">
                19 Septembre 2025
                <Badge variant="destructive">
                  0<UserIcon />
                </Badge>
              </li>
            </ul>
          </li>
        </ul>
        <Button intent="secondary" className="self-center">
          <Link href="#">Réserver</Link>
        </Button>
      </div>
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
type ItemsProps = {
  className?: string;
  preloaded: Workshop[];
  // preloaded: Preloaded<typeof api.workshops.readAll>
};

type ItemProps = ItemStyles & {
  workshop: Workshop;
  index: number;
};

type ItemStyles = VariantProps<typeof ITEM> & { className?: Partial<(typeof ITEM)["slots"]> };
