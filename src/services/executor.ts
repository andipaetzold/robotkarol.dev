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
import { ASTCall, ASTCondition } from "./parser/types";

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
  }
}

export function checkCondition(condition: ASTCondition, world: World): boolean {
  switch (condition.type) {
    case "not":
      return !checkCondition(condition.condition, world);
    case "expression": {
      switch (condition.test) {
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
      }
    }
  }
}
