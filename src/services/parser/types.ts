export type AST = (ASTProgram | ASTFunction)[];

export interface ASTProgram {
  type: "program";
  line: number;
  body: ASTStatement[];
}

export interface ASTFunction {
  type: "function";
  line: number;
  identifier: string;
  body: ASTStatement[];
}

export type ASTStatement =
  | ASTIfStatement
  | ASTCall
  | ASTFunctionCall
  | ASTRepeatStatement
  | ASTWhileStatement;

export interface ASTCall {
  type: "call";
  line: number;
  action: Action;
}

export interface ASTFunctionCall {
  type: "functionCall";
  line: number;
  name: string;
}

export interface ASTRepeatStatement {
  type: "repeat";
  line: number;
  times: number;
  body: ASTStatement[];
}

export interface ASTWhileStatement {
  type: "while";
  line: number;
  condition: ASTCondition;
  body: ASTStatement[];
}

export interface ASTIfStatement {
  type: "if";
  line: number;
  condition: ASTCondition;
  body: ASTStatement[];
  elseBody: ASTStatement[];
}

export type ASTCondition = ASTExpression | ASTNotExpression;

export interface ASTNotExpression {
  type: "not";
  line: number;
  condition: ASTCondition;
}

export interface ASTExpression {
  type: "expression";
  line: number;
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
