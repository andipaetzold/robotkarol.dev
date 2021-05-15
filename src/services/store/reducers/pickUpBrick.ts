import { isWall } from "../../conditions";
import { getPositionInFront, getTile } from "../../util";
import { RootState } from "../types";

export function pickUpBrick(state: RootState, count = 1): void {
  if (isWall(state.world)) {
    throw new Error("Cannot pick up brick. Karol is looking at a wall.");
  }

  const brickPosition = getPositionInFront(state.world);

  const tile = getTile(state.world, brickPosition);
  if (tile.cuboid) {
    throw new Error("Cannot pick up brick from cuboid.");
  }

  if (tile.bricks - count < 0) {
    throw new Error("Cannot pick up bricks. Not enough bricks to pick up.");
  }

  if (state.execution.storage !== undefined) {
    if (
      state.execution.storage.current + count >
      state.execution.storage.size
    ) {
      throw new Error("Cannot pick up bricks. Not enoug storage space");
    }

    state.execution.storage.current += count;
  }

  tile.bricks -= count;

  if (!state.world.tiles.includes(tile)) {
    state.world.tiles.push(tile);
  }
}
