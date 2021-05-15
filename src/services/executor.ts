import { removeMarker, setMarker, step, turnLeft, turnRight } from "./actions";
import { ASTCall } from "./parser/types";
import { pickUpBrick } from "./store/reducers/pickUpBrick";
import { putBrick } from "./store/reducers/putBrick";
import { RootState } from "./store/types";

export function doCall(statement: ASTCall, state: RootState): void {
  switch (statement.action) {
    case "STEP":
      state.world = step(state.world, state.settings);
      break;
    case "TURN_LEFT":
      state.world = turnLeft(state.world);
      break;
    case "TURN_RIGHT":
      state.world = turnRight(state.world);
      break;
    case "MARKER_SET":
      state.world = setMarker(state.world);
      break;
    case "MARKER_REMOVE":
      state.world = removeMarker(state.world);
      break;
    case "BRICK_PUT":
      putBrick(state);
      break;
    case "BRICK_TAKE":
      pickUpBrick(state);
      break;
    case "SOUND":
      // TODO: implement sound
      break;
  }
}
