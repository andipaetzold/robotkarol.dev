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
import {
  isBrick,
  isEast,
  isMarker,
  isNorth,
  isSouth,
  isWall,
} from "./conditions";
import { ASTCall, ASTTest } from "./parser/types";

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

export function checkTest(test: ASTTest, world: World): boolean {
  switch (test.type) {
    case "not":
      return !checkTest(test.test, world);
    case "conditionCall":
      // TODO conditionCall
      throw new Error("Custom conditions are not implemented yet");
    case "state": {
      switch (test.state) {
        case "IS_BRICK":
          return isBrick(world);
        case "NOT_IS_BRICK":
          return !isBrick(world);
        case "IS_MARKER":
          return isMarker(world);
        case "NOT_IS_MARKER":
          return !isMarker(world);
        case "IS_WALL":
          return isWall(world);
        case "NOT_IS_WALL":
          return !isWall(world);
        case "IS_EAST":
          return isEast(world);
        case "IS_NORTH":
          return isNorth(world);
        case "IS_SOUTH":
          return isSouth(world);
        case "IS_WEST":
          return isSouth(world);
        case "IS_FULL":
          // TODO IS_FULL
          throw new Error("IS_FULL is not implemented yet");
        case "NOT_IS_FULL":
          // TODO NOT_IS_FULL
          throw new Error("NOT_IS_FULL is not implemented yet");
        case "IS_EMPTY":
          // TODO IS_EMPTY
          throw new Error("IS_EMPTY is not implemented yet");
        case "NOT_IS_EMPTY":
          // TODO NOT_IS_EMPTY
          throw new Error("NOT_IS_EMPTY is not implemented yet");
        case "HAS_BRICKS":
          // TODO HAS_BRICKS
          throw new Error("HAS_BRICKS is not implemented yet");
      }
    }
  }
}
