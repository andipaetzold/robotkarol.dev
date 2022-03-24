import { ErrorBoundary } from "@sentry/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WebGLRenderer } from "three";
import useResizeObserver from "use-resize-observer";
import { useAppSelector } from "../../services/store";
import { Position } from "../../types";
import { createCamera, updateCameraPosition, updateCameraZoom } from "./camera";
import styles from "./styles.module.scss";
import { createScene } from "./scene";

interface Props {
  perspective?: "3d" | "2d";
}

export default function View3D({ perspective = "3d" }: Props) {
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
    return createCamera(
      { depth: world.depth, height: world.height, width: world.width },
      width,
      height,
      perspective
    );
  }, [world.depth, world.height, world.width, width, height, perspective]);

  const scene = useMemo(() => {
    return createScene(world, perspective);
  }, [world, perspective]);

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
      if (!moveRef.current || !camera || !canvas) {
        return;
      }

      updateCameraPosition(
        moveRef.current.x - event.pageX,
        moveRef.current.y - event.pageY,
        camera,
        perspective
      );

      moveRef.current = { x: event.pageX, y: event.pageY };
      render();
    },
    [camera, render, canvas, perspective]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!camera) {
        return;
      }

      event.preventDefault();
      updateCameraZoom(event.deltaY * -0.005, camera, perspective);
      render();
    },
    [render, camera, perspective]
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
