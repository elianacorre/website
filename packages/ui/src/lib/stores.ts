import type { TableNames } from "@ec/domain/convex/schema";
import type { For } from "@ec/domain/index";
import { Derived, Store, useStore } from "@tanstack/react-store";

// PUBLIC **********************************************************************************************************************************
export type PublicState = { activeSetId?: string; headerHoveredId?: string; isScrolled: boolean };

export const publicStore = new Store<PublicState>({ activeSetId: undefined, headerHoveredId: undefined, isScrolled: false });

export const noneHoveredStore = new Derived({
	fn: () => publicStore.state.headerHoveredId === undefined,
	deps: [publicStore],
});

export function setHeaderHoveredId(id?: string) {
	publicStore.setState((state) => ({ ...state, headerHoveredId: id }));
}

export function setIsScrolled(isScrolled: boolean) {
	publicStore.setState((state) => ({ ...state, isScrolled }));
}

export function updateActiveSetIndex(index: number) {
	publicStore.setState((state) => ({ ...state, activeSetIndex: index }));
}

export function incrementActiveSetIndex() {
	// updateActiveSetIndex((publicStore.state.activeSetIndex + 1) % sets.length);
}

export function decrementActiveSetIndex() {
	// updateActiveSetIndex((publicStore.state.activeSetIndex - 1 + sets.length) % sets.length);
}

// ADMIN **********************************************************************************************************************************
export const adminStore = new Store<State>({
	attendees: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
	events: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
	images: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
	sets: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
	subscriptions: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
	works: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
	workshops: {
		confirmDeleteOpen: false,
		selected: undefined,
		upsertOpen: false,
	},
});

export const closeConfirmDelete = <T extends TableNames>(table: T) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], confirmDeleteOpen: false } }));

export const closeUpsert = <T extends TableNames>(table: T) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], upsertOpen: false } }));

export const openConfirmDelete = <T extends TableNames>(table: T, selected?: For<T>["Draft"]) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], selected, confirmDeleteOpen: true } }));

export const openUpsert = <T extends TableNames>(table: T, selected?: For<T>["Draft"]) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], selected, upsertOpen: true } }));

export const setConfirmDeleteOpen = <T extends TableNames>(table: T, confirmDeleteOpen: boolean) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], confirmDeleteOpen } }));

export const setUpsertOpen = <T extends TableNames>(table: T, upsertOpen: boolean) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], upsertOpen } }));

export const setSelected = <T extends TableNames>(table: T, selected?: For<T>["Draft"]) =>
	adminStore.setState((state) => ({ ...state, [table]: { ...state[table], selected } }));

export const useCollection = <T extends TableNames>(table: T) => useStore(adminStore, (state) => state[table]);

export type DraftState<T extends TableNames> = {
	confirmDeleteOpen: boolean;
	selected: For<T>["Draft"] | undefined;
	upsertOpen: boolean;
};

export type State = {
	attendees: DraftState<"attendees">;
	events: DraftState<"events">;
	images: DraftState<"images">;
	sets: DraftState<"sets">;
	subscriptions: DraftState<"subscriptions">;
	works: DraftState<"works">;
	workshops: DraftState<"workshops">;
};
