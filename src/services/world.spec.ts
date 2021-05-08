import { World } from "../types";
import { removeEmptyTiles } from "./world";

describe("removeEmptyTiles", () => {
  const WORLD: Omit<World, "tiles"> = {
    depth: 5,
    height: 5,
    width: 5,
    player: { x: 0, y: 0, direction: "south" },
  };

  it("should keep marked tiles", () => {
    const world: World = {
      ...WORLD,
      tiles: [
        { x: 0, y: 0, marked: true, bricks: 0 },
        { x: 0, y: 1, marked: true, bricks: 0 },
        { x: 0, y: 2, marked: false, bricks: 0 },
      ],
    };

    const cleanedWorld = removeEmptyTiles(world);
    expect(cleanedWorld.tiles).toHaveLength(2);
    expect(cleanedWorld.tiles).toMatchInlineSnapshot(`
      Array [
        Object {
          "bricks": 0,
          "marked": true,
          "x": 0,
          "y": 0,
        },
        Object {
          "bricks": 0,
          "marked": true,
          "x": 0,
          "y": 1,
        },
      ]
    `);
  });

  it("should keep tiles with bricks", () => {
    const world: World = {
      ...WORLD,
      tiles: [
        { x: 0, y: 0, marked: false, bricks: 0 },
        { x: 0, y: 1, marked: false, bricks: 3 },
        { x: 0, y: 2, marked: false, bricks: 5 },
      ],
    };

    const cleanedWorld = removeEmptyTiles(world);
    expect(cleanedWorld.tiles).toHaveLength(2);
    expect(cleanedWorld.tiles).toMatchInlineSnapshot(`
      Array [
        Object {
          "bricks": 3,
          "marked": false,
          "x": 0,
          "y": 1,
        },
        Object {
          "bricks": 5,
          "marked": false,
          "x": 0,
          "y": 2,
        },
      ]
    `);
  });
});
