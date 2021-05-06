import { Matrix4, OrthographicCamera } from "three";
import { World } from "../../types";

const alpha = Math.PI / 4;
const Syx = 0;
const Szx = -0.5 * Math.cos(alpha);
const Sxy = 0;
const Szy = -0.5 * Math.sin(alpha);
const Sxz = 0;
const Syz = 0;
const matrix = new Matrix4();
matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);

export function createCamera(world: World, width: number, height: number) {
  const camera = new OrthographicCamera(
    0,
    width / 50,
    height / 50,
    0,
    0,
    world.depth
  );
  camera.position.set(0, 0, world.depth);
  camera.projectionMatrix.multiply(matrix);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  return camera;
}
