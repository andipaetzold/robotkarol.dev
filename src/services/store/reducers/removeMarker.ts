import { getTile } from "../../util";
import { RootState } from "../types";

export function removeMarker(state: RootState): void {
  const tile = getTile(state.world, state.world.player);
  tile.marked = false;

  if (!state.world.tiles.includes(tile)) {
    state.world.tiles.push(tile);
  }
}
