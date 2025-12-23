import { Derived, Store } from "@tanstack/react-store";

// STORES ----------------------------------------------------------------------------------------------------------------------------------
export const store = new Store<State>({ activeSetId: undefined, headerHoveredId: undefined, isScrolled: false });

export const noneHoveredStore = new Derived({
  fn: () => store.state.headerHoveredId === undefined,
  deps: [store],
});

// METHODS ---------------------------------------------------------------------------------------------------------------------------------
export function setHeaderHoveredId(id?: string) {
  store.setState((state) => ({ ...state, headerHoveredId: id }));
}

export function setIsScrolled(isScrolled: boolean) {
  store.setState((state) => ({ ...state, isScrolled }));
}

export function updateActiveSetIndex(index: number) {
  store.setState((state) => ({ ...state, activeSetIndex: index }));
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type State = { activeSetId?: string; headerHoveredId?: string; isScrolled: boolean };
