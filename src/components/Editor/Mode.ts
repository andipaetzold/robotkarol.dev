import Ace from "ace-builds/src-noconflict/ace";

const { Mode: TextMode } = Ace.require("ace/mode/text");
const { TextHighlightRules } = Ace.require("ace/mode/text_highlight_rules");

const identifier = "[a-z0-9_\\-äöüß]+";
const builtinCondition =
  "istziegel|nichtistziegel|istwand|nichtistwand|istmarke|nichtistmarke|istvoll|nichtistvoll|istleer|nichtistleer|hatziegel";

class CustomHighlightRules extends TextHighlightRules {
  $rules = {
    start: [
      { regex: /(\s*)(\/\/.*)$/, token: ["text", "comment.line.double-slash"] },
      {
        token: "comment.start",
        regex: /\{(?!\})/,
        push: "blockComment",
      },
      {
        regex: "(programm|endeprogramm|\\*programm)(\\s+|$)",
        token: ["keyword", "text"],
      },
      {
        regex: `(anweisung|methode)(\\s*)(${identifier})(\\s+|$)`,
        token: ["keyword", "text", "entity.name.function", "text"],
      },
      {
        regex: `(bedingung)(\\s*)(${identifier})(\\s+|$)`,
        token: ["keyword", "text", "entity.name.function", "text"],
      },
      {
        regex: /(wiederhole)(\s+)([0-9]+)(\s+)(mal)(\\s+|$)/,
        token: [
          "keyword",
          "text",
          "constant.numeric",
          "text",
          "keyword",
          "text",
        ],
      },
      {
        regex: `((wiederhole\\s+)?solange)(\\s+)((nicht\\s+)?)((${builtinCondition})|(${identifier}))(\\s+|$)`,
        token: [
          "keyword",
          "keyword",
          "text",
          "keyword",
          "keyword",
          "",
          "support.function",
          "variable.other",
          "text",
        ],
      },
      {
        regex: `(\\*(wiederhole|solange))(\\s+)(bis|solange)(\\s+)((nicht\\s+)?)((${builtinCondition})|(${identifier}))(\\s+|$)`,
        token: [
          "keyword",
          "keyword",
          "text",
          "keyword",
          "text",
          "keyword",
          "keyword",
          "",
          "support.function",
          "variable.other",
          "text",
        ],
      },
      {
        regex:
          /(wiederhole|solange|bis|endewiederhole|mal|\\*wiederhole|\\*solange)(\\s+|$)/,
        token: ["keyword", "text"],
      },
      {
        regex: `(wenn)(\\s+)((nicht\\s+)?)((${builtinCondition})|(${identifier}))(\\s+)(dann)(\\s+|$)`,
        token: [
          "keyword",
          "text",
          "keyword",
          "keyword",
          "",
          "support.function",
          "variable.other",
          "text",
          "keyword",
          "text",
        ],
      },
      {
        regex: /(wenn|dann|sonst|\\*wenn|endewenn)(\\s+|$)/,
        token: ["keyword", "text"],
      },
      {
        regex: /((ende|\\*)(anweisung|methode|bedingung))(\\s+|$)/,
        token: ["keyword", "keyword", "keyword", "text"],
      },
      {
        regex:
          /(schritt|linksdrehen|rechtsdrehen|hinlegen|aufheben|markesetzen|markelöschen|ton|warten)(;?)(\\s+|$)/,
        token: ["support.function", "keyword.other", "text"],
      },
      {
        regex: /(schnell|langsam|wahr|falsch)(;?)(\\s+|$)/,
        token: ["keyword", "keyword.other", "text"],
      },
      {
        regex: /(schritt|hinlegen|aufheben|warten)(\()(\d+)(\))(\\s+|$)/,
        token: [
          "support.function",
          "paren.lparen",
          "constant.numeric",
          "paren.rparen",
          "text",
        ],
      },
      {
        regex: "(identifier)(;?)",
        token: ["variable.other", "keyword.other"],
      },
      { caseInsensitive: true, defaultToken: "text" },
    ],
    blockComment: [
      {
        regex: /\((?!\})/,
        token: "comment.start",
        push: "blockComment",
      },
      {
        regex: /\}/,
        token: "comment.end",
        next: "pop",
      },
      {
        defaultToken: "comment",
      },
    ],
  };
}
export default class Mode extends TextMode {
  HighlightRules = CustomHighlightRules;
}
