import { describe, expect, it } from "vitest";
import { EXAMPLES } from "./examples";
import { existsSync } from "fs";
import { resolve } from "path";

describe("EXAMPLES", () => {
  it("name is unique", () => {
    const names = EXAMPLES.map((e) => e.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe.each(EXAMPLES)("$name", (example) => {
    if (example.code) {
      it("code file exists", () => {
        expect(existsSync(`public/examples/${example.code!}`)).toBe(true);
      });
    }

    if (example.world) {
      it("world file exists", () => {
        expect(existsSync(`public/examples/${example.world}`)).toBe(true);
      });
    }
  });
});
