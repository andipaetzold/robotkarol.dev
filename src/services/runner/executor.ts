import { range } from "lodash";
import { World } from "../../types";
import {
  pickUpBrick,
  putBrick,
  removeMarker,
  setMarker,
  step,
  turnLeft,
  turnRight,
} from "../actions";
import {
  isBrick,
  isEast,
  isMarker,
  isNorth,
  isSouth,
  isWall,
} from "../conditions";
import { AST, ASTCall, ASTCondition, ASTStatement } from "./types";

export function* execute(ast: AST, world: World) {
  const stack: ASTStatement[] = ast.find((s) => s.type === "program")!.body;

  while (stack.length > 0) {
    const statement = stack.shift()!;
    switch (statement.type) {
      case "call": {
        world = doCall(statement, world);
        yield world;
        break;
      }
      case "repeat": {
        const statements = range(0, statement.times).flatMap(
          () => statement.body
        );
        stack.unshift(...statements);
        break;
      }
      case "if": {
        if (checkCondition(statement.condition, world)) {
          stack.unshift(...statement.body);
        } else {
          stack.unshift(...statement.elseBody);
        }
        break;
      }
      case "while": {
        if (checkCondition(statement.condition, world)) {
          stack.unshift(...statement.body, statement);
        }
      }
    }
  }
}

function doCall(statement: ASTCall, world: World): World {
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

function checkCondition(condition: ASTCondition, world: World): boolean {
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
