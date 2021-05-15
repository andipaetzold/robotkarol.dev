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

      ["(anweisung|methode)\\b", "return 'FUNCTION_BEGIN'"],
      [
        "(\\*anweisung|endeanweisung|\\*methode|endemethode)\\b",
        "return 'FUNCTION_END'",
      ],

      ["bedingung\\b", "return 'CONDITION_BEGIN'"],
      ["(\\*bedingung|endebedingung)\\b", "return 'CONDITION_END'"],

      ["schritt\\b", "return 'STEP'"],
      ["linksdrehen\\b", "return 'TURN_LEFT'"],
      ["rechtsdrehen\\b", "return 'TURN_RIGHT'"],
      ["hinlegen\\b", "return 'BRICK_PUT'"],
      ["aufheben\\b", "return 'BRICK_TAKE'"],
      ["markesetzen\\b", "return 'MARKER_SET'"],
      ["markelöschen\\b", "return 'MARKER_REMOVE'"],
      ["ton\\b", "return 'SOUND'"],
      ["warten\\b", "return 'WAIT'"],

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
      ["istvoll\\b", "return 'IS_FULL'"],
      ["nichtistvoll\\b", "return 'NOT_IS_FULL'"],
      ["istleer\\b", "return 'IS_EMPTY'"],
      ["nichtistleer\\b", "return 'NOT_IS_EMPTY'"],
      ["hatziegel\\b", "return 'HAS_BRICKS'"],

      ["schnell\\b", "return 'FAST'"],
      ["langsam\\b", "return 'SLOW'"],
      ["beenden\\b", "return 'EXIT'"],
      ["falsch\\b", "return 'FALSE'"],
      ["wahr\\b", "return 'TRUE'"],

      ["\\(", "return '('"],
      ["\\)", "return ')'"],

      ["[0-9]+(?:\\.[0-9]+)?", "return 'NUMBER'"],
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
      conditions: $1.filter(s => s.type === 'condition'),
      program: $1.find(s => s.type === 'program') ??
        {
          type: 'program',
          line: $1.filter(s => s.type !== 'function').filter(s => s.type !== 'condition').filter(s => s.type !== 'program')[0]?.line ?? 0,
          body: $1.filter(s => s.type !== 'function').filter(s => s.type !== 'condition').filter(s => s.type !== 'program')
        }
    }`,
      ],
    ],
    segments: [
      ["segment", "$$ = [$1]"],
      ["segment segments", "$$ = [$1, ...$2]"],
    ],
    segment: [
      ["segment_program", "$$ = $1"],
      ["segment_function", "$$ = $1"],
      ["segment_condition", "$$ = $1"],
      ["statement", "$$ = $1"],
    ],
    segment_program: [
      [
        "PROGRAM_BEGIN statements PROGRAM_END",
        "$$ = { type: 'program', line: yylineno, body: $2 }",
      ],
      [
        "PROGRAM_BEGIN PROGRAM_END",
        "$$ = { type: 'program', line: yylineno, body: [] }",
      ],
    ],
    segment_function: [
      [
        "FUNCTION_BEGIN IDENTIFIER statements FUNCTION_END",
        "$$ = { type: 'function', line: yylineno, identifier: $2.toLocaleLowerCase(), body: $3 }",
      ],
      [
        "FUNCTION_BEGIN IDENTIFIER FUNCTION_END",
        "$$ = { type: 'function', line: yylineno, identifier: $2.toLocaleLowerCase(), body: [] }",
      ],
    ],
    segment_condition: [
      [
        "CONDITION_BEGIN IDENTIFIER statements CONDITION_END",
        "$$ = { type: 'condition', line: yylineno, identifier: $2.toLocaleLowerCase(), body: $3 }",
      ],
      [
        "CONDITION_BEGIN IDENTIFIER CONDITION_END",
        "$$ = { type: 'condition', line: yylineno, identifier: $2.toLocaleLowerCase(), body: [] }",
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
      ["SOUND", "$$ = { type: 'call', line: yylineno, action: 'SOUND' }"],
      [
        "WAIT ( NUMBER )",
        "$$ = { type: 'call', line: yylineno, action: 'WAIT' }",
      ],

      ["SLOW", "$$ = { type: 'systemCall', line: yylineno, action: 'SLOW' }"],
      ["FAST", "$$ = { type: 'systemCall', line: yylineno, action: 'FAST' }"],
      ["EXIT", "$$ = { type: 'systemCall', line: yylineno, action: 'EXIT' }"],
      ["FALSE", "$$ = { type: 'systemCall', line: yylineno, action: 'FALSE' }"],
      ["TRUE", "$$ = { type: 'systemCall', line: yylineno, action: 'TRUE' }"],

      [
        "REPEAT_BEGIN NUMBER TIMES statements REPEAT_END",
        "$$ = { type: 'repeat', line: yylineno, times: $2, body: $4 }",
      ],
      [
        "REPEAT_BEGIN ALWAYS statements REPEAT_END",
        "$$ = { type: 'repeat', line: yylineno, times: Infinity, body: $3 }",
      ],
      [
        "REPEAT_BEGIN WHILE test statements REPEAT_END",
        "$$ = { type: 'while', line: yylineno, test: $3, body: $4 }",
      ],
      [
        "WHILE test statements WHILE_END",
        "$$ = { type: 'while', line: yylineno, test: $3, body: $4 }",
      ],

      [
        "IF test THEN statements IF_END",
        "$$ = { type: 'if', line: yylineno, test: $2, body: $4, elseBody: [] }",
      ],
      [
        "IF test THEN statements ELSE statements IF_END",
        "$$ = { type: 'if', line: yylineno, test: $2, body: $4, elseBody: $6 }",
      ],

      [
        "IDENTIFIER",
        "$$ = { type: 'functionCall', name: $1.toLocaleLowerCase(), line: yylineno }",
      ],
    ],
    test: [
      ["NOT test", "$$ = { type: 'not', line: yylineno, test: $2 }"],
      ...createState("IS_WALL"),
      ...createState("NOT_IS_WALL"),
      ...createState("IS_BRICK", true),
      ...createState("NOT_IS_BRICK", true),
      ...createState("IS_MARKER"),
      ...createState("NOT_IS_MARKER"),
      ...createState("IS_NORTH"),
      ...createState("IS_WEST"),
      ...createState("IS_SOUTH"),
      ...createState("IS_EAST"),
      ...createState("IS_FULL"),
      ...createState("NOT_IS_FULL"),
      ...createState("IS_EMPTY"),
      ...createState("NOT_IS_EMPTY"),
      ...createState("HAS_BRICKS"),
      [
        "IDENTIFIER",
        "$$ = { type: 'conditionCall', line: yylineno, name: $1.toLocaleLowerCase() }",
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

function createState(name, param = false) {
  const alternatives = [];
  alternatives.push([
    name,
    `$$ = { type: 'state', line: yylineno, state: '${name}' }`,
  ]);

  if (param) {
    alternatives.push([
      `${name} ( NUMBER )`,
      `$$ = { type: 'state', line: yylineno, state: '${name}', params: +$3 }`,
    ]);
  }

  return alternatives;
}
