import { readFileSync } from "fs";
import { cloneDeep } from "lodash";
import path from "path";
import { EXAMPLES } from "../../../services/examples";
import { parse } from "../../../services/parser";
import { readWorld } from "../../../services/reader";
import { executionStep } from "../../../services/store/reducers/executionStep";
import { RootState } from "../../../services/store/types";

EXAMPLES.filter((e) => e.code)
  .filter((e) => e.world)
  .filter((e) => !["09 Schachbrett", "Aufräumen"].includes(e.name)) // failing examples
  .filter((e) => e.name !== "Sortieren") // ignore examples with Einfügen
  .filter(
    (e) =>
      // examples with infinite loops
      ![
        "Festung",
        "Slalom",
        "Wächter 1",
        "Wächter 2",
        "Wächter 3",
        "Wächter 4",
        "Wächter 5",
        "Wächter 6",
      ].includes(e.name)
  )
  .forEach((example) => {
    it(`${example.name}`, () => {
      const worldRaw = readFileSync(
        path.resolve(
          `${__dirname}/../../../../public/examples/${example.world}`
        ),
        { encoding: "utf8" }
      );
      const world = readWorld(worldRaw);

      const code = readFileSync(
        path.resolve(
          `${__dirname}/../../../../public/examples/${example.code}`
        ),
        { encoding: "utf8" }
      );
      const ast = parse(code);

      const state: RootState = {
        code,
        world,
        execution: {
          speed: "slow",
          stack: [{ statements: cloneDeep(ast.program.body) }],
          state: "running",
          ast,
          storage: example.settings?.storage
            ? {
                current: example.settings.storage.start,
                size: example.settings.storage.size,
              }
            : undefined,
        },
        settings: {
          jumpHeight: example.settings?.jumpHeight,
          storage: example.settings?.storage,
        },
      };

      while (state.execution.state !== "done") {
        executionStep(state);
      }

      expect(state.world).toMatchSnapshot();
    });
  });
