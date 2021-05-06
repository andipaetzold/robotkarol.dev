import { groupBy } from "lodash";
import { ParseError, ParseErrorData } from "./ParseError";
import { Parser } from "./parser";
import { AST, ASTFunction, ASTFunctionCall, ASTStatement } from "./types";

const parser = new Parser();
parser.yy.parseError = (str: string, data: ParseErrorData) => {
  throw new ParseError(str, data);
};

export function parse(code: string): AST {
  const ast = parser.parse(code);
  validate(ast);
  return ast;
}

export function validate(ast: AST) {
  // program block
  const programs = ast.filter((x) => x.type === "program");
  if (programs.length > 1) {
    throw new ParseError("There may be only one program block.", {
      line: programs[1].line,
    });
  }

  if (programs.length === 0) {
    throw new ParseError("There must be a program block.");
  }

  // functions
  const functionBlocks = ast.filter(
    (x): x is ASTFunction => x.type === "function"
  );

  const functionBlocksByName = groupBy(functionBlocks, (f) => f.identifier);
  for (const [functionName, blocks] of Object.entries(functionBlocksByName)) {
    if (blocks.length > 1) {
      throw new ParseError(
        `Duplicate function blocks for function '${functionName}'.`,
        { line: blocks[1].line }
      );
    }
  }

  const allFunctionCalls = ast.flatMap((x) =>
    x.body.flatMap((s) => getFunctionCalls(s))
  );
  const functionNames = functionBlocks.map((f) => f.identifier);
  for (const functionCall of allFunctionCalls) {
    if (functionNames.includes(functionCall.name)) {
      return;
    }

    throw new ParseError(`Function ${functionCall.name} does not exist.`, {
      line: functionCall.line,
    });
  }
}

function getFunctionCalls(statement: ASTStatement): ASTFunctionCall[] {
  switch (statement.type) {
    case "functionCall":
      return [statement];
    case "if":
      return [
        ...statement.body.flatMap((s) => getFunctionCalls(s)),
        ...statement.elseBody.flatMap((s) => getFunctionCalls(s)),
      ];
    case "repeat":
    case "while":
      return statement.body.flatMap((s) => getFunctionCalls(s));
    case "call":
      return [];
  }
}
