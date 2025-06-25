import { images, type Set as SetEntry, sets, type Work as WorkEntry, works, type Workshop as WorkshopEntry, workshops } from "@/.velite";

// IMAGE ***********************************************************************************************************************************
export function getImage(id: string) {
  return images.find((image) => image.id === id);
}

export function ensureImage(id: string) {
  const image = getImage(id);
  if (!image) throw new Error(`Image ${id} not found`);
  return image;
}

// SET *************************************************************************************************************************************
export function setFromEntry(entry: SetEntry) {
  const image = getImage(entry.image);
  if (!image) throw new Error(`Image ${entry.image} not found`);
  return { ...entry, image };
}

export function getSet(id: string) {
  const set = sets.find((set) => set.id === id);
  return set ? setFromEntry(set) : undefined;
}

export function getSets() {
  return sets.map(setFromEntry);
}

// WORK ************************************************************************************************************************************
const i18n = {
  materials: {
    canvas: "toile",
    paper: "papier",
  },
  medias: {
    acrylic: "acrylique",
    ink: "encre",
    mixedMedia: "techniques mixtes",
    oil: "huile",
    watercolor: "aquarelle",
  },
} as const;

export function workFromEntry(entry: WorkEntry) {
  const image = getImage(entry.image);
  if (!image) throw new Error(`Image ${entry.image} not found`);
  const set = getSet(entry.set);
  if (!set) throw new Error(`Set ${entry.set} not found`);
  return { ...entry, image, material: i18n.materials[entry.material], media: entry.media.map((media) => i18n.medias[media]), set };
}

export function getWorks() {
  return works.map(workFromEntry);
}

// WORKSHOP ********************************************************************************************************************************
export function getWorkshops() {
  return workshops.map(workshopFromEntry);
}

export function workshopFromEntry(entry: WorkshopEntry) {
  const image = getImage(entry.image);
  if (!image) throw new Error(`Image ${entry.image} not found`);
  return { ...entry, image };
}

// TYPES ***********************************************************************************************************************************
export type Set = ReturnType<typeof setFromEntry>;
export type Work = ReturnType<typeof workFromEntry>;
export type Workshop = ReturnType<typeof workshopFromEntry>;
export type { Image } from "@/.velite";
