import { sets } from "@/.velite";
import { Store } from "@tanstack/react-store";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// STORE ***********************************************************************************************************************************
export const store = new Store({ activeSetIndex: 0, isScrolled: false });

export function updateActiveSetIndex(index: number) {
  store.setState((state) => ({ ...state, activeSetIndex: index }));
}

export function incrementActiveSetIndex() {
  updateActiveSetIndex((store.state.activeSetIndex + 1) % sets.length);
}

export function decrementActiveSetIndex() {
  updateActiveSetIndex((store.state.activeSetIndex - 1 + sets.length) % sets.length);
}

// STYLES **********************************************************************************************************************************
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
