import { DEFAULT_WORLD } from "../../constants";
import { ParseErrorData } from "../parser/ParseError";
import { RootState } from "./types";

export const DEFAULT_STATE: RootState = {
  code: "",
  error: undefined as { message: string; data?: ParseErrorData } | undefined,
  execution: {
    ast: undefined,
    stack: [],
    state: "stopped",
    worldOnStart: DEFAULT_WORLD,
    activeLine: undefined as number | undefined,
  },
  world: DEFAULT_WORLD,
};
