/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as attendees from "../attendees.js";
import type * as events from "../events.js";
import type * as images from "../images.js";
import type * as layouts from "../layouts.js";
import type * as pages from "../pages.js";
import type * as sets from "../sets.js";
import type * as subscriptions from "../subscriptions.js";
import type * as works from "../works.js";
import type * as workshops from "../workshops.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  attendees: typeof attendees;
  events: typeof events;
  images: typeof images;
  layouts: typeof layouts;
  pages: typeof pages;
  sets: typeof sets;
  subscriptions: typeof subscriptions;
  works: typeof works;
  workshops: typeof workshops;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
