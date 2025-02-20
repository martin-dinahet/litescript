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
  let cursor: string | null = source[0];
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
    if (string.length >= 1) {
      tokens.push({ value: buffer, debugType: "StringLiteralToken" } as StringLiteralToken);
      string = "";
    }
  };

  const dumpBuffer = () => {
    if (buffer.length >= 1) {
      if (/^-?\d+/.test(buffer)) {
        tokens.push({ value: buffer, debugType: "NumberLiteralToken" } as NumberLiteralToken);
      } else if (buffer === "const") {
        tokens.push({ raw: buffer, debugType: "ConstKeywordToken" } as ConstKeywordToken);
      } else if (buffer === "return") {
        tokens.push({ raw: buffer, debugType: "ReturnKeywordToken" } as ReturnKeywordToken);
      } else if (buffer === "if") {
        tokens.push({ raw: buffer, debugType: "IfKeywordToken" } as IfKeywordToken);
      } else if (buffer === "else") {
        tokens.push({ raw: buffer, debugType: "ElseKeywordToken" } as ElseKeywordToken);
      } else {
        tokens.push({ value: buffer, debugType: "IdentifierToken" } as IdentifierToken);
      }
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
      string += cursor;
      eat();
      continue;
    }
    if (cursor !== '"' && !quotes) {
      if (cursor !== null) {
        switch (cursor) {
          case "\n": {
            dumpBuffer();
            eat();
            continue;
          }
          case "\t": {
            dumpBuffer();
            eat();
            continue;
          }
          case " ": {
            dumpBuffer();
            eat();
            continue;
          }
          case "+": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "+", debugType: "AddOperationToken" } as AddOperationToken);
            continue;
          }
          case "-": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "-", debugType: "SubOperationToken" } as SubOperationToken);
            continue;
          }
          case "*": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "*", debugType: "MulOperationToken" } as MulOperationToken);
            continue;
          }
          case "/": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "/", debugType: "DivOperationToken" } as DivOperationToken);
            continue;
          }
          case "%": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "%", debugType: "PercentOperationToken" } as PercentOperationToken);
            continue;
          }
          case "(": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "(", debugType: "OpenParenthesesToken" } as OpenParenthesesToken);
            continue;
          }
          case ")": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ")", debugType: "CloseParenthesesToken" } as CloseParenthesesToken);
            continue;
          }
          case "[": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "[", debugType: "OpenBracketsToken" } as OpenBracketsToken);
            continue;
          }
          case "]": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "]", debugType: "CloseBracketsToken" } as CloseBracketsToken);
            continue;
          }
          case "{": {
            dumpBuffer();
            eat();
            tokens.push({
              raw: "{",
              debugType: "OpenCurlyBracketsToken",
            } as OpenCurlyBracketsToken);
            continue;
          }
          case "}": {
            dumpBuffer();
            eat();
            tokens.push({
              raw: "}",
              debugType: "CloseCurlyBracketsToken",
            } as CloseCurlyBracketsToken);
            continue;
          }
          case ",": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ",", debugType: "CommaToken" } as CommaToken);
            continue;
          }
          case ":": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ":", debugType: "ColonToken" } as ColonToken);
            continue;
          }
          case ";": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ";", debugType: "SemiColonToken" } as SemiColonToken);
            continue;
          }
          case ".": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ".", debugType: "PeriodToken" } as PeriodToken);
            continue;
          }
          case "<": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "<", debugType: "LessThanToken" } as LessThanToken);
            continue;
          }
          case ">": {
            dumpBuffer();
            eat();
            tokens.push({ raw: ">", debugType: "GreaterThanToken" } as GreaterThanToken);
            continue;
          }
          case "=": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "=", debugType: "EqualToken" } as EqualToken);
            continue;
          }
          case "?": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "?", debugType: "QuestionMarkToken" } as QuestionMarkToken);
            continue;
          }
          case "!": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "!", debugType: "ExclamationMarkToken" } as ExclamationMarkToken);
            continue;
          }
          case "&": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "&", debugType: "AmperstandToken" } as AmperstandToken);
            continue;
          }
          case "#": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "#", debugType: "PoundToken" } as PoundToken);
            continue;
          }
          case "@": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "@", debugType: "AtToken" } as AtToken);
            continue;
          }
          case "$": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "$", debugType: "DollarToken" } as DollarToken);
            continue;
          }
          case "_": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "_", debugType: "UnderscoreToken" } as UnderscoreToken);
            continue;
          }
          case "|": {
            dumpBuffer();
            eat();
            tokens.push({ raw: "|", debugType: "PipeToken" } as PipeToken);
            continue;
          }
          default: {
            buffer += cursor;
            eat();
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
