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
import { convexTableFrom } from "zod-convex";
import { zAttendeeFields, zEventFields, zImageFields, zSetFields, zSubscriptionFields, zWorkFields, zWorkshopFields } from "../schemas";

// SCHEMA **********************************************************************************************************************************
export const schema = defineSchema({
	attendees: defineTable(convexTableFrom(zAttendeeFields)),
	events: defineTable(convexTableFrom(zEventFields)).index("by_workshop", ["workshopId"]),
	images: defineTable(convexTableFrom(zImageFields)).index("by_slug", ["slug"]),
	sets: defineTable(convexTableFrom(zSetFields)).index("by_slug", ["slug"]),
	subscriptions: defineTable(convexTableFrom(zSubscriptionFields)).index("by_attendee", ["attendeeId"]),
	works: defineTable(convexTableFrom(zWorkFields)).index("by_slug", ["slug"]).index("by_set", ["setId"]),
	workshops: defineTable(convexTableFrom(zWorkshopFields)).index("by_slug", ["slug"]),
});

// TYPES ***********************************************************************************************************************************
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
export type Id<TableName extends TableNames | SystemTableNames> = GenericId<TableName>;
export type TableNames = TableNamesInDataModel<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type QueryCtx = GenericQueryCtx<DataModel>;
