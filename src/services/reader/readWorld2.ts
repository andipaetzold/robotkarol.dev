import { World, Tile } from "../../types";
import { readPlayer } from "./readPlayer";

export function readWorld2(data: string[]): World {
  const width = +data[1];
  const depth = +data[2];
  const height = +data[3];

  const world: World = {
    width,
    height,
    depth,
    player: readPlayer(data),
    tiles: [],
  };

  {
    let x = 0;
    let y = 0;

    const tileData = data.slice(7);
    let tile: Tile = { x, y, bricks: 0, marked: false, cuboid: false };
    for (const v of tileData) {
      switch (v) {
        case "m":
        case "o":
          tile.marked = v === "m";

          ++y;
          world.tiles.push(tile);

          if (y >= depth) {
            y = 0;
            ++x;
          }
          tile = { x, y, bricks: 0, marked: false, cuboid: false };
          break;

        case "q":
          tile.cuboid = true;
          break;

        case "n":
          // nothing
          break;

        case "z":
          ++tile.bricks;
          break;

        default:
          throw new Error(`Unknown value ${v}`);
      }
    }
  }

  return world;
}
