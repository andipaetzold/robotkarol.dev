import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { World } from "../../types";
import { parse } from "../parser";
import { ParseError } from "../parser/ParseError";
import { DEFAULT_STATE } from "./constants";
import { executionStep as executionStepReducer } from "./reducers/executionStep";
import { pickUpBrick as pickUpBrickReducer } from "./reducers/pickUpBrick";
import { putBrick as putBrickReducer } from "./reducers/putBrick";
import { turnLeft as turnLeftReducer } from "./reducers/turnLeft";
import { turnRight as turnRightReducer } from "./reducers/turnRight";
import { setMarker as setMarkerReducer } from "./reducers/setMarker";
import { removeMarker as removeMarkerReducer } from "./reducers/removeMarker";
import { resize as resizeReducer } from "./reducers/resize";
import { step as stepReducer } from "./reducers/step";
import { Settings } from "./types";

export const rootSlice = createSlice({
  name: "#",
  initialState: DEFAULT_STATE,
  reducers: {
    setWorld: (state, { payload: world }: PayloadAction<World>) => {
      state.world = world;
    },
    step: (state, { payload: count = 1 }) => stepReducer(state, count),
    turnLeft: turnLeftReducer,
    turnRight: turnRightReducer,

    putBrick: (state, { payload: count }: PayloadAction<number | undefined>) =>
      putBrickReducer(state, count),
    pickUpBrick: (
      state,
      { payload: count }: PayloadAction<number | undefined>
    ) => pickUpBrickReducer(state, count),

    setMarker: setMarkerReducer,
    removeMarker: removeMarkerReducer,
    set: {
      prepare: (world: World) => ({ payload: { world } }),
      reducer: (
        state,
        { payload: { world: newWorld } }: PayloadAction<{ world: World }>
      ) => {
        state.world = newWorld;
      },
    },
    resize: (
      state,
      {
        payload: size,
      }: PayloadAction<Pick<World, "height" | "width" | "depth">>
    ) => resizeReducer(state, size),
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
      state.execution.stack = [{ statements: [...ast.program.body] }];
      state.execution.storage = state.settings.storage
        ? {
            current: state.settings.storage.start,
            size: state.settings.storage.size,
          }
        : undefined;
    },
    controlsStartOrResume: (state) => {
      state.execution.state = "running";
    },
    controlsPause: (state) => {
      state.execution.state = "paused";
    },
    controlsStep: (state) => {
      state.execution.state = "paused";
      executionStepReducer(state);
    },
    controlsStop: (state) => {
      state.execution.stack = [
        { statements: [...state.execution.ast?.program.body!] },
      ];
      state.execution.state = "stopped";
      state.execution.speed = "slow";
      state.execution.activeLine = undefined;
      state.execution.storage = undefined;
      if (state.execution.worldOnStart) {
        state.world = state.execution.worldOnStart;
        state.execution.worldOnStart = undefined;
      }
    },
    updateCode: (state, { payload: code }: PayloadAction<string>) => {
      state.code = code;
    },
    executionStep: executionStepReducer,
    updateJumpHeight: (
      state,
      { payload: jumpHeight }: PayloadAction<number | undefined>
    ) => {
      state.settings.jumpHeight = jumpHeight;
    },
    updateStorage: (
      state,
      { payload: storage }: PayloadAction<Settings["storage"] | undefined>
    ) => {
      state.settings.storage = storage;
    },
  },
});

export const {
  turnLeft,
  turnRight,
  step,
  resize,
  set,
  setMarker,
  pickUpBrick,
  putBrick,
  removeMarker,
  parseCode,
  executionStep,
  updateCode,
  setWorld,
  controlsPause,
  controlsStartOrResume,
  controlsStop,
  controlsStep,
  updateJumpHeight,
  updateStorage,
} = rootSlice.actions;

export default rootSlice.reducer;
