import { AmbientLight, PointLight, Scene } from "three";
import { World } from "../../types";
import { createBricks } from "./bricks";
import { createGrid } from "./grid";
import { createPlayer } from "./player";

export function createScene(world: World): Scene {
  const scene = new Scene();

  scene.add(new AmbientLight());

  const pointLight = new PointLight();
  pointLight.position.set(world.width / 2, world.height / 2, world.depth);
  scene.add(pointLight);

  scene.add(createGrid(world));
  scene.add(createBricks(world));
  scene.add(createPlayer(world));

  return scene;
}
