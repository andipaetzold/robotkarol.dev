import { Direction, Player } from "../../types";

export function readPlayer(data: string[]): Player {
  const directions: Direction[] = ["south", "west", "north", "east"];
  return {
    x: +data[4],
    y: +data[5],
    direction: directions[+data[6]],
  };
}
