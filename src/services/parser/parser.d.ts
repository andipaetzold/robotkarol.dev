import { ParseErrorData } from "./ParseError";
import { AST } from "./types";

export declare class Parser {
  constructor();

  yy: {
    parseError?: (message: string, data: ParseErrorData) => void;
  };

  parse(code: string): AST;
}

export declare function parse(code: string): AST;
