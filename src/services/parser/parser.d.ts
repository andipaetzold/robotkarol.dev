import { ParseErrorData } from "./ParseError";
import { AST } from "./types";

declare module "./parser.js" {
  export class Parser {
    constructor();

    yy: {
      parseError?: (message: string, data: ParseErrorData) => void;
    };

    parse(code: string): AST;
  }

  export function parse(code: string): AST;
}
