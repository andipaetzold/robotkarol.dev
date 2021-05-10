import range from "lodash/range";
import {
  BufferGeometry,
  DoubleSide,
  Group,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector3,
} from "three";
import { World } from "../../types";
import { degreeToRadians } from "../../utils/degreeToRadians";
import { BRICK_HEIGHT } from "./constants";

const planeMaterial = new MeshStandardMaterial({
  color: "white",
  side: DoubleSide,
});

export function createGrid(world: World): Group {
  const group = new Group();
  group.add(createBackWall(world));
  group.add(createLeftWall(world));
  group.add(createPlanes(world));
  group.add(createFloor(world));
  return group;
}

function createBackWall(world: World): Group {
  const group = new Group();
  const material = new LineDashedMaterial({ color: "blue", scale: 5 });

  {
    const points = [
      new Vector3(0, world.height * BRICK_HEIGHT, 0),
      new Vector3(world.width, world.height * BRICK_HEIGHT, 0),
    ];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  }

  range(0, world.width + 1).forEach((w) => {
    const points = [
      new Vector3(w, 0, 0),
      new Vector3(w, world.height * BRICK_HEIGHT, 0),
    ];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  });

  return group;
}

function createLeftWall(world: World): Group {
  const group = new Group();
  const material = new LineDashedMaterial({ color: "blue", scale: 5 });

  {
    const points = [
      new Vector3(0, world.height * BRICK_HEIGHT, 0),
      new Vector3(0, world.height * BRICK_HEIGHT, world.depth),
    ];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  }

  range(0, world.depth + 1).forEach((d) => {
    const points = [
      new Vector3(0, 0, d),
      new Vector3(0, world.height * BRICK_HEIGHT, d),
    ];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  });

  return group;
}

function createFloor(world: World): Group {
  const group = new Group();
  const material = new LineBasicMaterial({ color: "black" });

  range(0, world.depth + 1).forEach((d) => {
    const points = [new Vector3(0, 0, d), new Vector3(world.width, 0, d)];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  });

  range(0, world.width + 1).forEach((w) => {
    const points = [new Vector3(w, 0, 0), new Vector3(w, 0, world.depth)];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  });

  return group;
}

function createPlanes(world: World) {
  const group = new Group();

  {
    const geometry = new PlaneGeometry(
      world.depth,
      world.height * BRICK_HEIGHT
    );
    const mesh = new Mesh(geometry, planeMaterial);
    mesh.rotation.set(degreeToRadians(0), degreeToRadians(90), 0);
    mesh.position.set(0, (world.height * BRICK_HEIGHT) / 2, world.depth / 2);
    group.add(mesh);
  }

  {
    const geometry = new PlaneGeometry(
      world.width,
      world.height * BRICK_HEIGHT
    );
    const mesh = new Mesh(geometry, planeMaterial);
    mesh.position.set(world.width / 2, (world.height * BRICK_HEIGHT) / 2, 0);
    group.add(mesh);
  }

  return group;
}
