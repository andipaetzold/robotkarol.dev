import { RootState } from "../types";
import { checkCondition, doCall } from "../../executor";

/**
 * TODO: fix and improve active line
 */
export function executionStep(state: RootState): void {
  if (state.execution.state === "done") {
    return;
  }

  let didCall = false;
  while (state.execution.stack.length > 0) {
    const statement = state.execution.stack.shift()!;
    state.execution.activeLine = statement.line;

    switch (statement.type) {
      case "call": {
        state.world = doCall(statement, state.world);
        didCall = true;
        break;
      }
      case "systemCall": {
        switch (statement.action) {
          case "fast":
            state.execution.speed = "fast";
            break;
          case "slow":
            state.execution.speed = "slow";
            break;
          case "exit":
            state.execution.stack = [];
            break;
        }
        break;
      }
      case "functionCall": {
        const functionCall = state.execution.ast?.functions.find(
          (x) => x.identifier === statement.name
        )!;
        state.execution.stack.unshift({
          type: "systemCall",
          line: statement.line,
          action: "slow",
        });
        state.execution.stack.unshift(...functionCall.body);
        break;
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

    let finish = false;
    if (didCall && state.execution.speed === "slow") {
      finish = true;
    }

    if (
      state.execution.stack.filter((s) => s.type !== "systemCall").length === 0
    ) {
      state.execution.state = "done";
      finish = true;
    }

    if (finish) {
      return;
    }
  }
}
