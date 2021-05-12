import { readFileSync } from "fs";
import path from "path";
import { EXAMPLES } from "../../services/examples";
import { parse } from "../../services/parser";
import { readWorld } from "../../services/reader";
import { executionStep } from "../../services/store/reducers/executionStep";
import { RootState } from "../../services/store/types";

EXAMPLES.forEach((example) => {
  describe(`${example.name}`, () => {
    if (!example.code && example.world) {
      it("can read world", () => {
        const worldRaw = readFileSync(
          path.resolve(
            `${__dirname}/../../../public/examples/${example.world}`
          ),
          { encoding: "utf8" }
        );
        const world = readWorld(worldRaw);

        expect(world).toMatchSnapshot();
      });
    }

    if (example.code && !example.world) {
      it("can read code", () => {
        const code = readFileSync(
          path.resolve(`${__dirname}/../../../public/examples/${example.code}`),
          { encoding: "utf8" }
        );
        const ast = parse(code);
        expect(ast).toMatchSnapshot();
      });
    }

    if (example.code && example.world) {
      it("can run program", () => {
        const worldRaw = readFileSync(
          path.resolve(
            `${__dirname}/../../../public/examples/${example.world}`
          ),
          { encoding: "utf8" }
        );
        const world = readWorld(worldRaw);

        const code = readFileSync(
          path.resolve(`${__dirname}/../../../public/examples/${example.code}`),
          { encoding: "utf8" }
        );
        const ast = parse(code);

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

        expect(state.world).toMatchSnapshot();
      });
    }
  });
});
