import { readFileSync } from "fs";
import path from "path";
import { expect, it } from "vitest";
import { EXAMPLES } from "../../../services/examples";
import { readWorld } from "../../../services/reader";

EXAMPLES.filter((e) => e.world).forEach((example) => {
  if (example.world) {
    it(`${example.name}`, () => {
      const worldRaw = readFileSync(
        path.resolve(
          `${__dirname}/../../../../public/examples/${example.world}`
        ),
        { encoding: "utf8" }
      );
      const world = readWorld(worldRaw);
      expect(world).toMatchSnapshot();
    });
  }
});
