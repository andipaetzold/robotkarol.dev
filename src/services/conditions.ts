import { World } from "../types";
import { RootState } from "./store/types";
import { getPositionInFront, isEqualPosition } from "./util";

export function isWall(world: World): boolean {
  let isWorldWall = false;
  switch (world.player.direction) {
    case "north":
      isWorldWall = world.player.y === 0;
      break;
    case "west":
      isWorldWall = world.player.x === 0;
      break;
    case "south":
      isWorldWall = world.player.y === world.depth - 1;
      break;
    case "east":
      isWorldWall = world.player.x === world.width - 1;
      break;
  }

  const positionInFromt = getPositionInFront(world);
  const tileInFront = world.tiles.find((t) =>
    isEqualPosition(t, positionInFromt)
  );
  const isCuboidInFront = tileInFront?.cuboid ?? false;

  return isWorldWall || isCuboidInFront;
}

export function isMarker(world: World): boolean {
  return (
    world.tiles.find((tile) => isEqualPosition(tile, world.player))?.marked ??
    false
  );
}

export function isBrick(world: World, count?: number): boolean {
  if (isWall(world)) {
    return false;
  }

  const brickPosition = getPositionInFront(world);

  const brickCount =
    world.tiles.find((tile) => isEqualPosition(tile, brickPosition))?.bricks ??
    0;

  if (count === undefined) {
    return brickCount > 0;
  } else {
    return brickCount === count;
  }
}

export function isNorth(world: World): boolean {
  return world.player.direction === "north";
}
export function isEast(world: World): boolean {
  return world.player.direction === "east";
}
export function isSouth(world: World): boolean {
  return world.player.direction === "south";
}
export function isWest(world: World): boolean {
  return world.player.direction === "west";
}

export function isFull(state: RootState): boolean {
  if (state.execution.storage === undefined) {
    throw new Error("Storage must be enabled.");
  }

  return state.execution.storage.current === state.execution.storage.size;
}

export function isEmpty(state: RootState): boolean {
  if (state.execution.storage === undefined) {
    throw new Error("Storage must be enabled.");
  }

  return state.execution.storage.current === 0;
}

export function hasBricks(state: RootState): boolean {
  if (state.execution.storage === undefined) {
    throw new Error("Storage must be enabled.");
  }

  return state.execution.storage.current > 0;
}
