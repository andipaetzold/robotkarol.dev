import { Matrix4, OrthographicCamera } from "three";
import { World } from "../../types";
import { degreeToRadians } from "../../utils/degreeToRadians";

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
  world: Pick<World, "depth" | "height" | "width">,
  width: number,
  height: number,
  perspective: "3d" | "2d"
) {
  const camera = new OrthographicCamera(
    0,
    width / CAMERA_PIXEL_RATIO,
    height / CAMERA_PIXEL_RATIO,
    0,
    0,
    perspective === "3d" ? world.depth : world.height + 100
  );

  switch (perspective) {
    case "3d": {
      camera.position.set(0, 0, world.depth);
      updateProjectionMatrix(camera);
      return camera;
    }
    case "2d": {
      camera.position.set(0, world.height, world.depth);
      camera.rotateX(degreeToRadians(-90));
      return camera;
    }
  }
}

export function updateCameraZoom(
  delta: number,
  camera: OrthographicCamera,
  perspective: "3d" | "2d"
) {
  camera.zoom = Math.min(Math.max(0.1, camera.zoom + delta), 3);
  camera.updateProjectionMatrix();
  if (perspective === "3d") {
    updateProjectionMatrix(camera);
  }
}

export function updateCameraPosition(
  deltaX: number,
  deltaY: number,
  camera: OrthographicCamera,
  perspective: "3d" | "2d"
) {
  switch (perspective) {
    case "3d": {
      const newX =
        camera.position.x + deltaX / CAMERA_PIXEL_RATIO / camera.zoom;
      const newY =
        camera.position.y - deltaY / CAMERA_PIXEL_RATIO / camera.zoom;
      camera.position.set(newX, newY, camera.position.z);
      break;
    }
    case "2d": {
      const newX =
        camera.position.x + deltaX / CAMERA_PIXEL_RATIO / camera.zoom;
      const newZ =
        camera.position.z + deltaY / CAMERA_PIXEL_RATIO / camera.zoom;
      camera.position.set(newX, camera.position.y, newZ);
      break;
    }
  }
}

function updateProjectionMatrix(camera: OrthographicCamera) {
  camera.projectionMatrix.multiply(matrix);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}
