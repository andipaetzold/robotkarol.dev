import { World } from "./types";

export const DEFAULT_WORLD: World = {
  width: 5,
  depth: 10,
  height: 6,

  player: {
    x: 0,
    y: 0,
    direction: "south",
  },

  tiles: [],
};
