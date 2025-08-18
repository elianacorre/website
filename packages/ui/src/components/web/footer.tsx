import { cn } from "@ec/ui/lib/utils";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function Footer({ children, className }: FooterProps) {
	return (
		<section className={cn("relative flex justify-between bg-neutral-700 p-4 text-white", className)}>
			<span>© 2025 Eliana Corré</span>
			{children}
		</section>
	);
}

// TYPE ************************************************************************************************************************************
export type FooterProps = PropsWithChildren<{ className?: string }>;
