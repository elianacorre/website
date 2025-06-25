"use client";

import { cn } from "@/lib/utils";
import logo from "@/public/images/logo_Oxu7DFHrSV.png";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useRef, useState } from "react";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const NAVBAR = tv({
  slots: {
    ROOT: `fixed inset-x-0 top-0 z-40 w-full`,
    BODY: `relative z-60 mx-auto hidden w-full items-center justify-between rounded-full px-4 py-2 
    lg:flex`,
    ITEM: `relative px-4 py-2 text-neutral-600 hover:text-black`,
    ITEMS: `absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 
    transition duration-200 hover:text-zinc-800 
    lg:flex lg:space-x-2`,
    LOGO: `font-heading relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-4xl font-bold text-black`,
    SELECTION: `bg-accent absolute inset-0 h-full w-full rounded-full`,
  },
  variants: {
    visible: {
      true: {
        BODY: `bg-white`,
      },
    },
  },
});

const { BODY, ITEM, ITEMS, LOGO, ROOT, SELECTION } = NAVBAR();

// ROOT ************************************************************************************************************************************
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 1));

  return (
    <motion.div ref={ref} className={ROOT({ className })}>
      {Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child as ReactElement<{ visible?: boolean }>, { visible }) : child,
      )}
    </motion.div>
  );
};

// BODY ************************************************************************************************************************************
export const NavbarBody = ({ children, className, visible }: NavbarBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "800px" }}
      className={BODY({ visible, className })}
    >
      {children}
    </motion.div>
  );
};

// ITEMS ***********************************************************************************************************************************
export const NavbarItems = ({ items, className, onItemClick }: NavbarItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div onMouseLeave={() => setHovered(null)} className={ITEMS({ className })}>
      {items.map((item, idx) => (
        <a onMouseEnter={() => setHovered(idx)} onClick={onItemClick} className={ITEM()} key={`link-${idx}`} href={item.link}>
          {hovered === idx && <motion.div layoutId="hovered" className={SELECTION()} />}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

// LOGO ************************************************************************************************************************************
export const NavbarLogo = () => {
  return (
    <Link href="/" className="relative h-10 w-40">
      <Image src={logo} alt="Eliana Corré" className="absolute top-0 left-0 w-full" />
    </Link>
  );
};

// MOBILENAV *******************************************************************************************************************************
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

// MOBILE NAV HEADER ***********************************************************************************************************************
export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>;
};

// MOBILE NAV MENU *************************************************************************************************************************
export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// MOBILE NAV TOGGLE ***********************************************************************************************************************
export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return isOpen ? <IconX className="text-black" onClick={onClick} /> : <IconMenu2 className="text-black" onClick={onClick} />;
};

// TYPES ***********************************************************************************************************************************
interface MobileNavProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

interface NavbarBodyProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavbarItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}
