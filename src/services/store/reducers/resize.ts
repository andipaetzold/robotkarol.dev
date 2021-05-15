import { World } from "../../../types";
import { isInWorld } from "../../util";
import { RootState } from "../types";

export function resize(
  state: RootState,
  size: Pick<World, "depth" | "width" | "height">
): void {
  state.world.player.x = Math.min(state.world.width - 1, state.world.player.x);
  state.world.player.y = Math.min(state.world.depth - 1, state.world.player.y);

  state.world.tiles = state.world.tiles.filter((tile) => isInWorld(size, tile));
  state.world.depth = size.depth;
  state.world.height = size.height;
  state.world.width = size.width;
}
