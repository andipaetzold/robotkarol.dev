import { World } from "../../types";
import { ParseErrorData } from "../parser/ParseError";
import { AST, ASTStatement } from "../parser/types";

type State = "stopped" | "running" | "paused" | "done";

export interface RootState {
  code: string;
  error?: { message: string; data?: ParseErrorData };
  execution: {
    ast?: AST;
    stack: ASTStatement[];
    state: State;
    worldOnStart: World;
    activeLine?: number;
  };
  world: World;
}
