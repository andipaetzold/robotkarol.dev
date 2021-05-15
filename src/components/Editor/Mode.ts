import Ace from "ace-builds/src-noconflict/ace";

const { Mode: TextMode } = Ace.require("ace/mode/text");
const { TextHighlightRules } = Ace.require("ace/mode/text_highlight_rules");

class CustomHighlightRules extends TextHighlightRules {
  $rules = {
    start: [
      ...comments("start"),
      {
        regex: /programm/,
        token: "keyword",
        next: "programbody",
      },
      {
        regex: /anweisung|methode/,
        token: "keyword",
        next: "functionidentifier",
      },
      {
        regex: /bedingung/,
        token: "keyword",
        // next: 'body'
      },
      { caseInsensitive: true },
    ],
    statement: [
      {
        regex: /schritt|hinlegen|aufheben|ton|warten/,
        token: "support.function",
        next: "statement",
      },
      {
        regex: /schritt|hinlegen|aufheben|warten/,
        token: "support.function",
        next: ["statement"],
      },
    ],
  };
}

function comments(next: string) {
  return [
    {
      regex: /\s*(\/\/).*$/,
      token: "comment.line.double-slash",
      next,
    },
    {
      regex: /\{[^\\}]\}/,
      token: "comment.block",
      next,
    },
  ];
}

export default class Mode extends TextMode {
  HighlightRules = CustomHighlightRules;
}
