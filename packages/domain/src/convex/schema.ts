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
export const schema = defineSchema({
	attendees: defineTable(convexFrom(zAttendeeFields)),
	events: defineTable(convexFrom(zEventFields)).index("by_workshop", ["workshopId"]),
	images: defineTable(convexFrom(zImageFields)).index("by_slug", ["slug"]),
	sets: defineTable(convexFrom(zSetFields)).index("by_slug", ["slug"]),
	subscriptions: defineTable(convexFrom(zSubscriptionFields)).index("by_attendee", ["attendeeId"]),
	workshops: defineTable(convexFrom(zWorkshopFields)).index("by_slug", ["slug"]),
	works: defineTable(convexFrom(zWorkFields)).index("by_slug", ["slug"]).index("by_set", ["setId"]),
});

// TYPES ***********************************************************************************************************************************
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
export type Id<TableName extends TableNames | SystemTableNames> = GenericId<TableName>;
export type TableNames = TableNamesInDataModel<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type QueryCtx = GenericQueryCtx<DataModel>;
