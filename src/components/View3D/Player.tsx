import { Cone } from "@react-three/drei";
import { getTile } from "../../services/util";
import { World } from "../../types";
import { BRICK_HEIGHT } from "./constants";

const CONE_HEIGHT = 2;

interface Props {
  world: World;
}

export function Player({ world }: Props) {
  const tile = getTile(world, world.player);

  return (
    <Cone
      args={[0.5, CONE_HEIGHT]}
      position={[
        world.player.x + 0.5,
        CONE_HEIGHT / 2 + tile.bricks * BRICK_HEIGHT,
        world.player.y + 0.5,
      ]}
    >
      <meshStandardMaterial color="purple" />
    </Cone>
  );
}
