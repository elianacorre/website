import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { Image } from "@unpic/react";
import { cva } from "class-variance-authority";
import { motion, type Transition, useMotionValueEvent, useScroll } from "motion/react";
import { type PropsWithChildren, useCallback } from "react";
import type { ReadRootLayoutProps } from "@/functions/layouts";
import { setHeaderHoveredId, setIsScrolled, store } from "@/lib/store";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const HEADER = {
  base: cva("fixed z-50", { variants: { isScrolled: { false: "inset-x-0 top-0", true: "inset-x-4 top-5 md:inset-x-20" } } }),
  burger: cva(`relative p-2 
    sm:hidden`),
  content: cva(
    `relative mx-auto flex w-full items-center justify-between rounded-full px-4 py-2 
    transition-[box-shadow,background-color] duration-1000
    xl:container`,
    { variants: { isScrolled: { false: "bg-transparent", true: "bg-white shadow-header" } } }
  ),
  icon: cva("flex size-7"),
  icons: cva("flex"),
  logo: cva("relative h-10 w-16 cursor-pointer"),
  logoContent: cva("absolute -top-3 -left-3", {
    variants: { isScrolled: { false: "w-20 sm:w-24 md:w-40", true: "w-16 sm:w-16 md:w-16" } },
  }),
  nav: cva("relative cursor-pointer px-4 py-2"),
  navs: cva(`hidden items-center justify-center gap-2 font-bold text-black 
    sm:flex`),
  social: cva("relative p-2"),
  socials: cva("flex items-center"),
  stain: cva("absolute inset-0 size-full rounded-full", {
    variants: { intent: { primary: "bg-primary/40", secondary: "bg-accent" } },
    defaultVariants: { intent: "secondary" },
  }),
  stainContent: cva("relative z-10"),
};

// TRANSITIONS -----------------------------------------------------------------------------------------------------------------------------
const defaultTransition: Transition = { type: "spring", stiffness: 200, damping: 50 };
export const HEADER_T = { base: defaultTransition, content: defaultTransition, logoContent: defaultTransition };

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function Header({ logoImg, navs, socials }: HeaderProps) {
  const { scrollY } = useScroll();
  const isScrolled = useStore(store, (state) => state.isScrolled);

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 1));

  const handleOnMouseLeave = useCallback(() => setHeaderHoveredId(), []);

  return (
    <motion.header className={HEADER.base({ isScrolled })} layoutRoot transition={HEADER_T.base}>
      <motion.div className={HEADER.content({ isScrolled })} layout onMouseLeave={handleOnMouseLeave} transition={HEADER_T.content}>
        <Link to="/">
          <HeaderLogo>
            <Image
              {...logoImg}
              background="transparent"
              breakpoints={[80, 96, 160, 192, 320]}
              sizes="(min-width: 768px) 160px, (min-width: 640px) 96px, 80px"
            />
          </HeaderLogo>
        </Link>
        <div className={HEADER.navs()}>
          {navs.map((nav) => (
            <Link {...nav} key={nav.key}>
              {({ isActive }) => <HeaderNav isActive={isActive} nav={nav} />}
            </Link>
          ))}
        </div>
        <div className={HEADER.icons()}>
          <div className={HEADER.socials()}>
            {socials.map((social) => (
              <HeaderSocial key={social.key} social={social} />
            ))}
          </div>
          {/* <Sheet>
						<SheetTrigger
							onMouseEnter={() => setHeaderHoveredId("menu")}
							onClick={() => setHeaderHoveredId(undefined)}
							className={BURGER()}
						>
							{headerHoveredId === "menu" && <motion.div layoutId="hovered" className={STAIN({ intent: "primary" })} />}
							<MenuIcon className={STAIN_CONTENT()} />
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Are you absolutely sure?</SheetTitle>
								<SheetDescription>
									This action cannot be undone. This will permanently delete your account and remove your data from our servers.
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet> */}
        </div>
      </motion.div>
    </motion.header>
  );
}
export type HeaderProps = ReadRootLayoutProps;

// LOGO ------------------------------------------------------------------------------------------------------------------------------------
export function HeaderLogo({ children }: HeaderLogoProps) {
  const isScrolled = useStore(store, (state) => state.isScrolled);

  return (
    <button className={HEADER.logo()} type="button">
      <motion.div className={HEADER.logoContent({ isScrolled })} layout transition={HEADER_T.logoContent}>
        {children}
      </motion.div>
    </button>
  );
}
export type HeaderLogoProps = PropsWithChildren;

// NAV -------------------------------------------------------------------------------------------------------------------------------------
export function HeaderNav({ isActive, nav }: HeaderNavProps) {
  const { key, text } = nav;
  const isVisible = useStore(store, ({ headerHoveredId }) => headerHoveredId === key || (!headerHoveredId && isActive));

  const handleOnMouseEnter = useCallback(() => setHeaderHoveredId(key), [key]);

  return (
    <button className={HEADER.nav()} onMouseEnter={handleOnMouseEnter} type="button">
      {isVisible ? <motion.div className={HEADER.stain()} layoutId="hovered" /> : null}
      <span className={HEADER.stainContent()}>{text}</span>
    </button>
  );
}
export type HeaderNavProps = { isActive: boolean; nav: HeaderProps["navs"][number] };

// SOCIAL ----------------------------------------------------------------------------------------------------------------------------------
export function HeaderSocial({ social }: HeaderSocialProps) {
  const { href, icon, key, text } = social;
  const isHovered = useStore(store, ({ headerHoveredId }) => headerHoveredId === key);

  const handleOnMouseEnter = useCallback(() => setHeaderHoveredId(key), [key]);

  return (
    <a aria-label={text} className={HEADER.social()} href={href} key={key} onMouseEnter={handleOnMouseEnter}>
      {isHovered ? <motion.div className={HEADER.stain({ intent: "primary" })} layoutId="hovered" /> : null}
      <span className={HEADER.stainContent()}>
        <span className={HEADER.icon({ className: icon })} />
      </span>
    </a>
  );
}
export type HeaderSocialProps = { social: HeaderProps["socials"][number] };
