export interface World {
  width: number;
  depth: number;
  height: number;

  player: Player;
  tiles: Tile[];
}

export interface Player extends Position {
  direction: Direction;
}

export type Direction = "north" | "south" | "east" | "west";

export interface Position {
  x: number;
  y: number;
}

export interface Tile extends Position {
  cuboid: boolean;
  bricks: number;
  marked: boolean;
}
