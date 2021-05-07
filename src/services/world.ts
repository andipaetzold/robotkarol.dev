import { cloneDeep } from "lodash";
import { World } from "../types";

export function removeEmptyTiles(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  world.tiles = world.tiles.filter((tile) => tile.bricks > 0 || tile.marked);
  return world;
}
