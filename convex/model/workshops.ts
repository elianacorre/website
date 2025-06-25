// import type workshops from "@/content/workshops.json";
// import { kebabCase } from "es-toolkit";
// import type { Doc } from "../_generated/dataModel";
// import type { QueryCtx } from "../_generated/server";

// QUERIES *********************************************************************************************************************************
// export async function readWorkshop({ db }: QueryCtx, { slug }: { slug: string }) {
//   const entry = await db
//     .query("workshops")
//     .withIndex("by_slug", (q) => q.eq("slug", slug))
//     .unique();
//   if (!entry) throw new Error(`Workshop ${slug} not found`);
//   return workshopFromEntry(entry);
// }

// export async function readWorkshops({ db }: QueryCtx) {
//   const entries = await db.query("workshops").collect();
//   return entries.map(workshopFromEntry);
// }

// UTILS ***********************************************************************************************************************************
// export function entryFromContent(content: (typeof workshops)[number]) {
//   return { ...content, slug: kebabCase(content.title) };
// }

// export function workshopFromEntry(entry: Doc<"workshops">) {
//   return { ...entry, to: `/ateliers/${entry.slug}` };
// }

// TYPES ***********************************************************************************************************************************
// export type Workshop = ReturnType<typeof workshopFromEntry>;
