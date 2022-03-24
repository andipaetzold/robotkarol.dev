import { describe, expect, it } from "vitest";
import { EXAMPLES } from "./examples";

describe("EXAMPLES", () => {
  it("name is unique", () => {
    const names = EXAMPLES.map((e) => e.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
