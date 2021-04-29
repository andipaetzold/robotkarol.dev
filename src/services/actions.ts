import { cloneDeep } from "lodash";
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
  if (!isInWorld(world, newPosition)) {
    throw new Error(`Cannot walk ${count} step(s). The world is too small`);
  }

  world.player = { ...world.player, ...newPosition };
  return world;
}

export function putBrick(worldOrg: World, count = 1): World {
  const world = cloneDeep(worldOrg);
  if (isWall(world)) {
    throw new Error("Cannot pick up brick. Karel is looking at a wall");
  }

  const brickPosition = getPositionInFront(world);

  const tileOrg = getTile(world, brickPosition);
  const tile = cloneDeep(tileOrg);
  if (tile.bricks + count > world.height) {
    throw new Error("Cannot put bricks. The stack is too high");
  }
  tile.bricks += count;
  return world;
}

export function pickUpBrick(worldOrg: World, count = 1): World {
  const world = cloneDeep(worldOrg);
  if (isWall(world)) {
    throw new Error("Cannot pick up brick. Karel is looking at a wall");
  }

  const brickPosition = getPositionInFront(world);

  const tileOrg = getTile(world, brickPosition);
  const tile = cloneDeep(tileOrg);
  if (tile.bricks - count < 0) {
    throw new Error("Cannot pick up bricks. Not enough bricks to pick up.");
  }
  tile.bricks -= count;
  updateTile(world, tile);
  return world;
}

export function setMarker(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  const tileOrg = getTile(world, world.player);
  const tile = cloneDeep(tileOrg);
  if (tile.marked) {
    throw new Error("Cannot mark tile. It is already marked.");
  }
  tile.marked = true;
  updateTile(world, tile);
  return world;
}

export function removeMarker(worldOrg: World): World {
  const world = cloneDeep(worldOrg);
  const tileOrg = getTile(world, world.player);
  const tile = cloneDeep(tileOrg);
  if (!tile.marked) {
    throw new Error("Cannot remove marker. It is not marked.");
  }
  tile.marked = false;
  updateTile(world, tile);
  return world;
}
