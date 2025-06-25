"use client";

import { Heading } from "@/components/ui/heading";
import { Set } from "@/content";
import { cn, decrementActiveSetIndex, incrementActiveSetIndex, store } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useStore } from "@tanstack/react-store";
import { AnimatePresence, motion } from "motion/react";
import Img from "next/image";

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
    <section className={cn("", className)}>
      <div className="mx-auto max-w-sm px-4 py-20 antialiased md:max-w-7xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative w-full">
              <AnimatePresence>
                {sets.map((set, index) => (
                  <motion.div
                    key={set.id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 40 : sets.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 aspect-square origin-bottom"
                  >
                    <Img {...set.image} className="size-full rounded-3xl object-cover" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <motion.div
              key={activeSetIndex}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <Heading text="Collection" highlighted={sets[activeSetIndex].title} intent="secondary" />
              {/* <h3 className="text-2xl font-bold text-black">{sets[activeSetIndex].title}</h3> */}
              {/* <p className="text-sm text-gray-500 ">{sets[active].designation}</p> */}
              <motion.p className="mt-8 text-lg text-gray-500">
                {sets[activeSetIndex].content.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={decrementActiveSetIndex}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
              >
                <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12" />
              </button>
              <button
                onClick={incrementActiveSetIndex}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
              >
                <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// TYPES ***********************************************************************************************************************************
export type SetItemsProps = { className?: string; sets: Set[] };
