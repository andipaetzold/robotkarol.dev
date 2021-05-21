import { Matrix4, OrthographicCamera } from "three";
import { World } from "../../types";

export const CAMERA_PIXEL_RATIO = 50;

const alpha = Math.PI / 4;
const Syx = 0;
const Szx = -0.5 * Math.cos(alpha);
const Sxy = 0;
const Szy = -0.5 * Math.sin(alpha);
const Sxz = 0;
const Syz = 0;
const matrix = new Matrix4();
matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);

export function createCamera(
  world: Pick<World, "depth">,
  width: number,
  height: number
) {
  const camera = new OrthographicCamera(
    0,
    width / CAMERA_PIXEL_RATIO,
    height / CAMERA_PIXEL_RATIO,
    0,
    0,
    world.depth
  );
  camera.position.set(0, 0, world.depth);
  camera.projectionMatrix.multiply(matrix);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  return camera;
}

export function updateCameraZoom(delta: number, camera: OrthographicCamera) {
  camera.zoom = Math.min(Math.max(0.1, camera.zoom + delta), 3);
  camera.updateProjectionMatrix();
  camera.projectionMatrix.multiply(matrix);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}

export function updateCameraPosition(
  deltaX: number,
  deltaY: number,
  camera: OrthographicCamera
) {
  const newX = camera.position.x + deltaX / CAMERA_PIXEL_RATIO;
  const newY = camera.position.y + deltaY / CAMERA_PIXEL_RATIO;
  camera.position.set(newX, newY, camera.position.z);
}
