"use client";

import { sets } from "@/.velite";
import { GridBackground } from "@/components/ui/grid-background";
import { Zoom } from "@/components/ui/zoom";
import { Work } from "@/content";
import { store } from "@/lib/utils";
import { useStore } from "@tanstack/react-store";
import { ClipboardIcon, PaletteIcon } from "lucide-react";
import Img from "next/image";
import React, { useState } from "react";
import { tv, VariantProps } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const WORK_ITEMS = tv({
  slots: {
    BASE: `relative container mx-auto grid w-full grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3`,
  },
});

// ROOT ************************************************************************************************************************************
export function WorkItems({ className, works }: WorkItemsProps) {
  const { BASE } = WORK_ITEMS();

  const activeSetIndex = useStore(store, ({ activeSetIndex }) => activeSetIndex);
  const [hovered, setHovered] = useState<number | null>(null);

  const filteredWorks = works.filter((work) => work.set.id === sets[activeSetIndex].id);

  return (
    <div className={BASE({ className })}>
      <GridBackground />
      {filteredWorks.map((work, i) => (
        <WorkItem key={work.id} work={work} index={i} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}

// ITEM ************************************************************************************************************************************
const WORK_ITEM = tv({
  slots: {
    BASE: ``,
    IMG: `size-full object-cover`,
    INFOS: `absolute inset-0 flex flex-col justify-between bg-black/50 text-white p-5 transition-opacity duration-300 opacity-0 pointer-events-none
    group-hover:opacity-100`,
    WRAPPER: `group relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-lg inset-shadow-2xs transition-all duration-300 ease-out`,
  },
  variants: {
    otherHovered: {
      true: {
        WRAPPER: "scale-[0.98] blur-sm",
      },
    },
  },
});

export function WorkItem({ className: C = {}, hovered, index, setHovered, work }: WorkItemProps) {
  const { BASE, IMG, INFOS, WRAPPER } = WORK_ITEM();

  return (
    <Zoom>
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={WRAPPER({ otherHovered: hovered !== null && hovered !== index, className: C.WRAPPER })}
      >
        <Img {...work.image} className={IMG({ className: C.IMG })} />
        <div className={INFOS()}>
          <h3 className="font-heading text-center text-4xl">{work.title}</h3>
          <ul className="text-base">
            <li className="flex items-center gap-2">
              <PaletteIcon className="size-4" />
              {work.media.join(", ")}
            </li>
            <li className="flex items-center gap-2">
              <ClipboardIcon className="size-4" />
              {work.material}
            </li>
          </ul>
        </div>
      </div>
    </Zoom>
  );
}

// TYPES ***********************************************************************************************************************************
export type WorkItemProps = WorkItemStyles & {
  work: Work;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
};

export type WorkItemStyles = VariantProps<typeof WORK_ITEM> & { className?: Partial<(typeof WORK_ITEM)["slots"]> };

export type WorkItemsProps = { className?: string; works: Work[] };
