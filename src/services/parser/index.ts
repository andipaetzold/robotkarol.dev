import { groupBy } from "lodash";
import { ParseError, ParseErrorData } from "./ParseError";
import { Parser } from "./parser";
import { AST, ASTFunctionCall, ASTStatement } from "./types";

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
  const functionBlocksByName = groupBy(ast.functions, (f) => f.identifier);
  for (const [functionName, blocks] of Object.entries(functionBlocksByName)) {
    if (blocks.length > 1) {
      throw new ParseError(
        `Duplicate function blocks for function '${functionName}'.`,
        { line: blocks[1].line }
      );
    }
  }

  const allFunctionCalls = [...ast.functions, ast.program].flatMap((x) =>
    x.body.flatMap((s) => getFunctionCalls(s))
  );
  const functionNames = ast.functions.map((f) => f.identifier);
  for (const functionCall of allFunctionCalls) {
    if (functionNames.includes(functionCall.name)) {
      continue;
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
    case "systemCall":
      return [];
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
