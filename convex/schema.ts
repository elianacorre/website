import { defineSchema, defineTable } from "convex/server";
import { vEvent } from "./model";

export default defineSchema({
  // workshops: defineTable(vWorkshop).index("by_slug", ["slug"]),
  events: defineTable(vEvent),
});
