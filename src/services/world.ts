import { cloneDeep } from "lodash-es";
import { Tile, World } from "../types";

export function removeEmptyTiles(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  world.tiles = world.tiles.filter(
    (tile) => tile.bricks > 0 || tile.marked || tile.cuboid
  );
  return world;
}

export function validateTile(world: World, tile: Tile) {
  if (tile.cuboid && (tile.marked || tile.bricks > 0)) {
    throw new Error("Tile with cuboid can not be marked or have bricks");
  }

  if (tile.bricks > world.height) {
    throw new Error("Brick count must be smaller than world height");
  }

  if (tile.bricks < 0) {
    throw new Error("Brick count must be positive");
  }
}
