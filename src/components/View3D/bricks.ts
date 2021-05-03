import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { World } from "../../types";
import { BRICK_HEIGHT } from "./constants";

const material = new MeshStandardMaterial({ color: "green" });

export function createBricks(world: World) {
  const group = new Group();

  world.tiles
    .filter((tile) => tile.bricks > 0)
    .forEach((tile) => {
      const geometry = new BoxGeometry(1, tile.bricks * BRICK_HEIGHT, 1);

      const mesh = new Mesh(geometry, material);
      mesh.position.set(
        tile.x + 0.5,
        tile.bricks * BRICK_HEIGHT * 0.5,
        tile.y + 0.5
      );
      group.add(mesh);
    });

  return group;
}
