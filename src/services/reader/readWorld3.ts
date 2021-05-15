import { World, Tile } from "../../types";
import { readPlayer } from "./readPlayer";

export function readWorld3(data: string[]): World {
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

    // data ends with 1-indexed x, 1-index y, direction (N, O, S, W)
    const tileData = data.slice(7, -3);

    let tile: Tile = { x, y, bricks: 0, marked: false, cuboid: false };
    for (const v of tileData) {
      switch (v) {
        case "m":
        case "o":
          tile.marked = v === "m";

          ++x;
          world.tiles.push(tile);

          if (x >= width) {
            x = 0;
            ++y;
          }
          tile = { x, y, bricks: 0, marked: false, cuboid: false };
          break;

        case "q":
          tile.cuboid = true;
          break;

        case "n":
          // nothing
          break;

        case "A":
          // TODO: red brick
          ++tile.bricks;
          break;

        case "B":
          // TODO: yellow brick
          ++tile.bricks;
          break;

        case "C":
          // TODO: blue brick
          ++tile.bricks;
          break;

        case "D":
          // TODO: green brick
          ++tile.bricks;
          break;

        default:
          throw new Error(`Unknown value ${v}`);
      }
    }
  }

  return world;
}
