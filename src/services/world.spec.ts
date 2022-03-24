import { describe, expect, it } from "vitest";
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
        { x: 0, y: 0, marked: true, bricks: 0, cuboid: false },
        { x: 0, y: 1, marked: true, bricks: 0, cuboid: false },
        { x: 0, y: 2, marked: false, bricks: 0, cuboid: false },
      ],
    };

    const cleanedWorld = removeEmptyTiles(world);
    expect(cleanedWorld.tiles).toHaveLength(2);
    expect(cleanedWorld.tiles).toMatchInlineSnapshot(`
      [
        {
          "bricks": 0,
          "cuboid": false,
          "marked": true,
          "x": 0,
          "y": 0,
        },
        {
          "bricks": 0,
          "cuboid": false,
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
        { x: 0, y: 0, marked: false, bricks: 0, cuboid: false },
        { x: 0, y: 1, marked: false, bricks: 3, cuboid: false },
        { x: 0, y: 2, marked: false, bricks: 5, cuboid: false },
      ],
    };

    const cleanedWorld = removeEmptyTiles(world);
    expect(cleanedWorld.tiles).toHaveLength(2);
    expect(cleanedWorld.tiles).toMatchInlineSnapshot(`
      [
        {
          "bricks": 3,
          "cuboid": false,
          "marked": false,
          "x": 0,
          "y": 1,
        },
        {
          "bricks": 5,
          "cuboid": false,
          "marked": false,
          "x": 0,
          "y": 2,
        },
      ]
    `);
  });

  it("should keep tiles with cuboids", () => {
    const world: World = {
      ...WORLD,
      tiles: [
        { x: 0, y: 0, marked: false, bricks: 0, cuboid: false },
        { x: 0, y: 1, marked: false, bricks: 0, cuboid: true },
        { x: 0, y: 2, marked: false, bricks: 0, cuboid: true },
      ],
    };

    const cleanedWorld = removeEmptyTiles(world);
    expect(cleanedWorld.tiles).toHaveLength(2);
    expect(cleanedWorld.tiles).toMatchInlineSnapshot(`
      [
        {
          "bricks": 0,
          "cuboid": true,
          "marked": false,
          "x": 0,
          "y": 1,
        },
        {
          "bricks": 0,
          "cuboid": true,
          "marked": false,
          "x": 0,
          "y": 2,
        },
      ]
    `);
  });
});
