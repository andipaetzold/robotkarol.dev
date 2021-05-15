import { RootState } from "../types";
import { DIRECTIONS } from "./util";

export function turnLeft(state: RootState) {
  const directionIndex = DIRECTIONS.findIndex(
    (direction) => direction === state.world.player.direction
  );
  state.world.player.direction =
    DIRECTIONS[(directionIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length];
}
