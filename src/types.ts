export interface World {
  width: number;
  depth: number;
  height: number;

  player: Player;
  tiles: Tile[];
}

export interface Player extends Position {
  direction: Direction;
}

export type Direction = "north" | "south" | "east" | "west";

export interface Position {
  x: number;
  y: number;
}

export interface Tile extends Position {
  bricks: number;
  marked: boolean;
}

// AST
export interface AST {
  type: "ast";
  program: ASTProgram;
  functions: ASTFunction[];
}

export interface ASTProgram {
  type: "program";
  body: ASTStatement[];
}

export interface ASTFunction {
  type: "function";
  identifier: string;
  body: ASTStatement[];
}

export type ASTStatement =
  | ASTIfStatement
  | ASTCall
  | ASTRepeatStatement
  | ASTWhileStatement;

export interface ASTCall {
  type: "statement";
  action:
    | "STEP"
    | "TURN_LEFT"
    | "TURN_RIGHT"
    | "BRICK_PUT"
    | "BRICK_TAKE"
    | "MARKER_SET"
    | "MARKER_REMOVE";
}

export interface ASTRepeatStatement {
  type: "repeat";
  times: number;
  body: ASTStatement[];
}

export interface ASTWhileStatement {
  type: "while";
  condition: ASTCondition;
  body: ASTStatement[];
}

export interface ASTIfStatement {
  type: "if";
  condition: ASTCondition;
  body: ASTStatement[];
  elseBody: ASTStatement[];
}

export type ASTCondition = ASTExpression | ASTNotExpression;

export interface ASTNotExpression {
  type: "not";
  expression: ASTExpression;
}

export interface ASTExpression {
  type: "expression";
  test:
    | "IS_WALL"
    | "IS_BRICK"
    | "IS_MARKER"
    | "IS_NORTH"
    | "IS_EAST"
    | "IS_SOUTH"
    | "IS_EAST";
}
