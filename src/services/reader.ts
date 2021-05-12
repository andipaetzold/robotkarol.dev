import { Direction, Player, Tile, World } from "../types";
import { readFile } from "./file-reader";
import { removeEmptyTiles, validateTile } from "./world";

export async function readWorldFile(file: File): Promise<World> {
  const fileData = await readFile(file);

  return readWorld(fileData);
}

export function readWorld(rawData: string): World {
  const data = rawData.trim().split(" ");

  const version = data[0];
  const width = +data[1];
  const depth = +data[2];
  const height = +data[3];

  const directions: Direction[] = ["south", "west", "north", "east"]; // TODO: validate directions
  const player: Player = {
    x: +data[4],
    y: +data[5],
    direction: directions[+data[6]],
  };

  const tileData = data.slice(
    7,
    // KarolVersion3.0 ends with 1-indexed x, 1-index y, direction (N, O , S W)
    version === "KarolVersion3.0" ? -3 : 0
  );
  if (tileData[tileData.length - 1] !== "o") {
    tileData.push("o");
  }

  const world: World = {
    width,
    height,
    depth,
    player,
    tiles: [],
  };

  {
    let x = 0;
    let y = 0;

    let tile: Tile = { x, y, bricks: 0, marked: false, cuboid: false };
    for (const v of tileData) {
      switch (v) {
        case "o":
          ++x;
          validateTile(world, tile);
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

        case "m":
          tile.marked = true;
          break;

        case "n":
          // nothing
          break;

        case "z":
          ++tile.bricks;
          break;

        default:
          console.warn(`Unknown value ${v}`);
          break;
      }
    }
  }

  return removeEmptyTiles(world);
}
