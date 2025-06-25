"use client";

import { Button } from "@/components/ui/button";
import { Section, SECTION_CONTENT, SECTION_MAIN, SectionTitle } from "@/components/ui/section";
import { Set } from "@/content";
import { decrementActiveSetIndex, incrementActiveSetIndex, store } from "@/lib/utils";
import { useStore } from "@tanstack/react-store";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Img from "next/image";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const S = tv({
  slots: {
    IMAGE: ``,
  },
  variants: {
    active: {
      true: { IMAGE: `opacity-100 scale-100 z-0` },
      false: { IMAGE: `opacity-70 scale-95 -z-10` },
    },
  },
});

// ROOT ************************************************************************************************************************************
export function SetItems({ className, sets }: SetItemsProps) {
  const activeSetIndex = useStore(store, ({ activeSetIndex }) => activeSetIndex);

  const isActive = (index: number) => {
    return index === activeSetIndex;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <Section intent="secondary" className={{ CONTAINER: "lg:items-stretch lg:gap-20" }}>
      <aside className="relative hidden aspect-square w-full basis-1/3 lg:flex">
        <AnimatePresence>
          {sets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
              animate={
                isActive(index)
                  ? { opacity: 1, scale: 1, y: [0, -80, 0], z: 0, rotate: 0, zIndex: 40 }
                  : { opacity: 0.7, scale: 0.95, y: 0, z: -100, rotate: randomRotateY(), zIndex: sets.length + 2 - index }
              }
              exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 aspect-square origin-bottom"
            >
              <Img {...set.image} className="size-full rounded-3xl object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>
      </aside>
      <main className={SECTION_MAIN({ className: "basis-2/3 justify-between" })}>
        <motion.div
          key={activeSetIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="space-y-8"
        >
          <SectionTitle
            title={["Collection", sets[activeSetIndex].title]}
            intent="secondary"
            className={{ EFFECT: { BASE: "text-2xl sm:text-4xl 2xl:text-5xl" } }}
          />
          <p className={SECTION_CONTENT()}>{sets[activeSetIndex].content}</p>
        </motion.div>
        <div className="flex w-full justify-between">
          <Button intent="secondary" reverse icon={<ChevronLeft className="size-5" />} onClick={decrementActiveSetIndex}>
            Précédente
          </Button>
          <Button intent="secondary" onClick={incrementActiveSetIndex}>
            Suivante
          </Button>
        </div>
      </main>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type SetItemsProps = { className?: string; sets: Set[] };
