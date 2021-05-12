import { cloneDeep } from "lodash";
import { DEFAULT_WORLD } from "../constants";
import { Direction, World } from "../types";
import { isWall } from "./conditions";
import { getPositionInFront, getTile, isInWorld, updateTile } from "./util";

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

export function step(worldOrg: World, count = 1): World {
  const world = cloneDeep(worldOrg);

  const newPosition = getPositionInFront(world, count);
  // TODO: check step by step whether: 1. the tile is a cuboid. 2. the brick stack is not too high
  if (!isInWorld(world, newPosition)) {
    throw new Error(`Cannot walk ${count} step(s). The world is too small.`);
  }

  world.player = { ...world.player, ...newPosition };
  return world;
}

export function putBrick(worldOrg: World, count = 1): World {
  const world = cloneDeep(worldOrg);
  if (isWall(world)) {
    throw new Error("Cannot pick up brick. Karel is looking at a wall.");
  }

  const brickPosition = getPositionInFront(world);

  const tileOrg = getTile(world, brickPosition);
  const tile = cloneDeep(tileOrg);
  if (tile.cuboid) {
    throw new Error("Cannot put brick on cuboid.");
  }

  if (tile.bricks + count > world.height) {
    throw new Error("Cannot put bricks. The stack is too high.");
  }
  tile.bricks += count;
  return updateTile(world, tile);
}

export function pickUpBrick(worldOrg: World, count = 1): World {
  const world = cloneDeep(worldOrg);
  if (isWall(world)) {
    throw new Error("Cannot pick up brick. Karel is looking at a wall.");
  }

  const brickPosition = getPositionInFront(world);

  const tileOrg = getTile(world, brickPosition);
  const tile = cloneDeep(tileOrg);
  if (tile.cuboid) {
    throw new Error("Cannot pick up brick from cuboid.");
  }

  if (tile.bricks - count < 0) {
    throw new Error("Cannot pick up bricks. Not enough bricks to pick up.");
  }
  tile.bricks -= count;
  return updateTile(world, tile);
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
