import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WebGLRenderer } from "three";
import useResizeObserver from "use-resize-observer";
import { useAppSelector } from "../../services/store";
import { createCamera } from "./camera";
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

  return (
    <div ref={ref} className={styles.Container}>
      <canvas ref={(ref) => setCanvas(ref)} className={styles.Canvas} />
    </div>
  );
}
