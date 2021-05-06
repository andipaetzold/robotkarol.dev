const { Parser } = require("jison");
const { writeFileSync } = require("fs");

const grammar = {
  lex: {
    options: {
      "case-insensitive": true,
    },
    rules: [
      ["\\s+", "/* skip whitespace */"],
      ["\\{[^\\}]+\\}", "/* skip comments */"],
      ["programm\\b", "return 'PROGRAM_BEGIN'"],
      ["\\*programm\\b", "return 'PROGRAM_END'"],
      ["endeprogramm\\b", "return 'PROGRAM_END'"],
      ["anweisung\\b", "return 'FUNCTION_BEGIN'"],
      ["\\*anweisung\\b", "return 'FUNCTION_END'"],
      ["endeanweisung\\b", "return 'FUNCTION_END'"],
      ["schritt\\b", "return 'STEP'"],
      ["linksdrehen\\b", "return 'TURN_LEFT'"],
      ["rechtsdrehen\\b", "return 'TURN_RIGHT'"],
      ["hinlegen\\b", "return 'BRICK_PUT'"],
      ["aufheben\\b", "return 'BRICK_TAKE'"],
      ["markesetzen\\b", "return 'MARKER_SET'"],
      ["markelöschen\\b", "return 'MARKER_REMOVE'"],
      ["wiederhole\\b", "return 'REPEAT_BEGIN'"],
      ["\\*wiederhole\\b", "return 'REPEAT_END'"],
      ["solange\\b", "return 'WHILE'"],
      ["mal\\b", "return 'TIMES'"],
      ["wenn\\b", "return 'IF'"],
      ["dann\\b", "return 'THEN'"],
      ["endewenn\\b", "return 'IF_END'"],
      ["\\*wenn\\b", "return 'IF_END'"],
      ["sonst\\b", "return 'ELSE'"],
      ["istwand\\b", "return 'IS_WALL'"],
      ["nichtistwand\\b", "return 'NOT_IS_WALL'"],
      ["istziegel\\b", "return 'IS_BRICK'"],
      ["nichtistziegel\\b", "return 'NOT_IS_BRICK'"],
      ["istnorden\\b", "return 'IS_NORTH'"],
      ["istosten\\b", "return 'IS_EAST'"],
      ["istsüden\\b", "return 'IS_SOUTH'"],
      ["istwesten\\b", "return 'IS_WEST'"],
      ["nicht\\b", "return 'NOT'"],
      ["istmarke\\b", "return 'IS_MARKER'"],
      ["nichtistmarke\\b", "return 'NOT_IS_MARKER'"],
      ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER'"],
      ["[a-z]+\\b", "return 'IDENTIFIER'"],
    ],
  },

  bnf: {
    start: [["segments", "return $1"]],
    segments: [
      ["segment", "$$ = [$1]"],
      ["segment segments", "$$ = [$1, ...$2]"],
    ],
    segment: [
      [
        "PROGRAM_BEGIN statements PROGRAM_END",
        "$$ = { type: 'program', line: yylineno, body: $2 }",
      ],
      ["PROGRAM_BEGIN PROGRAM_END", "$$ = { type: 'program', line: yylineno, body: [] }"],
      [
        "FUNCTION_BEGIN IDENTIFIER statements FUNCTION_END",
        "$$ = { type: 'function', line: yylineno, identifier: $2, body: $3 }",
      ],
      [
        "FUNCTION_BEGIN IDENTIFIER FUNCTION_END",
        "$$ = { type: 'function', line: yylineno, identifier: $2, body: [] }",
      ],
    ],
    statements: [
      ["statement", "$$ = [$1]"],
      ["statement statements", "$$ = [$1, ...$2]"],
    ],
    statement: [
      ["STEP", "$$ = { type: 'call', line: yylineno, action: 'STEP' }"],
      ["TURN_LEFT", "$$ = { type: 'call', line: yylineno, action: 'TURN_LEFT' }"],
      ["TURN_RIGHT", "$$ = { type: 'call', line: yylineno, action: 'TURN_RIGHT' }"],
      ["BRICK_PUT", "$$ = { type: 'call', line: yylineno, action: 'BRICK_PUT' }"],
      ["BRICK_TAKE", "$$ = { type: 'call', line: yylineno, action: 'BRICK_TAKE' }"],
      ["MARKER_SET", "$$ = { type: 'call', line: yylineno, action: 'MARKER_SET' }"],
      ["MARKER_REMOVE", "$$ = { type: 'call', line: yylineno, action: 'MARKER_REMOVE' }"],
      [
        "REPEAT_BEGIN NUMBER TIMES statements REPEAT_END",
        "$$ = { type: 'repeat', line: yylineno, times: $2, body: $4 }",
      ],
      [
        "REPEAT_BEGIN WHILE condition statements REPEAT_END",
        "$$ = { type: 'while', line: yylineno, condition: $3, body: $4 }",
      ],
      [
        "IF condition THEN statements IF_END",
        "$$ = { type: 'if', line: yylineno, condition: $2, body: $4, elseBody: [] }",
      ],
      [
        "IF condition THEN statements ELSE statements IF_END",
        "$$ = { type: 'if', line: yylineno, condition: $2, body: $4, elseBody: $6 }",
      ],
      ["IDENTIFIER", "$$ = { type: 'functionCall', name: $1, line: yylineno }",]
    ],
    condition: [
      ["NOT condition", "$$ = { type: 'not', line: yylineno, condition: $2 }"],
      ["IS_WALL", "$$ = { type: 'expression', line: yylineno, test: 'IS_WALL' }"],
      ["NOT_IS_WALL", "$$ = { type: 'expression', line: yylineno, test: 'NOT_IS_WALL' }"],
      ["IS_BRICK", "$$ = { type: 'expression', line: yylineno, test: 'IS_BRICK' }"],
      ["NOT_IS_BRICK", "$$ = { type: 'expression', line: yylineno, test: 'NOT_IS_BRICK' }"],
      ["IS_MARKER", "$$ = { type: 'expression', line: yylineno, test: 'IS_MARKER' }"],
      ["NOT_IS_MARKER", "$$ = { type: 'expression', line: yylineno, test: 'NOT_IS_MARKER' }"],
      ["IS_NORTH", "$$ = { type: 'expression', line: yylineno, test: 'IS_NORTH' }"],
      ["IS_WEST", "$$ = { type: 'expression', line: yylineno, test: 'IS_WEST' }"],
      ["IS_SOUTH", "$$ = { type: 'expression', line: yylineno, test: 'IS_SOUTH' }"],
      ["IS_EAST", "$$ = { type: 'expression', line: yylineno, test: 'IS_EAST' }"],
    ],
  },
};

const parser = new Parser(grammar);
const code = parser.generate();
writeFileSync(`${__dirname}/parser.js`, code);
