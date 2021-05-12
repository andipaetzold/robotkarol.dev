import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
import { parse } from "../parser";
import { ParseError } from "../parser/ParseError";
import { DEFAULT_STATE } from "./constants";
import { executionStep as executionStepFn } from "./reducers/executionStep";

export const rootSlice = createSlice({
  name: "#",
  initialState: DEFAULT_STATE,
  reducers: {
    setWorld: {
      prepare: (world: World) => ({ payload: { world } }),
      reducer: (
        state,
        { payload: { world } }: PayloadAction<{ world: World }>
      ) => {
        state.world = world;
      },
    },
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
      state.error = undefined;
      state.execution.state = "stopped";
      state.execution.ast = undefined;
      state.execution.stack = [];
      let ast;
      try {
        ast = parse(state.code);
      } catch (e) {
        if (e instanceof ParseError) {
          state.error = { message: e.message, data: e.data };
        } else {
          state.error = { message: e.toString() };
        }
        return;
      }
      state.execution.ast = ast;
      state.execution.stack = ast.program.body;
    },
    controlsStartOrResume: (state) => {
      state.execution.state = "running";
    },
    controlsPause: (state) => {
      state.execution.state = "paused";
    },
    controlsStep: (state) => {
      state.execution.state = "paused";
      executionStepFn(state);
    },
    controlsStop: (state) => {
      state.execution.stack = state.execution.ast?.program.body!;
      state.execution.state = "stopped";
      state.execution.speed = "slow";
      state.execution.activeLine = undefined;
      if (state.execution.worldOnStart) {
        state.world = state.execution.worldOnStart;
        state.execution.worldOnStart = undefined;
      }
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
    executionStep: executionStepFn,
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
  updateCode,
  setWorld,
  controlsPause,
  controlsStartOrResume,
  controlsStop,
  controlsStep,
} = rootSlice.actions;

export default rootSlice.reducer;
