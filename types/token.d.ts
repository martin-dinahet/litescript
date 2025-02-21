export type Token =
  | IdentifierToken //
  | LiteralToken //
  | KeywordToken //
  | OperationToken //
  | SymbolToken; //

export type IdentifierToken = {
  value: string;
  debugType: "IdentifierToken";
};

/* */

export type LiteralToken =
  | NumberLiteralToken //
  | StringLiteralToken //
  | BooleanLiteralToken; //

export type NumberLiteralToken = {
  value: string;
  debugType: "NumberLiteralToken";
};

export type StringLiteralToken = {
  value: string;
  debugType: "StringLiteralToken";
};

export type BooleanLiteralToken = {
  value: "true" | "false";
  debugType: "BooleanLiteralToken";
};

/* */

export type KeywordToken =
  | ConstKeywordToken //
  | ReturnKeywordToken //
  | IfKeywordToken //
  | ElseKeywordToken //
  | StructKeywordToken; //

export type ConstKeywordToken = {
  raw: "const";
  debugType: "ConstKeywordToken";
};

export type ReturnKeywordToken = {
  raw: "return";
  debugType: "ReturnKeywordToken";
};

export type IfKeywordToken = {
  raw: "if";
  debugType: "IfKeywordToken";
};

export type ElseKeywordToken = {
  raw: "else";
  debugType: "ElseKeywordToken";
};

export type StructKeywordToken = {
  raw: "struct";
  debugType: "StructKeywordToken";
};

/* */

export type OperationToken =
  | AddOperationToken //
  | SubOperationToken //
  | MulOperationToken //
  | DivOperationToken //
  | PercentOperationToken; //

export type AddOperationToken = {
  raw: "+";
  debugType: "AddOperationToken";
};

export type SubOperationToken = {
  raw: "-";
  debugType: "SubOperationToken";
};

export type MulOperationToken = {
  raw: "*";
  debugType: "MulOperationToken";
};

export type DivOperationToken = {
  raw: "/";
  debugType: "DivOperationToken";
};

export type PercentOperationToken = {
  raw: "%";
  debugType: "PercentOperationToken";
};

/* */

export type SymbolToken =
  | OpenParenthesesToken //
  | CloseParenthesesToken //
  | OpenBracketsToken //
  | CloseBracketsToken //
  | OpenCurlyBracketsToken //
  | CloseCurlyBracketsToken //
  | CommaToken //
  | ColonToken //
  | SemiColonToken //
  | PeriodToken //
  | LessThanToken //
  | GreaterThanToken //
  | EqualToken //
  | QuestionMarkToken //
  | ExclamationMarkToken //
  | AmperstandToken //
  | PoundToken //
  | AtToken //
  | DollarToken //
  | UnderscoreToken //
  | PipeToken; //

export type OpenParenthesesToken = {
  raw: "(";
  debugType: "OpenParenthesesToken";
};

export type CloseParenthesesToken = {
  raw: ")";
  debugType: "CloseParenthesesToken";
};

export type OpenBracketsToken = {
  raw: "[";
  debugType: "OpenBracketsToken";
};

export type CloseBracketsToken = {
  raw: "]";
  debugType: "CloseBracketsToken";
};

export type OpenCurlyBracketsToken = {
  raw: "{";
  debugType: "OpenCurlyBracketsToken";
};

export type CloseCurlyBracketsToken = {
  raw: "}";
  debugType: "CloseCurlyBracketsToken";
};

export type CommaToken = {
  raw: ",";
  debugType: "CommaToken";
};

export type ColonToken = {
  raw: ":";
  debugType: "ColonToken";
};

export type SemiColonToken = {
  raw: ";";
  debugType: "SemiColonToken";
};

export type PeriodToken = {
  raw: ".";
  debugType: "PeriodToken";
};

export type LessThanToken = {
  raw: "<";
  debugType: "LessThanToken";
};

export type GreaterThanToken = {
  raw: ">";
  debugType: "GreaterThanToken";
};

export type EqualToken = {
  raw: "=";
  debugType: "EqualToken";
};

export type QuestionMarkToken = {
  raw: "?";
  debugType: "QuestionMarkToken";
};

export type ExclamationMarkToken = {
  raw: "!";
  debugType: "ExclamationMarkToken";
};

export type AmperstandToken = {
  raw: "&";
  debugType: "AmperstandToken";
};

export type PoundToken = {
  raw: "#";
  debugType: "PoundToken";
};

export type AtToken = {
  raw: "@";
  debugType: "AtToken";
};

export type DollarToken = {
  raw: "$";
  debugType: "DollarToken";
};

export type UnderscoreToken = {
  raw: "_";
  debugType: "UnderscoreToken";
};

export type PipeToken = {
  raw: "|";
  debugType: "PipeToken";
};
