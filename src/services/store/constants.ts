import { DEFAULT_WORLD } from "../../constants";
import { RootState } from "./types";

export const DEFAULT_STATE: RootState = {
  code: "",
  error: undefined,
  execution: {
    ast: undefined,
    stack: [],
    state: "stopped",
    worldOnStart: undefined,
    activeLine: undefined,
    speed: "slow",
    storage: undefined,
  },
  world: DEFAULT_WORLD,
  settings: {
    jumpHeight: undefined,
    storage: undefined,
  },
};
