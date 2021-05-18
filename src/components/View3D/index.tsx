import { ErrorBoundary } from "@sentry/react";
import React, {
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
import { createCamera, updateCameraPosition, updateCameraZoom } from "./camera";
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
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      moveRef.current = { x: event.pageX, y: event.pageY };
    },
    []
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!moveRef.current) {
        return;
      }

      if (!camera) {
        return;
      }

      if (!canvas) {
        return;
      }

      updateCameraPosition(
        moveRef.current.x - event.pageX,
        event.pageY - moveRef.current.y,
        camera
      );

      moveRef.current = { x: event.pageX, y: event.pageY };
      render();
    },
    [camera, render, canvas]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!camera) {
        return;
      }

      event.preventDefault();
      updateCameraZoom(event.deltaY * -0.005, camera);
      render();
    },
    [render, camera]
  );

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.addEventListener("wheel", handleWheel);
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [canvas, handleWheel]);

  useEffect(() => {
    const handler = () => {
      moveRef.current = undefined;
    };

    window.addEventListener("mouseup", handler);
    return () => window.removeEventListener("mouseup", handler);
  }, []);

  return (
    <ErrorBoundary>
      <div ref={ref} className={styles.Container}>
        <canvas
          ref={(ref) => setCanvas(ref)}
          className={styles.Canvas}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        />
      </div>
    </ErrorBoundary>
  );
}
