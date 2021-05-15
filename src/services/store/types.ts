import { World } from "../../types";
import { ParseErrorData } from "../parser/ParseError";
import { AST, ASTStatement } from "../parser/types";

type State = "stopped" | "running" | "paused" | "done";

export interface RootState {
  code: string;
  error?: { message: string; data?: ParseErrorData };
  execution: {
    ast?: AST;
    stack: StackFrame[];
    state: State;
    worldOnStart?: World;
    activeLine?: number;
    speed: "slow" | "fast";
    storage?: {
      current: number;
      size: number;
    };
  };
  world: World;
  settings: Settings;
}

export interface StackFrame {
  /**
   * Return value of the condition that was called from this stack frame.
   * This is not the return value of this stack frame.
   */
  conditionReturnValue?: boolean;
  statements: ASTStatement[];
}

export interface Settings {
  jumpHeight?: number;
  storage?: {
    start: number;
    size: number;
  };
}
