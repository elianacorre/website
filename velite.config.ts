import { defineCollection, defineConfig, s } from "velite";

const images = defineCollection({
  name: "Image",
  pattern: "images.json",
  schema: s.object({
    alt: s.string(),
    created: s.coerce.date(),
    height: s.number(),
    id: s.slug("images"),
    src: s.string().transform((src) => `/images/${src}`),
    updated: s.coerce.date(),
    width: s.number(),
  }),
});

const sets = defineCollection({
  name: "Set",
  pattern: "sets.json",
  schema: s.object({
    content: s.string(),
    created: s.coerce.date(),
    id: s.slug("sets"),
    image: s.string(),
    title: s.string(),
    updated: s.coerce.date(),
  }),
});

const works = defineCollection({
  name: "Work",
  pattern: "works.json",
  schema: s.object({
    created: s.coerce.date(),
    date: s.coerce.date(),
    height: s.number(),
    id: s.slug("works"),
    image: s.string(),
    material: s.enum(["canvas", "paper"]),
    media: s.array(s.enum(["acrylic", "ink", "mixedMedia", "oil", "watercolor"])),
    set: s.string(),
    stripe: s.string(),
    title: s.string(),
    updated: s.coerce.date(),
    width: s.number(),
  }),
});

const workshops = defineCollection({
  name: "Workshop",
  pattern: "workshops.json",
  schema: s.object({
    content: s.string(),
    duration: s.string(),
    id: s.slug("workshops"),
    image: s.string(),
    place: s.string(),
    title: s.string(),
  }),
});

export default defineConfig({ collections: { images, sets, works, workshops } });
