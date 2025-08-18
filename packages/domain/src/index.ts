import type { TableNames } from "./convex";
import {
	type Attendees,
	type Events,
	type Images,
	type Sets,
	type Subscriptions,
	type Works,
	type Workshops,
	zAttendeeCreate,
	zAttendeeRemove,
	zAttendeeUpdate,
	zEventCreate,
	zEventRemove,
	zEventUpdate,
	zImageCreate,
	zImageRemove,
	zImageUpdate,
	zSetCreate,
	zSetRemove,
	zSetUpdate,
	zSubscriptionCreate,
	zSubscriptionRemove,
	zSubscriptionUpdate,
	zWorkCreate,
	zWorkRemove,
	zWorkshopCreate,
	zWorkshopRemove,
	zWorkshopUpdate,
	zWorkUpdate,
} from "./schemas";
import { attendeeFrom, attendeeUpdateValuesFrom } from "./utils/attendees";
import { eventFrom, eventUpdateValuesFrom } from "./utils/events";
import { imageFrom, imageUpdateValuesFrom } from "./utils/images";
import { setFrom, setUpdateValuesFrom } from "./utils/sets";
import { subscriptionFrom, subscriptionUpdateValuesFrom } from "./utils/subscriptions";
import { workFrom, workUpdateValuesFrom } from "./utils/works";
import { workshopFrom, workshopUpdateValuesFrom } from "./utils/workshops";

export const collections = {
	attendees: {
		zCreate: zAttendeeCreate,
		zRemove: zAttendeeRemove,
		zUpdate: zAttendeeUpdate,
		entityFrom: attendeeFrom,
		updateValuesFrom: attendeeUpdateValuesFrom,
	},
	events: {
		zCreate: zEventCreate,
		zRemove: zEventRemove,
		zUpdate: zEventUpdate,
		entityFrom: eventFrom,
		updateValuesFrom: eventUpdateValuesFrom,
	},
	images: {
		zCreate: zImageCreate,
		zRemove: zImageRemove,
		zUpdate: zImageUpdate,
		entityFrom: imageFrom,
		updateValuesFrom: imageUpdateValuesFrom,
	},
	sets: {
		zCreate: zSetCreate,
		zRemove: zSetRemove,
		zUpdate: zSetUpdate,
		entityFrom: setFrom,
		updateValuesFrom: setUpdateValuesFrom,
	},
	subscriptions: {
		zCreate: zSubscriptionCreate,
		zRemove: zSubscriptionRemove,
		zUpdate: zSubscriptionUpdate,
		entityFrom: subscriptionFrom,
		updateValuesFrom: subscriptionUpdateValuesFrom,
	},
	works: {
		zCreate: zWorkCreate,
		zRemove: zWorkRemove,
		zUpdate: zWorkUpdate,
		entityFrom: workFrom,
		updateValuesFrom: workUpdateValuesFrom,
	},
	workshops: {
		zCreate: zWorkshopCreate,
		zRemove: zWorkshopRemove,
		zUpdate: zWorkshopUpdate,
		entityFrom: workshopFrom,
		updateValuesFrom: workshopUpdateValuesFrom,
	},
} as const;

export type Collections = { [T in TableNames]: Collection<T> };

export type Collection<T extends TableNames> = {
	entityFrom: (entry: For<T>["Entry"]) => For<T>["Entity"];
	updateValuesFrom: (entity: For<T>["Draft"]) => For<T>["UpdateValuesI"];
	zCreate: For<T>["ZCreate"];
	zRemove: For<T>["ZRemove"];
	zUpdate: For<T>["ZUpdate"];
};

export type For<T extends TableNames> = [T] extends ["attendees"]
	? Attendees
	: [T] extends ["events"]
		? Events
		: [T] extends ["images"]
			? Images
			: [T] extends ["sets"]
				? Sets
				: [T] extends ["subscriptions"]
					? Subscriptions
					: [T] extends ["works"]
						? Works
						: [T] extends ["workshops"]
							? Workshops
							: never;
