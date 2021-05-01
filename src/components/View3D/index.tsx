import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";
import { Matrix4 } from "three";
import { World } from "../../types";
import { Bricks } from "./Bricks";
import { createCamera } from "./camera";
import { Grid } from "./Grid";
import { Player } from "./Player";

const alpha = Math.PI / 6; // or Math.PI / 4
const Syx = 0,
  Szx = -0.5 * Math.cos(alpha),
  Sxy = 0,
  Szy = -0.5 * Math.sin(alpha),
  Sxz = 0,
  Syz = 0;
const matrix = new Matrix4();
matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);

interface Props {
  world: World;
}

export function View3D({ world }: Props) {
  const camera = useMemo(() => {
    return createCamera(world, 1); // TODO: aspect ratio
  }, [world]);

  return (
    <Canvas camera={camera}>
      <ambientLight />
      <pointLight
        position={[world.width / 2, world.height / 2, world.depth]}
      />

      <Grid world={world} />
      <Bricks world={world} />
      <Player world={world} />
    </Canvas>
  );
}
