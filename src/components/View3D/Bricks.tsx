import { Box } from "@react-three/drei";
import { World } from "../../types";
import { BRICK_HEIGHT } from "./constants";

interface Props {
  world: World;
}

export function Bricks({ world }: Props) {
  return (
    <>
      {world.tiles
        .filter((tile) => tile.bricks > 0)
        .map((tile, tileIndex) => (
          <Box
            key={tileIndex}
            args={[1, tile.bricks, 1]}
            position={[tile.x - 0.5, tile.bricks * BRICK_HEIGHT, tile.y - 0.5]}
          >
            <lineBasicMaterial color="green" />
          </Box>
        ))}
    </>
  );
}
