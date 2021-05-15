import { isWall } from "../../conditions";
import { getPositionInFront, getTile } from "../../util";
import { RootState } from "../types";

export function putBrick(state: RootState, count = 1): void {
  if (isWall(state.world)) {
    throw new Error("Cannot put brick. Karol is looking at a wall.");
  }

  const brickPosition = getPositionInFront(state.world);

  const tile = getTile(state.world, brickPosition);
  if (tile.cuboid) {
    throw new Error("Cannot put brick on cuboid.");
  }

  if (tile.bricks + count > state.world.height) {
    throw new Error("Cannot put bricks. The stack is too high.");
  }

  if (state.execution.storage !== undefined) {
    if (state.execution.storage.current < count) {
      throw new Error(
        "Cannot put brick. Karol has not enough bricks in his storage."
      );
    }

    state.execution.storage.current -= count;
  }

  tile.bricks += count;

  if (!state.world.tiles.includes(tile)) {
    state.world.tiles.push(tile);
  }
}
