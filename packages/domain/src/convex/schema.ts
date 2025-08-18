import {
	type DataModelFromSchemaDefinition,
	defineSchema,
	defineTable,
	type GenericMutationCtx,
	type GenericQueryCtx,
	type SystemTableNames,
	type TableNamesInDataModel,
} from "convex/server";
import type { GenericId } from "convex/values";
import { convexFrom } from "zod-convex";
import { zAttendeeFields, zEventFields, zImageFields, zSetFields, zSubscriptionFields, zWorkFields, zWorkshopFields } from "../schemas";

// SCHEMA **********************************************************************************************************************************
const vAttendees = convexFrom(zAttendeeFields);
const vEvents = convexFrom(zEventFields);
const vImages = convexFrom(zImageFields);
const vSets = convexFrom(zSetFields);
const vSubscriptions = convexFrom(zSubscriptionFields);
const vWorks = convexFrom(zWorkFields);
const vWorkshops = convexFrom(zWorkshopFields);

export const schema = defineSchema({
	attendees: defineTable(vAttendees),
	events: defineTable(vEvents).index("by_workshop", ["workshopId"]),
	images: defineTable(vImages).index("by_slug", ["slug"]),
	sets: defineTable(vSets).index("by_slug", ["slug"]),
	subscriptions: defineTable(vSubscriptions).index("by_attendee", ["attendeeId"]),
	works: defineTable(vWorks).index("by_slug", ["slug"]).index("by_set", ["setId"]),
	workshops: defineTable(vWorkshops).index("by_slug", ["slug"]),
});

// TYPES ***********************************************************************************************************************************
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
export type Id<TableName extends TableNames | SystemTableNames> = GenericId<TableName>;
export type TableNames = TableNamesInDataModel<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type QueryCtx = GenericQueryCtx<DataModel>;
