import { v } from "convex/values";

// export const vWorkshop = v.object({
//   content: v.string(),
//   duration: v.string(),
//   place: v.string(),
//   slug: v.string(),
//   title: v.string(),
// });

export const vEvent = v.object({
  date: v.string(),
  seats: v.int64(),
  workshop: v.id("workshops"),
});
