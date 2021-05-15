import { getTile } from "../../util";
import { RootState } from "../types";

export function setMarker(state: RootState): void {
  const tile = getTile(state.world, state.world.player);
  tile.marked = true;

  if (!state.world.tiles.includes(tile)) {
    state.world.tiles.push(tile);
  }
}
