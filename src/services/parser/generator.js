const { Parser } = require("jison");
const { writeFileSync } = require("fs");

const grammar = {
  lex: {
    options: {
      "case-insensitive": true,
    },
    rules: [
      ["\\s+", "/* skip whitespace */"],

      ["\\{[^\\}]*\\}", "/* skip multiline comments */"],
      ["\\/\\/[^\\n]*", "/* skip single line comments */"],

      ["programm\\b", "return 'PROGRAM_BEGIN'"],
      ["(\\*programm|endeprogramm)\\b", "return 'PROGRAM_END'"],
      ["anweisung\\b", "return 'FUNCTION_BEGIN'"],
      ["(\\*anweisung|endeanweisung)\\b", "return 'FUNCTION_END'"],

      ["schritt\\b", "return 'STEP'"],
      ["linksdrehen\\b", "return 'TURN_LEFT'"],
      ["rechtsdrehen\\b", "return 'TURN_RIGHT'"],
      ["hinlegen\\b", "return 'BRICK_PUT'"],
      ["aufheben\\b", "return 'BRICK_TAKE'"],
      ["markesetzen\\b", "return 'MARKER_SET'"],
      ["markelöschen\\b", "return 'MARKER_REMOVE'"],

      ["wiederhole\\b", "return 'REPEAT_BEGIN'"],
      ["(\\*wiederhole|endewiederhole)\\b", "return 'REPEAT_END'"],
      ["immer\\b", "return 'ALWAYS'"],
      ["solange\\b", "return 'WHILE'"],
      ["(\\*solange|endesolange)\\b", "return 'WHILE_END'"],
      ["mal\\b", "return 'TIMES'"],

      ["wenn\\b", "return 'IF'"],
      ["dann\\b", "return 'THEN'"],
      ["(\\*wenn|endewenn)\\b", "return 'IF_END'"],
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

      ["schnell\\b", "return 'FAST'"],
      ["langsam\\b", "return 'SLOW'"],
      ["beenden\\b", "return 'EXIT'"],
      ["ton\\b", "return 'SOUND'"],

      ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER'"],
      ["[a-z0-9_\\-äöüß]+\\b", "return 'IDENTIFIER'"],
    ],
  },

  bnf: {
    start: [
      [
        "segments",
        `return {
      type: 'ast',
      functions: $1.filter(s => s.type === 'function'),
      program: $1.find(s => s.type === 'program') ??
        {
          type: 'program',
          line: $1.filter(s => s.type !== 'function').filter(s => s.type !== 'program')[0]?.line ?? 0,
          body: $1.filter(s => s.type !== 'function').filter(s => s.type !== 'program')
        }
    }`,
      ],
    ],
    segments: [
      ["segment", "$$ = [$1]"],
      ["segment segments", "$$ = [$1, ...$2]"],
    ],
    segment: [
      ["program", "$$ = $1"],
      ["function", "$$ = $1"],
      ["statement", "$$ = $1"],
    ],
    program: [
      [
        "PROGRAM_BEGIN statements PROGRAM_END",
        "$$ = { type: 'program', line: yylineno, body: $2 }",
      ],
      [
        "PROGRAM_BEGIN PROGRAM_END",
        "$$ = { type: 'program', line: yylineno, body: [] }",
      ],
    ],
    function: [
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
      [
        "TURN_LEFT",
        "$$ = { type: 'call', line: yylineno, action: 'TURN_LEFT' }",
      ],
      [
        "TURN_RIGHT",
        "$$ = { type: 'call', line: yylineno, action: 'TURN_RIGHT' }",
      ],
      [
        "BRICK_PUT",
        "$$ = { type: 'call', line: yylineno, action: 'BRICK_PUT' }",
      ],
      [
        "BRICK_TAKE",
        "$$ = { type: 'call', line: yylineno, action: 'BRICK_TAKE' }",
      ],
      [
        "MARKER_SET",
        "$$ = { type: 'call', line: yylineno, action: 'MARKER_SET' }",
      ],
      [
        "MARKER_REMOVE",
        "$$ = { type: 'call', line: yylineno, action: 'MARKER_REMOVE' }",
      ],

      ["SLOW", "$$ = { type: 'systemCall', line: yylineno, action: 'slow' }"],
      ["FAST", "$$ = { type: 'systemCall', line: yylineno, action: 'fast' }"],
      ["EXIT", "$$ = { type: 'systemCall', line: yylineno, action: 'exit' }"],
      ["SOUND", "$$ = { type: 'systemCall', line: yylineno, action: 'sound' }"],

      [
        "REPEAT_BEGIN NUMBER TIMES statements REPEAT_END",
        "$$ = { type: 'repeat', line: yylineno, times: $2, body: $4 }",
      ],
      [
        "REPEAT_BEGIN ALWAYS statements REPEAT_END",
        "$$ = { type: 'repeat', line: yylineno, times: Infinity, body: $3 }",
      ],
      [
        "REPEAT_BEGIN WHILE condition statements REPEAT_END",
        "$$ = { type: 'while', line: yylineno, condition: $3, body: $4 }",
      ],
      [
        "WHILE condition statements WHILE_END",
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

      ["IDENTIFIER", "$$ = { type: 'functionCall', name: $1, line: yylineno }"],
    ],
    condition: [
      ["NOT condition", "$$ = { type: 'not', line: yylineno, condition: $2 }"],
      [
        "IS_WALL",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_WALL' }",
      ],
      [
        "NOT_IS_WALL",
        "$$ = { type: 'expression', line: yylineno, test: 'NOT_IS_WALL' }",
      ],
      [
        "IS_BRICK",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_BRICK' }",
      ],
      [
        "NOT_IS_BRICK",
        "$$ = { type: 'expression', line: yylineno, test: 'NOT_IS_BRICK' }",
      ],
      [
        "IS_MARKER",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_MARKER' }",
      ],
      [
        "NOT_IS_MARKER",
        "$$ = { type: 'expression', line: yylineno, test: 'NOT_IS_MARKER' }",
      ],
      [
        "IS_NORTH",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_NORTH' }",
      ],
      [
        "IS_WEST",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_WEST' }",
      ],
      [
        "IS_SOUTH",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_SOUTH' }",
      ],
      [
        "IS_EAST",
        "$$ = { type: 'expression', line: yylineno, test: 'IS_EAST' }",
      ],
    ],
  },
};

const parser = new Parser(grammar);
const code = parser.generate({ moduleType: "js" });
writeFileSync(
  `${__dirname}/parser.js`,
  `${code}
export const Parser = parser.Parser;
export const parse = function () { return parser.parse.apply(parser, arguments); };`
);
