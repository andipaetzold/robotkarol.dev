import { countBy, identity } from "lodash";
import { parse as parseCode } from "./parser";
import { AST, ASTFunction, ASTFunctionCall, ASTStatement } from "./types";

export function parse(code: string): AST {
  const ast = parseCode(code);
  validate(ast);
  return ast;
}

export function validate(ast: AST) {
  // program block
  const programs = ast.filter((x) => x.type === "program");
  if (programs.length !== 1) {
    throw new Error("The code must have exactly one program block");
  }

  // functions
  const functionNames = ast
    .filter((x): x is ASTFunction => x.type === "function")
    .map((f) => f.identifier);

  const functionBlockCountByName = countBy(functionNames, identity);
  for (const [functionName, count] of Object.entries(
    functionBlockCountByName
  )) {
    if (count > 1) {
      throw new Error(`There are two blocks for function ${functionName}.`);
    }
  }

  const allFunctionCalls = ast.flatMap((x) =>
    x.body.flatMap((s) => getFunctionCalls(s))
  );
  console.log(allFunctionCalls)
  for (const functionCall of allFunctionCalls) {
    if (functionNames.includes(functionCall.name)) {
      return;
    }

    throw new Error(
      `Function ${functionCall.name} does not exist (line ${functionCall.line})`
    );
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
