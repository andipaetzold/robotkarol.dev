import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_WORLD } from "../../constants";
import { World } from "../../types";
import {
  pickUpBrick as pickUpBrickAction,
  putBrick as putBrickAction,
  removeMarker as removeMarkerAction,
  reset as resetAction,
  resize as resizeAction,
  setMarker as setMarkerAction,
  step as stepAction,
  toggleMarker as toggleMarkerAction,
  turnLeft as turnLeftAction,
  turnRight as turnRightAction,
} from "../actions";
import { checkCondition, doCall } from "../executor";
import { parse } from "../parser/parser";
import { AST, ASTStatement } from "../parser/types";

type State = "stopped" | "running" | "done";

export const rootSlice = createSlice({
  name: "#",
  initialState: {
    code: "",
    execution: {
      ast: [] as AST,
      stack: [] as ASTStatement[],
      state: "stopped" as State,
      worldOnStart: DEFAULT_WORLD,
      activeLine: undefined as number | undefined,
      autoStep: false,
    },
    world: DEFAULT_WORLD,
  },
  reducers: {
    step: {
      prepare: (count: number = 1) => ({ payload: { count } }),
      reducer: (
        state,
        { payload: { count } }: PayloadAction<{ count: number }>
      ) => {
        state.world = stepAction(state.world, count);
      },
    },
    turnLeft: (state) => {
      state.world = turnLeftAction(state.world);
    },
    turnRight: (state) => {
      state.world = turnRightAction(state.world);
    },
    putBrick: {
      prepare: (count: number = 1) => ({ payload: { count } }),
      reducer: (
        state,
        { payload: { count } }: PayloadAction<{ count: number }>
      ) => {
        state.world = putBrickAction(state.world, count);
      },
    },
    pickUpBrick: {
      prepare: (count: number = 1) => ({ payload: { count } }),
      reducer: (
        state,
        { payload: { count } }: PayloadAction<{ count: number }>
      ) => {
        state.world = pickUpBrickAction(state.world, count);
      },
    },

    setMarker: (state) => {
      state.world = setMarkerAction(state.world);
    },
    removeMarker: (state) => {
      state.world = removeMarkerAction(state.world);
    },
    toggleMarker: (state) => {
      state.world = toggleMarkerAction(state.world);
    },
    set: {
      prepare: (world: World) => ({ payload: { world } }),
      reducer: (
        state,
        { payload: { world: newWorld } }: PayloadAction<{ world: World }>
      ) => {
        state.world = newWorld;
      },
    },
    reset: (state) => {
      state.world = resetAction(state.world);
    },
    resize: (
      state,
      {
        payload: size,
      }: PayloadAction<Pick<World, "depth" | "height" | "width">>
    ) => {
      state.world = resizeAction(state.world, size);
    },
    parseCode: (state) => {
      const ast = parse(state.code);
      state.execution.ast = ast;
      state.execution.stack = ast.find((s) => s.type === "program")!.body;
      state.execution.state = "stopped";
    },
    updateAutoStep: {
      prepare: (autoStep: boolean) => ({ payload: { autoStep } }),
      reducer: (
        state,
        { payload: { autoStep } }: PayloadAction<{ autoStep: boolean }>
      ) => {
        state.execution.autoStep = autoStep;
      },
    },
    updateState: {
      prepare: (state: State) => ({ payload: { state } }),
      reducer: (
        state,
        { payload: { state: executionState } }: PayloadAction<{ state: State }>
      ) => {
        state.execution.state = executionState;
      },
    },
    stop: (state) => {
      state.execution.stack = state.execution.ast.find(
        (s) => s.type === "program"
      )!.body;
      state.execution.state = "stopped";
      state.execution.activeLine = undefined;
      state.world = state.execution.worldOnStart;
    },
    updateCode: {
      prepare: (code: string) => ({ payload: { code } }),
      reducer: (
        state,
        { payload: { code } }: PayloadAction<{ code: string }>
      ) => {
        state.code = code;
      },
    },
    executionStep: (state) => {
      if (state.execution.state === "done") {
        return;
      }

      state.execution.state = "running";

      while (state.execution.stack.length > 0) {
        const statement = state.execution.stack.shift()!;
        switch (statement.type) {
          case "call": {
            state.world = doCall(statement, state.world);
            state.execution.activeLine = statement.line;

            if (state.execution.stack.length === 0) {
              state.execution.state = "done";
            }
            return;
          }
          case "repeat": {
            if (statement.times > 1) {
              state.execution.stack.unshift({
                ...statement,
                times: statement.times - 1,
              });
            }
            state.execution.stack.unshift(...statement.body);
            break;
          }
          case "if": {
            if (checkCondition(statement.condition, state.world)) {
              state.execution.stack.unshift(...statement.body);
            } else {
              state.execution.stack.unshift(...statement.elseBody);
            }
            break;
          }
          case "while": {
            if (checkCondition(statement.condition, state.world)) {
              state.execution.stack.unshift(...statement.body, statement);
            }
          }
        }
      }
    },
  },
});

export const {
  turnLeft,
  turnRight,
  step,
  resize,
  toggleMarker,
  set,
  setMarker,
  pickUpBrick,
  putBrick,
  removeMarker,
  reset,
  parseCode,
  executionStep,
  stop,
  updateCode,
  updateAutoStep,
  updateState
} = rootSlice.actions;

export default rootSlice.reducer;
