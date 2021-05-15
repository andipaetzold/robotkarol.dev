import { ASTCall } from "./parser/types";
import { pickUpBrick } from "./store/reducers/pickUpBrick";
import { putBrick } from "./store/reducers/putBrick";
import { removeMarker } from "./store/reducers/removeMarker";
import { setMarker } from "./store/reducers/setMarker";
import { step } from "./store/reducers/step";
import { turnLeft } from "./store/reducers/turnLeft";
import { turnRight } from "./store/reducers/turnRight";
import { RootState } from "./store/types";

export function doCall(statement: ASTCall, state: RootState): void {
  switch (statement.action) {
    case "STEP":
      step(state, statement.param);
      break;
    case "TURN_LEFT":
      turnLeft(state);
      break;
    case "TURN_RIGHT":
      turnRight(state);
      break;
    case "MARKER_SET":
      setMarker(state);
      break;
    case "MARKER_REMOVE":
      removeMarker(state);
      break;
    case "BRICK_PUT":
      putBrick(state, statement.param);
      break;
    case "BRICK_TAKE":
      pickUpBrick(state, statement.param);
      break;
    case "SOUND":
      // TODO: implement sound
      break;
    case "WAIT":
      // TODO: implement wait
      break;
  }
}
