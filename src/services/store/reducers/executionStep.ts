import { RootState } from "../types";
import { checkCondition, doCall } from "../../executor";

export function executionStep(state: RootState): void {
  if (state.execution.state === "done") {
    return;
  }

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
      case "functionCall": {
        const functionCall = state.execution.ast?.functions.find(
          (x) => x.identifier === statement.name
        )!;
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
  }
}
