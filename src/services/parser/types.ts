interface BaseASTObject {
  type: string;
  line: number;
}

export type AST = {
  type: "ast";
  program: ASTProgram;
  functions: ASTFunction[];
  conditions: ASTCondition[];
};

export interface ASTProgram extends BaseASTObject {
  type: "program";
  body: ASTStatement[];
}

export interface ASTFunction extends BaseASTObject {
  type: "function";
  identifier: string;
  body: ASTStatements;
}

export interface ASTCondition extends BaseASTObject {
  type: "condition";
  identifier: string;
  body: ASTStatements;
}

export type ASTStatements = ASTStatement[];
export type ASTStatement =
  | ASTIfStatement
  | ASTCall
  | ASTSystemCall
  | ASTFunctionCall
  | ASTRepeatStatement
  | ASTWhileStatement;

export interface ASTCall extends BaseASTObject {
  type: "call";
  action: Action;
  param?: number;
}

export interface ASTSystemCall extends BaseASTObject {
  type: "systemCall";
  action: SystemAction;
}

export interface ASTFunctionCall extends BaseASTObject {
  type: "functionCall";
  name: string;
}

export interface ASTRepeatStatement extends BaseASTObject {
  type: "repeat";
  times: number;
  body: ASTStatements;
}

export interface ASTWhileStatement extends BaseASTObject {
  type: "while";
  test: ASTTest;
  body: ASTStatements;
}

export interface ASTIfStatement extends BaseASTObject {
  type: "if";
  test: ASTTest;
  body: ASTStatements;
  elseBody: ASTStatements;
}

export type ASTTest = ASTTestState | ASTNotTest | ASTConditionCall;

export interface ASTNotTest extends BaseASTObject {
  type: "not";
  test: ASTTest;
}

export interface ASTTestState {
  type: "state";
  line: number;
  state: State;
  param?: number;
}

export interface ASTConditionCall {
  type: "conditionCall";
  line: number;
  name: string;
}

export type State =
  | "IS_WALL"
  | "NOT_IS_WALL"
  | "IS_BRICK"
  | "NOT_IS_BRICK"
  | "IS_MARKER"
  | "NOT_IS_MARKER"
  | "IS_NORTH"
  | "IS_EAST"
  | "IS_SOUTH"
  | "IS_WEST"
  | "IS_FULL"
  | "NOT_IS_FULL"
  | "IS_EMPTY"
  | "NOT_IS_EMPTY"
  | "HAS_BRICKS"
  | "CONDITION_RETURN_VALUE";

export type Action =
  | "STEP"
  | "TURN_LEFT"
  | "TURN_RIGHT"
  | "BRICK_PUT"
  | "BRICK_TAKE"
  | "MARKER_SET"
  | "MARKER_REMOVE"
  | "SOUND";

export type SystemAction = "FAST" | "SLOW" | "EXIT" | "TRUE" | "FALSE";
