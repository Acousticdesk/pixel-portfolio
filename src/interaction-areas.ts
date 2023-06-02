// the interaction-area layer exported from Tiled as is
import { MAP_ENUMS } from "./map/enums";
const firstMapJson = require("./assets/map/first-office.json");

let interactionAreasRaw: number[] = [];

[
  "Forum Area",
  "Computer 1 Interaction Area",
  "Computer 2 Interaction Area",
  "NPC 2 Interaction Area",
  "NPC 3 Interaction Area",
  "Bookshelf 1 Interaction Area",
].forEach((layerName) => {
  const { data }: { data: number[] } = firstMapJson.layers.find(
    ({ name }: { name: string }) => layerName === name
  );

  if (!interactionAreasRaw.length) {
    interactionAreasRaw = data;
    return;
  }

  for (let i = 0; i < data.length; i += 1) {
    if (!interactionAreasRaw[i]) {
      interactionAreasRaw[i] = data[i];
    }
  }
});

if (!interactionAreasRaw.length) {
  throw new Error("Interaction Area initialization failed.");
}

export const interactionAreas: number[][] = [];

for (let i = 0; i < interactionAreasRaw.length; i += MAP_ENUMS.MAP_WIDTH) {
  interactionAreas.push(interactionAreasRaw.slice(i, i + MAP_ENUMS.MAP_WIDTH));
}
