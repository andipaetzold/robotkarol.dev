import { RootState } from "../types";
import { DIRECTIONS } from "./util";

export function turnRight(state: RootState): void {
  const directionIndex = DIRECTIONS.findIndex(
    (direction) => direction === state.world.player.direction
  );
  state.world.player.direction =
    DIRECTIONS[(directionIndex + 1) % DIRECTIONS.length];
}
