import { cloneDeep } from "lodash";
import { DEFAULT_WORLD } from "../constants";
import { Direction, World } from "../types";
import { Settings } from "./store/types";
import {
  getPositionInFront,
  getTile,
  isEqualPosition,
  isInWorld,
  updateTile,
} from "./util";

/**
 * Ordered clockwise
 */
const DIRECTIONS: Direction[] = ["north", "east", "south", "west"];

export function turnRight(worldOrg: World): World {
  const world = cloneDeep(worldOrg);

  const directionIndex = DIRECTIONS.findIndex(
    (direction) => direction === world.player.direction
  );
  world.player.direction = DIRECTIONS[(directionIndex + 1) % DIRECTIONS.length];

  return world;
}

export function turnLeft(worldOrg: World): World {
  const world = cloneDeep(worldOrg);

  const directionIndex = DIRECTIONS.findIndex(
    (direction) => direction === world.player.direction
  );
  world.player.direction =
    DIRECTIONS[(directionIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length];

  return world;
}

export function step(worldOrg: World, settings: Settings): World {
  const world = cloneDeep(worldOrg);

  const newPosition = getPositionInFront(world);
  if (!isInWorld(world, newPosition)) {
    throw new Error("Cannot make step. The world is too small.");
  }

  if (settings.jumpHeight !== undefined) {
    const bricksBefore =
      world.tiles.find((t) => isEqualPosition(t, world.player))?.bricks ?? 0;
    const bricksAfter =
      world.tiles.find((t) => isEqualPosition(t, newPosition))?.bricks ?? 0;
    const diff = Math.abs(bricksBefore - bricksAfter);
    if (diff > settings.jumpHeight) {
      throw new Error("Cannot make step. Brick height difference is too big.");
    }
  }

  world.player = { ...world.player, ...newPosition };
  return world;
}

export function setMarker(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  const tileOrg = getTile(world, world.player);
  const tile = cloneDeep(tileOrg);
  tile.marked = true;
  return updateTile(world, tile);
}

export function removeMarker(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  const tileOrg = getTile(world, world.player);
  const tile = cloneDeep(tileOrg);
  tile.marked = false;
  return updateTile(world, tile);
}

export function toggleMarker(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  const tileOrg = getTile(world, world.player);
  const tile = cloneDeep(tileOrg);
  tile.marked = !tile.marked;
  return updateTile(world, tile);
}

export function reset(world: World): World {
  return {
    ...DEFAULT_WORLD,
    depth: world.depth,
    height: world.height,
    width: world.width,
  };
}

export function resize(
  world: World,
  size: Pick<World, "depth" | "width" | "height">
): World {
  return {
    ...world,
    player: {
      ...world.player,
      x: Math.min(world.width - 1, world.player.x),
      y: Math.min(world.depth - 1, world.player.y),
    },
    tiles: world.tiles.filter((tile) => isInWorld(size, tile)),
    depth: size.depth,
    height: size.height,
    width: size.width,
  };
}
