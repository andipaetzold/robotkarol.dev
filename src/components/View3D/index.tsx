import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WebGLRenderer } from "three";
import useResizeObserver from "use-resize-observer";
import { useAppSelector } from "../../services/store";
import { Position } from "../../types";
import { CAMERA_PIXEL_RATIO, createCamera } from "./camera";
import styles from "./index.module.scss";
import { createScene } from "./scene";

export function View3D() {
  const world = useAppSelector((s) => s.world);

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const { ref, width, height } = useResizeObserver();

  const renderer = useMemo(() => {
    if (!canvas) {
      return;
    }

    const r = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      precision: "highp",
    });
    return r;
  }, [canvas]);

  const camera = useMemo(() => {
    if (!width || !height) {
      return;
    }
    return createCamera(world, width, height);
  }, [world, width, height]);

  const scene = useMemo(() => {
    return createScene(world);
  }, [world]);

  const render = useCallback(() => {
    if (!renderer || !camera) {
      return;
    }
    renderer.render(scene, camera);
  }, [renderer, scene, camera]);

  useEffect(() => {
    if (!renderer || !width || !height || !camera) {
      return;
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  }, [renderer, camera, canvas, width, height]);

  useEffect(() => {
    render();
  }, [render]);

  const moveRef = useRef<Position | undefined>(undefined);

  const handleMouseDown = useCallback(
    (event: MouseEvent<HTMLCanvasElement>) => {
      moveRef.current = { x: event.pageX, y: event.pageY };
    },
    []
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLCanvasElement>) => {
      if (!moveRef.current) {
        return;
      }

      if (!camera) {
        return;
      }

      if (!canvas) {
        return;
      }

      // TODO: limit movement
      const newX =
        camera.position.x +
        (moveRef.current.x - event.pageX) / CAMERA_PIXEL_RATIO;
      const newY =
        camera.position.y +
        (event.pageY - moveRef.current.y) / CAMERA_PIXEL_RATIO;

      camera.position.set(newX, newY, camera.position.z);

      moveRef.current = { x: event.pageX, y: event.pageY };
      render();
    },
    [camera, render, canvas]
  );

  useEffect(() => {
    const handler = () => {
      moveRef.current = undefined;
    };

    window.addEventListener("mouseup", handler);
    return () => window.removeEventListener("mouseup", handler);
  }, []);

  return (
    <div ref={ref} className={styles.Container}>
      <canvas
        ref={(ref) => setCanvas(ref)}
        className={styles.Canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
