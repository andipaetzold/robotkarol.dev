import { cloneDeep } from "lodash";
import { Position, Tile, World } from "../types";

export function isEqualPosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function getPositionInFront(world: World): Position {
  const position = { x: world.player.x, y: world.player.y };
  switch (world.player.direction) {
    case "north":
      --position.y;
      break;
    case "west":
      --position.x;
      break;
    case "south":
      ++position.y;
      break;
    case "east":
      ++position.x;
      break;
  }
  return position;
}

export function getTile(world: World, pos: Position): Tile {
  return (
    world.tiles.find((tile) => isEqualPosition(tile, pos)) ?? {
      ...pos,
      marked: false,
      bricks: 0,
      cuboid: false,
    }
  );
}

export function updateTile(worldOrg: World, updatedTile: Tile): World {
  const world = cloneDeep(worldOrg);
  const tileIndex = world.tiles.findIndex((t) =>
    isEqualPosition(t, updatedTile)
  );

  if (tileIndex === -1) {
    world.tiles.push(updatedTile);
  } else {
    world.tiles[tileIndex] = updatedTile;
  }

  return world;
}

export function isInWorld(
  world: Pick<World, "width" | "height" | "depth">,
  pos: Position
): boolean {
  return pos.x >= 0 && pos.y >= 0 && pos.x < world.width && pos.y < world.depth;
}
