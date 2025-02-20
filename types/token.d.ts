export type Token = {
  //
};

/* */

export type IdentifierToken = Token & {
  value: string;
  debugType: "IdentifierToken";
};

/* */

export type LiteralToken = Token & {
  //
};

export type NumberLiteralToken = LiteralToken & {
  value: string;
  debugType: "NumberLiteralToken";
};

export type StringLiteralToken = LiteralToken & {
  value: string;
  debugType: "StringLiteralToken";
};

export type BooleanLiteralToken = LiteralToken & {
  value: "true" | "false";
  debugType: "BooleanLiteralToken";
};

/* */

export type KeywordToken = Token & {
  //
};

export type ConstKeywordToken = KeywordToken & {
  raw: "const";
  debugType: "ConstKeywordToken";
};

export type ReturnKeywordToken = KeywordToken & {
  raw: "return";
  debugType: "ReturnKeywordToken";
};

export type IfKeywordToken = KeywordToken & {
  raw: "if";
  debugType: "IfKeywordToken";
};

export type ElseKeywordToken = KeywordToken & {
  raw: "else";
  debugType: "ElseKeywordToken";
};

/* */

export type OperationToken = Token & {
  //
};

export type AddOperationToken = OperationToken & {
  raw: "+";
  debugType: "AddOperationToken";
};

export type SubOperationToken = OperationToken & {
  raw: "-";
  debugType: "SubOperationToken";
};

export type MulOperationToken = OperationToken & {
  raw: "*";
  debugType: "MulOperationToken";
};

export type DivOperationToken = OperationToken & {
  raw: "/";
  debugType: "DivOperationToken";
};

export type PercentOperationToken = OperationToken & {
  raw: "%";
  debugType: "PercentOperationToken";
};

/* */

export type SymbolToken = Token & {
  //
};

export type OpenParenthesesToken = SymbolToken & {
  raw: "(";
  debugType: "OpenParenthesesToken";
};

export type CloseParenthesesToken = SymbolToken & {
  raw: ")";
  debugType: "CloseParenthesesToken";
};

export type OpenBracketsToken = SymbolToken & {
  raw: "[";
  debugType: "OpenBracketsToken";
};

export type CloseBracketsToken = SymbolToken & {
  raw: "]";
  debugType: "CloseBracketsToken";
};

export type OpenCurlyBracketsToken = SymbolToken & {
  raw: "{";
  debugType: "OpenCurlyBracketsToken";
};

export type CloseCurlyBracketsToken = SymbolToken & {
  raw: "}";
  debugType: "CloseCurlyBracketsToken";
};

export type CommaToken = SymbolToken & {
  raw: ",";
  debugType: "CommaToken";
};

export type ColonToken = SymbolToken & {
  raw: ":";
  debugType: "ColonToken";
};

export type SemiColonToken = SymbolToken & {
  raw: ";";
  debugType: "SemiColonToken";
};

export type PeriodToken = SymbolToken & {
  raw: ".";
  debugType: "PeriodToken";
};

export type LessThanToken = SymbolToken & {
  raw: "<";
  debugType: "LessThanToken";
};

export type GreaterThanToken = SymbolToken & {
  raw: ">";
  debugType: "GreaterThanToken";
};

export type EqualToken = SymbolToken & {
  raw: "=";
  debugType: "EqualToken";
};

export type QuestionMarkToken = SymbolToken & {
  raw: "?";
  debugType: "QuestionMarkToken";
};

export type ExclamationMarkToken = SymbolToken & {
  raw: "!";
  debugType: "ExclamationMarkToken";
};

export type AmperstandToken = SymbolToken & {
  raw: "&";
  debugType: "AmperstandToken";
};

export type PoundToken = SymbolToken & {
  raw: "#";
  debugType: "PoundToken";
};

export type AtToken = SymbolToken & {
  raw: "@";
  debugType: "AtToken";
};

export type DollarToken = SymbolToken & {
  raw: "$";
  debugType: "DollarToken";
};

export type UnderscoreToken = SymbolToken & {
  raw: "_";
  debugType: "UnderscoreToken";
};

export type PipeToken = SymbolToken & {
  raw: "|";
  debugType: "PipeToken";
};
