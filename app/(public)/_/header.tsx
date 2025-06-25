"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ensureImage } from "@/content";
import { store } from "@/lib/utils";
import { SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";
import { IconMenu2 } from "@tabler/icons-react";
import { useStore } from "@tanstack/react-store";
import { motion, useMotionValueEvent, useScroll, type Transition } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { tv } from "tailwind-variants";

// DATA ************************************************************************************************************************************
const navs = [
  { id: "qui-suis-je", text: "Qui suis-je?", href: "/qui-suis-je" },
  { id: "cours", text: "Cours", href: "/cours" },
  { id: "ateliers", text: "Ateliers", href: "/ateliers" },
  { id: "oeuvres", text: "Œuvres", href: "/oeuvres" },
];

const socials = [
  { id: "instagram", text: "Instagram", Icon: SiInstagram, href: "/" },
  { id: "youtube", text: "Youtube", Icon: SiYoutube, href: "/" },
];

// STYLES **********************************************************************************************************************************
const t: Transition = { type: "spring", stiffness: 200, damping: 50 };

const HEADER = tv({
  slots: {
    BASE: `fixed inset-x-0 top-0 z-50`,
    BURGER: `sm:hidden relative p-2`,
    CONTENT: `w-full mx-auto flex relative items-center justify-between rounded-full px-4 py-2 bg-[rgba(255,255,255,0)]
    xl:container`,
    ICONS: `flex`,
    LOGO: `relative h-10 w-16`,
    LOGO_CONTENT: `absolute -top-3 -left-3 w-20 sm:w-24 md:w-40`,
    NAV: `relative px-4 py-2`,
    NAVS: `hidden items-center justify-center gap-2 font-bold text-black sm:flex`,
    SOCIAL: `relative p-2`,
    SOCIALS: `flex items-center`,
    STAIN: `absolute inset-0 size-full rounded-full`,
    STAIN_CONTENT: `relative z-10`,
  },
  variants: {
    isScrolled: {
      true: {
        BASE: `inset-x-4 top-5 md:inset-x-20`,
        // CONTENT: `max-w-3xl`,
        LOGO_CONTENT: `w-16 sm:w-16 md:w-16`,
      },
    },
    intent: {
      primary: { STAIN: `bg-primary/40` },
      secondary: { STAIN: `bg-accent` },
    },
  },
  defaultVariants: { intent: "secondary" },
});

const contentVariants = {
  scrolled: {
    backgroundColor: "rgba(255,255,255,1)",
    boxShadow:
      "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
  },
};

// ROOT ************************************************************************************************************************************
export function Header({ className }: HeaderProps) {
  const { BASE, BURGER, CONTENT, ICONS, LOGO, LOGO_CONTENT, NAV, NAVS, SOCIAL, SOCIALS, STAIN, STAIN_CONTENT } = HEADER();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isScrolled = useStore(store, ({ isScrolled }) => isScrolled);
  const [hovered, setHovered] = useState<string | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (latest) => store.setState((state) => ({ ...state, isScrolled: latest > 1 })));

  return (
    <motion.header layoutRoot transition={t} className={BASE({ className, isScrolled })}>
      <motion.div
        layout
        transition={t}
        className={CONTENT({ isScrolled })}
        onMouseLeave={() => setHovered(undefined)}
        variants={contentVariants}
        animate={isScrolled ? "scrolled" : "top"}
      >
        <Link href="/" className={LOGO()}>
          <motion.div layout transition={t} className={LOGO_CONTENT({ isScrolled })}>
            <Image {...ensureImage("logo")} />
          </motion.div>
        </Link>
        <div className={NAVS()}>
          {navs.map(({ href, id, text }) => (
            <Link key={id} href={href} onMouseEnter={() => setHovered(id)} className={NAV()}>
              {(hovered === id || (!hovered && pathname === href)) && <motion.div layoutId="hovered" className={STAIN()} />}
              <span className={STAIN_CONTENT()}>{text}</span>
            </Link>
          ))}
        </div>
        <div className={ICONS()}>
          <div className={SOCIALS()}>
            {socials.map(({ href, Icon, id, text }) => (
              <a key={id} href={href} onMouseEnter={() => setHovered(id)} className={SOCIAL()}>
                {hovered === id && <motion.div layoutId="hovered" className={STAIN({ intent: "primary" })} />}
                <Icon className={STAIN_CONTENT()} />
              </a>
            ))}
          </div>
          <Sheet>
            <SheetTrigger onMouseEnter={() => setHovered("menu")} onClick={() => setHovered(undefined)} className={BURGER()}>
              {hovered === "menu" && <motion.div layoutId="hovered" className={STAIN({ intent: "primary" })} />}
              <IconMenu2 className={STAIN_CONTENT()} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  );
}

// TYPES ***********************************************************************************************************************************
export type HeaderProps = { className?: string };
