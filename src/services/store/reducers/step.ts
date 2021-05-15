import { getPositionInFront, isEqualPosition, isInWorld } from "../../util";
import { RootState } from "../types";

export function step(state: RootState, count = 1): void {
  for (let i = 0; i < count; ++i) {
    stepRec(state);
  }
}

function stepRec(state: RootState): void {
  const newPosition = getPositionInFront(state.world);
  if (!isInWorld(state.world, newPosition)) {
    throw new Error("Cannot make step. The world is too small.");
  }

  if (state.settings.jumpHeight !== undefined) {
    const bricksBefore =
      state.world.tiles.find((t) => isEqualPosition(t, state.world.player))
        ?.bricks ?? 0;
    const bricksAfter =
      state.world.tiles.find((t) => isEqualPosition(t, newPosition))?.bricks ??
      0;
    const diff = Math.abs(bricksBefore - bricksAfter);
    if (diff > state.settings.jumpHeight) {
      throw new Error("Cannot make step. Brick height difference is too big.");
    }
  }

  state.world.player = { ...state.world.player, ...newPosition };
}
