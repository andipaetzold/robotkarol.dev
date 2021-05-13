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

  let world: World;
  switch (version) {
    case "KarolVersion1Deutsch":
      world = readWorld1(data);
      break;
    case "KarolVersion2Deutsch":
      world = readWorld2(data);
      break;
    case "KarolVersion3.0":
      world = readWorld3(data);
      break;
    default:
      throw new Error("Unsupported version");
  }

  world.tiles.forEach((tile) => validateTile(world, tile));

  return removeEmptyTiles(world);
}

export function readWorld1(data: string[]): World {
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
        case "o":
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
          throw new Error(`Unknown value ${v}`);
      }
    }
  }

  return world;
}

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
        case "o":
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
          throw new Error(`Unknown value ${v}`);
      }
    }
  }

  return world;
}

export function readWorld3(data: string[]): World {
  const width = +data[1];
  const depth = +data[2];
  const height = +data[3];

  // data ends with 1-indexed x, 1-index y, direction (N, O , S W)
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

    const tileData = data.slice(7, -3);
    let tile: Tile = { x, y, bricks: 0, marked: false, cuboid: false };
    for (const v of tileData) {
      switch (v) {
        case "o":
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

        case "m":
          tile.marked = true;
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

function readPlayer(data: string[]): Player {
  const directions: Direction[] = ["south", "west", "north", "east"];
  return {
    x: +data[4],
    y: +data[5],
    direction: directions[+data[6]],
  };
}
