import { defineSchema, defineTable } from "convex/server";
import { zodOutputToConvex } from "convex-helpers/server/zod4";
import { zContactFields } from "@/lib/domain";

export default defineSchema({
  contacts: defineTable(zodOutputToConvex(zContactFields)),
});
