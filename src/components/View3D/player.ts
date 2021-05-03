import { ConeGeometry, Mesh, MeshStandardMaterial } from "three";
import { getTile } from "../../services/util";
import { World } from "../../types";
import { BRICK_HEIGHT } from "./constants";

const CONE_HEIGHT = 2;

const material = new MeshStandardMaterial({ color: "purple" });

export function createPlayer(world: World) {
  const tile = getTile(world, world.player);

  const geometry = new ConeGeometry(0.5, CONE_HEIGHT);
  const mesh = new Mesh(geometry, material);
  mesh.position.set(
    world.player.x + 0.5,
    CONE_HEIGHT / 2 + tile.bricks * BRICK_HEIGHT,
    world.player.y + 0.5
  );
  return mesh;
}
