import { ASTNode } from "#/node";
import {
  BooleanLiteralToken,
  IdentifierToken,
  NumberLiteralToken,
  OperationToken,
  StringLiteralToken,
  Token,
} from "#/token";

type ParserTypeDefinition = (params: { tokens: Array<Token> }) => ASTNode;
export const Parser: ParserTypeDefinition = ({ tokens }) => {
  let current = 0;

  const eat = (): Token => {
    return tokens[current++];
  };

  const peek = (): Token | undefined => {
    return tokens[current];
  };

  const eatSpecific = (debugType: Array<string>) => {
    const t = eat();
    for (const type of debugType) {
      if (t.debugType === type) {
        return t;
      }
    }
    throw new Error(`Error: expected token ${debugType}, got ${t.debugType}`);
  };

  const parseProgram = (): ASTNode => {
    const body: Array<ASTNode> = [];
    while (current < tokens.length) {
      body.push(parseStatement());
    }
    return {
      debugType: "ProgramASTNode",
      body,
    };
  };

  const parseStatement = (): ASTNode => {
    let token = peek();
    if (!token) throw new Error("Unexpected end of input");
    switch (token.debugType) {
      case "IdentifierToken": {
        throw new Error("Not implemented");
      }
      case "NumberLiteralToken": {
        throw new Error("Not implemented");
      }
      case "StringLiteralToken": {
        throw new Error("Not implemented");
      }
      case "BooleanLiteralToken": {
        throw new Error("Not implemented");
      }
      case "ConstKeywordToken": {
        eatSpecific(["ConstKeywordToken"]);
        const identifier = eatSpecific(["IdentifierToken"]) as IdentifierToken;
        eatSpecific(["EqualToken"]);
        const value: ASTNode = parseExpression();
        eatSpecific(["SemiColonToken"]);
        return {
          debugType: "VariableDeclarationASTNode",
          identifier: identifier.value,
          value,
        };
      }
      case "ReturnKeywordToken": {
        eatSpecific(["ReturnKeywordToken"]);
        const value: ASTNode = parseExpression();
        eatSpecific(["SemiColonToken"]);
        return {
          debugType: "ReturnStatementASTNode",
          value,
        };
      }
      case "IfKeywordToken": {
        eatSpecific(["IfKeywordToken"]);
        eatSpecific(["OpenParenthesesToken"]);
        const test: ASTNode = parseExpression();
        eatSpecific(["CloseParenthesesToken"]);
        const consequent: ASTNode = parseStatement();
        let alternate: ASTNode | undefined;
        if (peek()?.debugType === "ElseKeywordToken") {
          eatSpecific(["ElseKeywordToken"]);
          alternate = parseStatement();
        }
        return {
          debugType: "ConditionalStatementASTNode",
          test,
          consequent,
          alternate,
        };
      }
      case "ElseKeywordToken": {
        throw new Error("Not implemented");
      }
      case "AddOperationToken": {
        throw new Error("Not implemented");
      }
      case "SubOperationToken": {
        throw new Error("Not implemented");
      }
      case "MulOperationToken": {
        throw new Error("Not implemented");
      }
      case "DivOperationToken": {
        throw new Error("Not implemented");
      }
      case "PercentOperationToken": {
        throw new Error("Not implemented");
      }
      case "OpenParenthesesToken": {
        throw new Error("Not implemented");
      }
      case "CloseParenthesesToken": {
        throw new Error("Not implemented");
      }
      case "OpenBracketsToken": {
        throw new Error("Not implemented");
      }
      case "CloseBracketsToken": {
        throw new Error("Not implemented");
      }
      case "OpenCurlyBracketsToken": {
        throw new Error("Not implemented");
      }
      case "CloseCurlyBracketsToken": {
        throw new Error("Not implemented");
      }
      case "CommaToken": {
        throw new Error("Not implemented");
      }
      case "ColonToken": {
        throw new Error("Not implemented");
      }
      case "SemiColonToken": {
        throw new Error("Not implemented");
      }
      case "PeriodToken": {
        throw new Error("Not implemented");
      }
      case "LessThanToken": {
        throw new Error("Not implemented");
      }
      case "GreaterThanToken": {
        throw new Error("Not implemented");
      }
      case "EqualToken": {
        throw new Error("Not implemented");
      }
      case "QuestionMarkToken": {
        throw new Error("Not implemented");
      }
      case "ExclamationMarkToken": {
        throw new Error("Not implemented");
      }
      case "AmperstandToken": {
        throw new Error("Not implemented");
      }
      case "PoundToken": {
        throw new Error("Not implemented");
      }
      case "AtToken": {
        throw new Error("Not implemented");
      }
      case "DollarToken": {
        throw new Error("Not implemented");
      }
      case "UnderscoreToken": {
        throw new Error("Not implemented");
      }
      case "PipeToken": {
        throw new Error("Not implemented");
      }
    }
  };

  const parseExpression = (): ASTNode => {
    let token = eat();
    switch (token.debugType) {
      case "NumberLiteralToken": {
        return {
          debugType: "NumberLiteralASTNode",
          value: Number((token as NumberLiteralToken).value),
        };
      }
      case "StringLiteralToken": {
        return {
          debugType: "StringLiteralASTNode",
          value: String((token as StringLiteralToken).value),
        };
      }
      case "IdentifierToken": {
        return {
          debugType: "IdentifierASTNode",
          value: String((token as IdentifierToken).value),
        };
      }
      case "BooleanLiteralToken": {
        return {
          debugType: "BooleanLiteralASTNode",
          value: (token as BooleanLiteralToken).value === "true",
        };
      }
      case "ConstKeywordToken": {
        throw new Error("Not implemented");
      }
      case "ReturnKeywordToken": {
        throw new Error("Not implemented");
      }
      case "IfKeywordToken": {
        throw new Error("Not implemented");
      }
      case "ElseKeywordToken": {
        throw new Error("Not implemented");
      }
      case "AddOperationToken": {
        throw new Error("Not implemented");
      }
      case "SubOperationToken": {
        throw new Error("Not implemented");
      }
      case "MulOperationToken": {
        throw new Error("Not implemented");
      }
      case "DivOperationToken": {
        throw new Error("Not implemented");
      }
      case "PercentOperationToken": {
        throw new Error("Not implemented");
      }
      case "OpenParenthesesToken": {
        const left: ASTNode = parseExpression();
        const operator: Token = eatSpecific([
          "AddOperationToken",
          "SubOperationToken",
          "MulOperationToken",
          "DivOperationToken",
          "PercentOperationToken",
          "LessThanToken",
          "GreaterThanToken",
        ]);
        const right: ASTNode = parseExpression();
        eatSpecific(["CloseParenthesesToken"]);
        return {
          debugType: "BinaryExpressionASTNode",
          left,
          right,
          operator: (operator as OperationToken).raw,
        };
      }
      case "CloseParenthesesToken": {
        throw new Error("Not implemented");
      }
      case "OpenBracketsToken": {
        throw new Error("Not implemented");
      }
      case "CloseBracketsToken": {
        throw new Error("Not implemented");
      }
      case "OpenCurlyBracketsToken": {
        throw new Error("Not implemented");
      }
      case "CloseCurlyBracketsToken": {
        throw new Error("Not implemented");
      }
      case "CommaToken": {
        throw new Error("Not implemented");
      }
      case "ColonToken": {
        throw new Error("Not implemented");
      }
      case "SemiColonToken": {
        throw new Error("Not implemented");
      }
      case "PeriodToken": {
        throw new Error("Not implemented");
      }
      case "LessThanToken": {
        throw new Error("Not implemented");
      }
      case "GreaterThanToken": {
        throw new Error("Not implemented");
      }
      case "EqualToken": {
        throw new Error("Not implemented");
      }
      case "QuestionMarkToken": {
        throw new Error("Not implemented");
      }
      case "ExclamationMarkToken": {
        throw new Error("Not implemented");
      }
      case "AmperstandToken": {
        throw new Error("Not implemented");
      }
      case "PoundToken": {
        throw new Error("Not implemented");
      }
      case "AtToken": {
        throw new Error("Not implemented");
      }
      case "DollarToken": {
        throw new Error("Not implemented");
      }
      case "UnderscoreToken": {
        throw new Error("Not implemented");
      }
      case "PipeToken": {
        throw new Error("Not implemented");
      }
      default: {
        throw new Error("No token under cursor");
      }
    }
  };

  return parseProgram();
};
