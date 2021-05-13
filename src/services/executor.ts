import { World } from "../types";
import {
  pickUpBrick,
  putBrick,
  removeMarker,
  setMarker,
  step,
  turnLeft,
  turnRight,
} from "./actions";
import { ASTCall } from "./parser/types";

export function doCall(statement: ASTCall, world: World): World {
  switch (statement.action) {
    case "STEP":
      return step(world);
    case "TURN_LEFT":
      return turnLeft(world);
    case "TURN_RIGHT":
      return turnRight(world);
    case "MARKER_SET":
      return setMarker(world);
    case "MARKER_REMOVE":
      return removeMarker(world);
    case "BRICK_PUT":
      return putBrick(world);
    case "BRICK_TAKE":
      return pickUpBrick(world);
    case "SOUND":
      // TODO: implement sound
      return world;
  }
}
