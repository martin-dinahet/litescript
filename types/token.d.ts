export type Token = {
  //
};

/* */

export type IdentifierToken = Token & {
  value: string;
};

/* */

export type LiteralToken = Token & {
  //
};

export type NumberLiteralToken = LiteralToken & {
  value: string;
};

export type StringLiteralToken = LiteralToken & {
  value: string;
};

export type BooleanLiteralToken = LiteralToken & {
  value: "true" | "false";
};

/* */

export type KeywordToken = Token & {
  //
};

export type ConstKeywordToken = KeywordToken & {
  raw: "const";
};

export type ReturnKeywordToken = KeywordToken & {
  raw: "return";
};

export type IfKeywordToken = KeywordToken & {
  raw: "if";
};

export type ElseKeywordToken = KeywordToken & {
  raw: "else";
};

/* */

export type OperationToken = Token & {
  //
};

export type AddOperationToken = OperationToken & {
  raw: "+";
};

export type SubOperationToken = OperationToken & {
  raw: "-";
};

export type MulOperationToken = OperationToken & {
  raw: "*";
};

export type DivOperationToken = OperationToken & {
  raw: "/";
};

export type PercentOperationToken = OperationToken & {
  raw: "%";
};

/* */

export type SymbolToken = Token & {
  //
};

export type OpenParenthesesToken = SymbolToken & {
  raw: "(";
};

export type CloseParenthesesToken = SymbolToken & {
  raw: ")";
};

export type OpenBracketsToken = SymbolToken & {
  raw: "[";
};

export type CloseBracketsToken = SymbolToken & {
  raw: "]";
};

export type OpenCurlyBracketsToken = SymbolToken & {
  raw: "{";
};

export type CloseCurlyBracketsToken = SymbolToken & {
  raw: "}";
};

export type CommaToken = SymbolToken & {
  raw: ",";
};

export type ColonToken = SymbolToken & {
  raw: ":";
};

export type SemiColonToken = SymbolToken & {
  raw: ";";
};

export type PeriodToken = SymbolToken & {
  raw: ".";
};

export type LessThanToken = SymbolToken & {
  raw: "<";
};

export type GreaterThanToken = SymbolToken & {
  raw: ">";
};

export type EqualToken = SymbolToken & {
  raw: "=";
};

export type QuestionMarkToken = SymbolToken & {
  raw: "?";
};

export type ExclamationMarkToken = SymbolToken & {
  raw: "!";
};

export type AmperstandToken = SymbolToken & {
  raw: "&";
};

export type PoundToken = SymbolToken & {
  raw: "#";
};

export type AtToken = SymbolToken & {
  raw: "@";
};

export type DollarToken = SymbolToken & {
  raw: "$";
};

export type UnderscoreToken = SymbolToken & {
  raw: "_";
};

export type PipeToken = SymbolToken & {
  raw: "|";
};
