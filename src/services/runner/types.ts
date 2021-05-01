export type AST = (ASTProgram | ASTFunction)[];

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
  type: "call";
  action: Action;
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
  condition: ASTCondition;
}

export interface ASTExpression {
  type: "expression";
  test: Test;
}

export type Test =
  | "IS_WALL"
  | "NOT_IS_WALL"
  | "IS_BRICK"
  | "NOT_IS_BRICK"
  | "IS_MARKER"
  | "NOT_IS_MARKER"
  | "IS_NORTH"
  | "IS_EAST"
  | "IS_SOUTH"
  | "IS_WEST";

export type Action =
  | "STEP"
  | "TURN_LEFT"
  | "TURN_RIGHT"
  | "BRICK_PUT"
  | "BRICK_TAKE"
  | "MARKER_SET"
  | "MARKER_REMOVE";
