import { AmbientLight, DirectionalLight, Scene } from "three";
import { World } from "../../types";
import { createTiles } from "./tiles";
import { createGrid } from "./grid";
import { createPlayer } from "./player";

export function createScene(world: World): Scene {
  const scene = new Scene();

  scene.add(new AmbientLight());

  const directionalLight = new DirectionalLight();
  directionalLight.position.set(5, 3, 10);
  scene.add(directionalLight);

  scene.add(createGrid(world));
  scene.add(createTiles(world));
  scene.add(createPlayer(world));

  return scene;
}
