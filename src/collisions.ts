import { MAP_ENUMS } from "./map/enums";
const firstMapJson = require("./assets/map/first-office.json");

const { data: collisionsRaw }: { data: number[] } = firstMapJson.layers.find(
  ({ name }: { name: string }) => "Collision" === name
);

if (!collisionsRaw.length) {
  throw new Error("Collision initialization failed.");
}

export const collisions: number[][] = [];

for (let i = 0; i < collisionsRaw.length; i += MAP_ENUMS.MAP_WIDTH) {
  collisions.push(collisionsRaw.slice(i, i + MAP_ENUMS.MAP_WIDTH));
}
