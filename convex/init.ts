// import workshops from "@/content/workshops.json";
import { internalMutation } from "./_generated/server";
// import { entryFromContent } from "./model/workshops";

export default internalMutation({
  handler: async ({ db }) => {
    // const anyWorkshop = await db.query("workshops").first();
    // if (!anyWorkshop) await Promise.all(workshops.map(async (workshop) => db.insert("workshops", entryFromContent(workshop))));
  },
});
