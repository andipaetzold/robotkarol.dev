import { World } from "../../types";
import { readFile } from "../file-reader";
import { removeEmptyTiles, validateTile } from "../world";
import { readWorld1 } from "./readWorld1";
import { readWorld2 } from "./readWorld2";
import { readWorld3 } from "./readWorld3";

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
