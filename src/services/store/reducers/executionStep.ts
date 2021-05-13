import { checkTest, doCall } from "../../executor";
import { RootState } from "../types";

/**
 * TODO: fix and improve active line
 */
export function executionStep(state: RootState): void {
  if (state.execution.state === "done") {
    return;
  }

  if (!state.execution.worldOnStart) {
    state.execution.worldOnStart = state.world;
  }

  try {
    while (state.execution.stack.length > 0) {
      const statement = state.execution.stack[0].statements.shift()!;
      state.execution.activeLine = statement.line;

      switch (statement.type) {
        case "call": {
          state.world = doCall(statement, state.world);
          break;
        }
        case "systemCall": {
          switch (statement.action) {
            case "FAST":
              state.execution.speed = "fast";
              state.execution.stack[0].statements.unshift({
                type: "systemCall",
                line: statement.line,
                action: "SLOW",
              });
              break;
            case "SLOW":
              state.execution.speed = "slow";
              break;
            case "EXIT":
              state.execution.stack = [];
              break;
          }
          break;
        }
        case "functionCall": {
          const functionCall = state.execution.ast?.functions.find(
            (x) => x.identifier === statement.name
          )!;
          state.execution.stack.unshift({ statements: [...functionCall.body] });
          break;
        }
        case "repeat": {
          if (statement.times > 1) {
            state.execution.stack[0].statements.unshift({
              ...statement,
              times: statement.times - 1,
            });
          }
          state.execution.stack.unshift({ statements: [...statement.body] });
          break;
        }
        case "if": {
          if (checkTest(statement.test, state.world)) {
            state.execution.stack[0].statements.unshift(...statement.body);
          } else {
            state.execution.stack[0].statements.unshift(...statement.elseBody);
          }
          break;
        }
        case "while": {
          if (checkTest(statement.test, state.world)) {
            state.execution.stack[0].statements.unshift(
              ...statement.body,
              statement
            );
          }
        }
      }

      while (
        state.execution.stack.length > 0 &&
        state.execution.stack[0].statements.length === 0
      ) {
        state.execution.stack.shift();
      }

      if (state.execution.stack.length === 0) {
        state.execution.state = "done";
      }

      return;
    }
  } catch (e) {
    state.execution.state = "done";

    // TODO: handle error
    console.error(e);
  }
}
