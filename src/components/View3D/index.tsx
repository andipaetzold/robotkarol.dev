import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { World } from "../../types";
import { degreeToRadians } from "../../utils/degreeToRadians";
import { Bricks } from "./Bricks";
import { Grid } from "./Grid";

interface Props {
  world: World;
}

export function View3D({ world }: Props) {
  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        position={[world.width / 2, world.height / 2, world.depth + 2]}
        near={0.1}
        far={world.depth * 2}
        zoom={50}
        rotation={[degreeToRadians(-22.5), degreeToRadians(22.5), 0]}
      />

      <ambientLight />
      <pointLight
        position={[world.width / 2, world.height / 2, world.depth + 2]}
      />

      <Grid world={world} />
      <Bricks world={world} />
    </Canvas>
  );
}
