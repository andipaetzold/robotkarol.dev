import { readFileSync } from "fs";
import path from "path";
import { EXAMPLES } from "../../services/examples";
import { parse } from "../../services/parser";
import { AST } from "../../services/parser/types";
import { readWorld } from "../../services/reader";
import { executionStep } from "../../services/store/reducers/executionStep";
import { RootState } from "../../services/store/types";
import { World } from "../../types";

EXAMPLES.forEach((example) => {
  it(`${example.name}`, () => {
    let world: World | undefined;
    if (example.world) {
      const worldRaw = readFileSync(
        path.resolve(`${__dirname}/../../../public/examples/${example.world}`),
        { encoding: "utf8" }
      );
      world = readWorld(worldRaw);
    }

    let code = "";
    let ast: AST | undefined;
    if (example.code) {
      code = readFileSync(
        path.resolve(`${__dirname}/../../../public/examples/${example.code}`),
        { encoding: "utf8" }
      );
      parse(code);
    }

    if (world && ast) {
      const state: RootState = {
        code,
        world,
        execution: {
          speed: "slow",
          stack: ast.program.body,
          state: "running",
          ast,
        },
      };

      while (state.execution.state !== "done") {
        executionStep(state);
      }
    }
  });
});
