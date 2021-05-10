import { Direction, Player, Tile, World } from "../types";
import { readFile } from "./file-reader";
import { removeEmptyTiles, validateTile } from "./world";

export async function readWorldFile(file: File): Promise<World> {
  const fileData = await readFile(file);

  const fileDataSplit = fileData.trim().split(" ");
  const version = fileDataSplit[0];

  let world: World;
  switch (version) {
    case "KarolVersion1Deutsch":
    case "KarolVersion2Deutsch":
    case "KarolVersion3.0":
      world = readWorld(fileDataSplit);
      break;
    default:
      throw new Error("Unknown world file");
  }

  return removeEmptyTiles(world);
}

function readWorld(data: string[]): World {
  const width = +data[1];
  const depth = +data[2];
  const height = +data[3];

  const directions: Direction[] = ["south", "west", "north", "east"]; // TODO: validate directions
  const player: Player = {
    x: +data[4],
    y: +data[5],
    direction: directions[+data[6]],
  };

  const tileData = data.slice(7);
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

  return world;
}
