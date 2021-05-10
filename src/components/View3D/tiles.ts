import {
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";
import { isEqualPosition } from "../../services/util";
import { Tile, World } from "../../types";
import { degreeToRadians } from "../../utils/degreeToRadians";
import { BRICK_HEIGHT } from "./constants";

const materialBrick = new MeshStandardMaterial({ color: "green" });
const materialMarked = new MeshStandardMaterial({ color: "yellow" });
const materialTile = new MeshStandardMaterial({ color: "white" });
const materialCuboid = new MeshStandardMaterial({ color: "gray" });

const boxMaterials = [
  materialBrick,
  materialBrick,
  materialBrick,
  materialBrick,
  materialBrick,
  materialBrick,
];
const boxMaterialsMarked = [
  materialBrick,
  materialBrick,
  materialMarked,
  materialBrick,
  materialBrick,
  materialBrick,
];

export function createTiles(world: World) {
  const group = new Group();

  for (let x = 0; x < world.width; ++x) {
    for (let y = 0; y < world.depth; ++y) {
      const tile: Tile = world.tiles.find((tile) =>
        isEqualPosition(tile, { x, y })
      ) ?? { x, y, bricks: 0, marked: false, cuboid: false };

      if (tile.cuboid) {
        const geometry = new BoxGeometry(1, 1, 1);

        const mesh = new Mesh(geometry, materialCuboid);
        mesh.position.set(tile.x + 0.5, 0.5, tile.y + 0.5);
        group.add(mesh);
      } else if (tile.bricks > 0) {
        const geometry = new BoxGeometry(1, tile.bricks * BRICK_HEIGHT, 1);

        const mesh = new Mesh(
          geometry,
          tile.marked ? boxMaterialsMarked : boxMaterials
        );
        mesh.position.set(
          tile.x + 0.5,
          tile.bricks * BRICK_HEIGHT * 0.5,
          tile.y + 0.5
        );
        group.add(mesh);
      } else {
        const geometry = new PlaneGeometry(1, 1);
        const mesh = new Mesh(
          geometry,
          tile.marked ? materialMarked : materialTile
        );
        mesh.rotation.set(degreeToRadians(-90), 0, degreeToRadians(0));
        mesh.position.set(x + 0.5, 0, y + 0.5);
        group.add(mesh);
      }
    }
  }

  group.receiveShadow = true;
  group.castShadow = true;

  return group;
}
