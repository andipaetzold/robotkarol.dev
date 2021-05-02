import { AST } from "./types";

declare module "./parser.js" {
  export function parse(code: string): AST;
}
