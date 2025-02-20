import { AddOperationToken } from "#/token";
import { AmperstandToken } from "#/token";
import { AtToken } from "#/token";
import { CloseBracketsToken } from "#/token";
import { CloseCurlyBracketsToken } from "#/token";
import { CloseParenthesesToken } from "#/token";
import { ColonToken } from "#/token";
import { CommaToken } from "#/token";
import { ConstKeywordToken } from "#/token";
import { DivOperationToken } from "#/token";
import { DollarToken } from "#/token";
import { ElseKeywordToken } from "#/token";
import { EqualToken } from "#/token";
import { ExclamationMarkToken } from "#/token";
import { GreaterThanToken } from "#/token";
import { IdentifierToken } from "#/token";
import { IfKeywordToken } from "#/token";
import { LessThanToken } from "#/token";
import { MulOperationToken } from "#/token";
import { NumberLiteralToken } from "#/token";
import { OpenBracketsToken } from "#/token";
import { OpenCurlyBracketsToken } from "#/token";
import { OpenParenthesesToken } from "#/token";
import { PercentOperationToken } from "#/token";
import { PeriodToken } from "#/token";
import { PipeToken } from "#/token";
import { PoundToken } from "#/token";
import { QuestionMarkToken } from "#/token";
import { ReturnKeywordToken } from "#/token";
import { SemiColonToken } from "#/token";
import { StringLiteralToken } from "#/token";
import { SubOperationToken } from "#/token";
import { Token } from "#/token";
import { UnderscoreToken } from "#/token";

type LexerTypeDefinition = (params: { code: string }) => Array<Token>;
export const Lexer: LexerTypeDefinition = ({ code }) => {
  const source: Array<string> = code.split("");
  const tokens: Array<Token> = [];
  let cursor: string | null = null;
  let buffer: string = "";
  let string: string = "";
  let quotes: boolean = false;

  const eat = () => {
    cursor = source.shift() ?? null;
  };

  const isOver = () => {
    return cursor ? false : true;
  };

  const dumpString = () => {
    tokens.push({ value: buffer } as StringLiteralToken);
    string = "";
  };

  const dumpBuffer = () => {
    if (/^-?\d+/.test(buffer)) {
      tokens.push({ value: buffer } as NumberLiteralToken);
    } else if (buffer === "const") {
      tokens.push({ raw: buffer } as ConstKeywordToken);
    } else if (buffer === "return") {
      tokens.push({ raw: buffer } as ReturnKeywordToken);
    } else if (buffer === "if") {
      tokens.push({ raw: buffer } as IfKeywordToken);
    } else if (buffer === "else") {
      tokens.push({ raw: buffer } as ElseKeywordToken);
    } else {
      tokens.push({ value: buffer } as IdentifierToken);
    }
    buffer = "";
  };

  while (!isOver()) {
    if (cursor === '"' && !quotes) {
      quotes = true;
      eat();
      continue;
    }
    if (cursor === '"' && quotes) {
      quotes = false;
      eat();
      dumpString();
      continue;
    }
    if (cursor !== '"' && quotes) {
      string += eat();
      continue;
    }
    if (cursor !== '"' && !quotes) {
      if (cursor !== null) {
        switch (cursor) {
          case "+": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "+" } as AddOperationToken);
            continue;
          }
          case "-": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "-" } as SubOperationToken);
            continue;
          }
          case "*": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "*" } as MulOperationToken);
            continue;
          }
          case "/": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "/" } as DivOperationToken);
            continue;
          }
          case "%": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "%" } as PercentOperationToken);
            continue;
          }
          case "(": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "(" } as OpenParenthesesToken);
            continue;
          }
          case ")": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ")" } as CloseParenthesesToken);
            continue;
          }
          case "[": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "[" } as OpenBracketsToken);
            continue;
          }
          case "]": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "]" } as CloseBracketsToken);
            continue;
          }
          case "{": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "{" } as OpenCurlyBracketsToken);
            continue;
          }
          case "}": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "}" } as CloseCurlyBracketsToken);
            continue;
          }
          case ",": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "," } as CommaToken);
            continue;
          }
          case ":": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ":" } as ColonToken);
            continue;
          }
          case ";": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ";" } as SemiColonToken);
            continue;
          }
          case ".": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "." } as PeriodToken);
            continue;
          }
          case "<": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "<" } as LessThanToken);
            continue;
          }
          case ">": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ">" } as GreaterThanToken);
            continue;
          }
          case "=": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "=" } as EqualToken);
            continue;
          }
          case "?": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "?" } as QuestionMarkToken);
            continue;
          }
          case "!": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "!" } as ExclamationMarkToken);
            continue;
          }
          case "&": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "&" } as AmperstandToken);
            continue;
          }
          case "#": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "#" } as PoundToken);
            continue;
          }
          case "@": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "@" } as AtToken);
            continue;
          }
          case "$": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "$" } as DollarToken);
            continue;
          }
          case "_": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "_" } as UnderscoreToken);
            continue;
          }
          case "|": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "|" } as PipeToken);
            continue;
          }
          default: {
            buffer += eat();
            continue;
          }
        }
      }
    }
  }
  dumpString();
  dumpBuffer();
  return tokens;
};
