import { World } from "../types";
import { getPositionInFront, isEqualPosition } from "./util";

export function isWall(world: World): boolean {
  switch (world.player.direction) {
    case "north":
      return world.player.y === 0;
    case "west":
      return world.player.x === 0;
    case "south":
      return world.player.y === world.depth - 1;
    case "east":
      return world.player.x === world.width - 1;
  }
}

export function hasMark(world: World): boolean {
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
