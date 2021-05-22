import { AmbientLight, DirectionalLight, Scene } from "three";
import { World } from "../../types";
import { createTiles } from "./tiles";
import { createGrid } from "./grid";
import { createPlayer } from "./player";

export function createScene(world: World, perspective: "3d" | "2d"): Scene {
  const scene = new Scene();

  scene.add(new AmbientLight());

  const directionalLight = new DirectionalLight();
  directionalLight.position.set(5, 3, 10);
  scene.add(directionalLight);

  scene.add(createGrid(world));
  scene.add(createTiles(world, perspective));
  scene.add(createPlayer(world));

  return scene;
}
