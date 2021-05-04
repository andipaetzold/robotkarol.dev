import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from "three";
import { getTile } from "../../services/util";
import { World } from "../../types";
import { degreeToRadians } from "../../utils/degreeToRadians";
import { BRICK_HEIGHT } from "./constants";

const PLAYER_HEIGHT = 2;
const FEET_HEIGHT = PLAYER_HEIGHT * 0.15;
const BODY_HEIGHT = PLAYER_HEIGHT * 0.5;
const BODY_WIDTH = 0.6;
const HEAD_HEIGHT = PLAYER_HEIGHT * 0.3;
const ARM_LENGTH = 0.2;

const material = new MeshStandardMaterial({
  color: "gray",
  roughness: 0.8,
  metalness: 0.5,
});

const materialEyes = new MeshStandardMaterial({
  color: "white",
  roughness: 0.8,
  metalness: 0.5,
});

export function createPlayer(world: World): Group {
  const tile = getTile(world, world.player);

  const pivot = new Group();
  {
    // Left foot
    const geometry = new CylinderGeometry(0.1, 0.1, FEET_HEIGHT);
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.3, FEET_HEIGHT / 2, 0.5);
    pivot.add(mesh);
  }

  {
    // Right foot
    const geometry = new CylinderGeometry(0.1, 0.1, FEET_HEIGHT);
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.6, FEET_HEIGHT / 2, 0.5);
    pivot.add(mesh);
  }

  {
    // Body
    const geometry = new BoxGeometry(BODY_WIDTH, BODY_HEIGHT, 0.5);
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.5, FEET_HEIGHT + BODY_HEIGHT / 2, 0.5);
    pivot.add(mesh);
  }

  {
    // Left arm
    const geometry = new CylinderGeometry(0.15, 0.15, ARM_LENGTH);
    const mesh = new Mesh(geometry, material);
    mesh.rotation.set(0, 0, degreeToRadians(-90));
    mesh.position.set(
      0.5 - BODY_WIDTH / 2 - ARM_LENGTH / 2,
      FEET_HEIGHT + 0.8 * BODY_HEIGHT,
      0.5
    );
    pivot.add(mesh);
  }

  {
    // Right arm
    const geometry = new CylinderGeometry(0.15, 0.15, ARM_LENGTH);
    const mesh = new Mesh(geometry, material);
    mesh.rotation.set(0, 0, degreeToRadians(90));
    mesh.position.set(
      0.5 + BODY_WIDTH / 2 + ARM_LENGTH / 2,
      FEET_HEIGHT + 0.8 * BODY_HEIGHT,
      0.5
    );
    pivot.add(mesh);
  }

  {
    // Head
    const geometry = new SphereGeometry(HEAD_HEIGHT / 2);
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.5, FEET_HEIGHT + BODY_HEIGHT + HEAD_HEIGHT / 2, 0.5);
    pivot.add(mesh);
  }

  {
    // Left eye
    const geometry = new CylinderGeometry(0.07, 0.07, 0.2);
    const mesh = new Mesh(geometry, materialEyes);
    mesh.rotation.set(degreeToRadians(90), 0, 0);
    mesh.position.set(0.4, FEET_HEIGHT + BODY_HEIGHT + HEAD_HEIGHT * 0.70, 0.7);
    pivot.add(mesh);
  }

  {
    // Right eye
    const geometry = new CylinderGeometry(0.07, 0.07, 0.2);
    const mesh = new Mesh(geometry, materialEyes);
    mesh.rotation.set(degreeToRadians(90), 0, 0);
    mesh.position.set(0.6, FEET_HEIGHT + BODY_HEIGHT + HEAD_HEIGHT * 0.70, 0.7);
    pivot.add(mesh);
  }

  pivot.position.set(-0.5, 0, -0.5);
  pivot.receiveShadow = true;
  pivot.castShadow = true;

  const group = new Group();
  group.add(pivot);

  switch (world.player.direction) {
    case "north":
      group.rotation.set(0, degreeToRadians(180), 0);
      break;
    case "east":
      group.rotation.set(0, degreeToRadians(90), 0);
      break;
    case "south":
      group.rotation.set(0, degreeToRadians(0), 0);
      break;
    case "west":
      group.rotation.set(0, degreeToRadians(-90), 0);
      break;
  }
  group.position.set(
    world.player.x + 0.5,
    tile.bricks * BRICK_HEIGHT,
    world.player.y + 0.5
  );
  return group;
}
