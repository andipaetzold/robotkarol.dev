import { DEFAULT_WORLD } from "../../constants";
import { execute } from "./executor";
import { AST } from "./types";

it("branchless program", () => {
  const ast: AST = {
    type: "ast",
    functions: [],
    program: {
      type: "program",
      body: [
        { type: "call", action: "STEP" },
        { type: "call", action: "TURN_LEFT" },
      ],
    },
  };

  const executor = execute(ast, DEFAULT_WORLD);
  expect(executor.next().value).toMatchSnapshot();
  expect(executor.next().value).toMatchSnapshot();
  expect(executor.next().done).toBe(true);
});

it("repeat program", () => {
  const ast: AST = {
    type: "ast",
    functions: [],
    program: {
      type: "program",
      body: [
        { type: "repeat", times: 3, body: [{ type: "call", action: "STEP" }] },
      ],
    },
  };

  const executor = execute(ast, DEFAULT_WORLD);
  expect(executor.next().value).toMatchSnapshot();
  expect(executor.next().value).toMatchSnapshot();
  expect(executor.next().value).toMatchSnapshot();
  expect(executor.next().done).toBe(true);
});
