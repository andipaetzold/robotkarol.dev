import { Camera } from "@react-three/fiber";
import { Matrix4, OrthographicCamera } from "three";
import { World } from "../../types";

const alpha = Math.PI / 6; // or Math.PI / 4
const Syx = 0,
  Szx = -0.5 * Math.cos(alpha),
  Sxy = 0,
  Szy = -0.5 * Math.sin(alpha),
  Sxz = 0,
  Syz = 0;
const matrix = new Matrix4();
matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);

export function createCamera(world: World, aspect: number): Camera {
  const c = new OrthographicCamera(
    0,
    (world.width / alpha) * aspect,
    world.height / alpha / aspect,
    0,
    0,
    world.depth
  );
  c.position.set(0, 0, world.depth);
  c.projectionMatrix.multiply(matrix);
  c.projectionMatrixInverse.copy(c.projectionMatrix).invert();

  return c;
}
