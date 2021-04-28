import { World } from "./types";

export const DEFAULT_WORLD: World = {
  width: 5,
  depth: 10,
  height: 7,

  players: [
    {
      x: 0,
      y: 0,
      direction: "south",
    },
  ],
  tiles: [
    { x: 3, y: 4, bricks: 1, marked: false },
    { x: 2, y: 8, bricks: 3, marked: false },
  ],
};
