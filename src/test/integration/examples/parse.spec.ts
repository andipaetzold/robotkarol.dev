import { readFileSync } from "fs";
import path from "path";
import { EXAMPLES } from "../../../services/examples";
import { parse } from "../../../services/parser";

EXAMPLES.filter((e) => e.code).forEach((example) => {
  if (example.code) {
    it(`${example.name}`, () => {
      const code = readFileSync(
        path.resolve(
          `${__dirname}/../../../../public/examples/${example.code}`
        ),
        { encoding: "utf8" }
      );
      const ast = parse(code);
      expect(ast).toMatchSnapshot();
    });
  }
});
