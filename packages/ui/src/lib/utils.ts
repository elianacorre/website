import type { Images } from "@ec/domain/schemas/images";
import { type ClassValue, clsx } from "clsx";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// TYPES ***********************************************************************************************************************************
export type RenderImage = (props: Images["Entity"] & { className: string }) => ReactNode;
