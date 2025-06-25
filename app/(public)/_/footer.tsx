import { cn } from "@/lib/utils";
import Link from "next/link";

// ROOT ************************************************************************************************************************************
export function Footer({ className }: FooterProps) {
  return (
    <section className={cn("relative flex justify-between bg-neutral-700 p-4 text-white", className)}>
      <span>© 2025 Eliana Corré</span>
      <Link href="#">Mentions légales</Link>
    </section>
  );
}

// TYPE ************************************************************************************************************************************
export type FooterProps = { className?: string };
