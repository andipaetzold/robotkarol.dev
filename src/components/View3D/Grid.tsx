import { Line } from "@react-three/drei";
import range from "lodash/range";
import React from "react";
import { World } from "../../types";
import { BRICK_HEIGHT } from "./constants";

interface Props {
  world: World;
}

export function Grid({ world }: Props) {
  return (
    <>
      {/* <Planes world={world} /> */}
      <Floor world={world} />
      <BackWall world={world} />
      <LeftWall world={world} />
    </>
  );
}

// function Planes({ world }: Props) {
//   return (
//     <>
//       <Plane
//         args={[world.width, world.depth]}
//         rotation={[degreeToRadians(-90), 0, degreeToRadians(0)]}
//         position={[world.width / 2, 0, world.depth / 2]}
//       >
//         <meshBasicMaterial color="white" />
//       </Plane>
//       <Plane
//         args={[world.depth, world.height]}
//         rotation={[degreeToRadians(0), degreeToRadians(90), 0]}
//         position={[0, world.height / 2, world.depth / 2]}
//       >
//         <meshBasicMaterial color="white" />
//       </Plane>
//       <Plane
//         args={[world.width, world.height]}
//         position={[world.width / 2, world.height / 2, 0]}
//       >
//         <meshBasicMaterial color="white" />
//       </Plane>
//     </>
//   );
// }

function Floor({ world }: Props) {
  return (
    <>
      {range(0, world.depth + 1).map((d) => (
        <Line
          key={d}
          points={[
            [0, 0, d],
            [world.width, 0, d],
          ]}
        />
      ))}
      {range(0, world.width + 1).map((w) => (
        <Line
          key={w}
          points={[
            [w, 0, 0],
            [w, 0, world.depth],
          ]}
        />
      ))}
    </>
  );
}

function BackWall({ world }: Props) {
  return (
    <>
      <Line
        points={[
          [0, world.height * BRICK_HEIGHT, 0],
          [world.width, world.height * BRICK_HEIGHT, 0],
        ]}
        color="blue"
        dashed
        dashScale={4}
        dashSize={1}
      />
      {range(0, world.width + 1).map((w) => (
        <Line
          key={w}
          points={[
            [w, 0, 0],
            [w, world.height * BRICK_HEIGHT, 0],
          ]}
          color="blue"
          dashed
          dashScale={4}
          dashSize={1}
        />
      ))}
    </>
  );
}

function LeftWall({ world }: Props) {
  return (
    <>
      <Line
        points={[
          [0, world.height * BRICK_HEIGHT, 0],
          [0, world.height * BRICK_HEIGHT, world.depth],
        ]}
        color="red"
        dashed
        dashScale={4}
        dashSize={1}
      />
      {range(1, world.depth + 1).map((d) => (
        <Line
          key={d}
          points={[
            [0, 0, d],
            [0, world.height * BRICK_HEIGHT, d],
          ]}
          color="red"
          dashed
          dashScale={4}
          dashSize={1}
        />
      ))}
    </>
  );
}
