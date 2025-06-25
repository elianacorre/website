"use client";

import { sets } from "@/.velite";
import { Work } from "@/content";
import { cn, store } from "@/lib/utils";
import { useStore } from "@tanstack/react-store";
import { PropsWithChildren, useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import { GridBackground } from "./grid-background";

// STYLES **********************************************************************************************************************************

// ROOT ************************************************************************************************************************************
export function FocusCards({ children, className, works }: FocusCardsProps) {
  const activeSetIndex = useStore(store, ({ activeSetIndex }) => activeSetIndex);
  const [hovered, setHovered] = useState<number | null>(null);

  const filteredWorks = works.filter((work) => work.set.id === sets[activeSetIndex].id);

  return (
    <div className={cn("relative container mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:px-8", className)}>
      <GridBackground />
      {children}
      {filteredWorks.map((work, i) => (
        <WorksItem key={work.id} work={work} index={i} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type FocusCardsProps = PropsWithChildren<{ className?: string; works: Work[] }>;
