import { ASTNode, IdentifierASTNode, ProgramASTNode } from "#/node";
import {
  BooleanLiteralToken,
  IdentifierToken,
  NumberLiteralToken,
  OperationToken,
  StringLiteralToken,
  Token,
} from "#/token";

type ParserTypeDefinition = (params: { tokens: Array<Token> }) => ProgramASTNode;
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

  const parseProgram = (): ProgramASTNode => {
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
      case "ConstKeywordToken": {
        eatSpecific(["ConstKeywordToken"]);
        const identifier = eatSpecific(["IdentifierToken"]) as IdentifierToken;
        eatSpecific(["EqualToken"]);
        let value: ASTNode;
        if (peek()?.debugType === "OpenParenthesesToken") {
          eatSpecific(["OpenParenthesesToken"]);
          const parameters: Array<IdentifierASTNode> = [];
          while (peek()?.debugType === "IdentifierToken") {
            const param = eatSpecific(["IdentifierToken"]) as IdentifierToken;
            parameters.push({ debugType: "IdentifierASTNode", value: param.value });
            if (peek()?.debugType === "CommaToken") {
              eatSpecific(["CommaToken"]);
            }
          }
          eatSpecific(["CloseParenthesesToken"]);
          eatSpecific(["EqualToken"]);
          eatSpecific(["GreaterThanToken"]);
          const body: Array<ASTNode> = [];
          eatSpecific(["OpenCurlyBracketsToken"]);
          while (peek()?.debugType !== "CloseCurlyBracketsToken" && current < tokens.length) {
            body.push(parseStatement());
          }
          eatSpecific(["CloseCurlyBracketsToken"]);
          value = {
            debugType: "FunctionExpressionASTNode",
            parameters,
            body,
          };
        } else {
          value = parseExpression();
        }
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

        eatSpecific(["OpenCurlyBracketsToken"]);
        const consequent: ASTNode[] = [];
        while (peek()?.debugType !== "CloseCurlyBracketsToken" && current < tokens.length) {
          consequent.push(parseStatement());
        }
        eatSpecific(["CloseCurlyBracketsToken"]);

        let alternate: ASTNode[] | undefined;
        if (peek()?.debugType === "ElseKeywordToken") {
          eatSpecific(["ElseKeywordToken"]);
          eatSpecific(["OpenCurlyBracketsToken"]);
          alternate = [];
          while (peek()?.debugType !== "CloseCurlyBracketsToken" && current < tokens.length) {
            alternate.push(parseStatement());
          }
          eatSpecific(["CloseCurlyBracketsToken"]);
        }

        return {
          debugType: "ConditionalStatementASTNode",
          test,
          consequent,
          alternate,
        };
      }

      case "IdentifierToken": {
        const identifier: IdentifierASTNode = {
          debugType: "IdentifierASTNode",
          value: (eatSpecific(["IdentifierToken"]) as IdentifierToken).value,
        };
        if (peek()?.debugType === "OpenParenthesesToken") {
          const args: Array<ASTNode> = [];
          eatSpecific(["OpenParenthesesToken"]);
          while (peek()?.debugType !== "CloseParenthesesToken") {
            args.push(parseExpression());
            if (peek()?.debugType === "CommaToken") {
              eatSpecific(["CommaToken"]);
            }
          }
          eatSpecific(["CloseParenthesesToken"]);
          eatSpecific(["SemiColonToken"]);
          return {
            debugType: "FunctionCallASTNode",
            identifier,
            arguments: args,
          };
        } else {
          return identifier;
        }
      }

      default: {
        throw new Error(`${token.debugType} Not implemented`);
      }
    }
  };

  const parseExpression = (precedence = 0): ASTNode => {
    let left: ASTNode;
    let token = eat();
    switch (token.debugType) {
      case "NumberLiteralToken": {
        left = {
          debugType: "NumberLiteralASTNode",
          value: Number((token as NumberLiteralToken).value),
        };
        break;
      }
      case "StringLiteralToken": {
        left = {
          debugType: "StringLiteralASTNode",
          value: String((token as StringLiteralToken).value),
        };
        break;
      }
      case "IdentifierToken": {
        if (peek()?.debugType === "OpenParenthesesToken") {
          const identifier: IdentifierASTNode = {
            debugType: "IdentifierASTNode",
            value: (token as IdentifierToken).value,
          };
          eatSpecific(["OpenParenthesesToken"]);
          const args: ASTNode[] = [];
          if (peek()?.debugType !== "CloseParenthesesToken") {
            do {
              args.push(parseExpression());
              if (peek()?.debugType === "CommaToken") {
                eatSpecific(["CommaToken"]);
              }
            } while (peek()?.debugType !== "CloseParenthesesToken");
          }
          eatSpecific(["CloseParenthesesToken"]);
          left = {
            debugType: "FunctionCallASTNode",
            identifier,
            arguments: args,
          };
        } else {
          left = {
            debugType: "IdentifierASTNode",
            value: String((token as IdentifierToken).value),
          };
        }
        break;
      }
      case "BooleanLiteralToken": {
        left = {
          debugType: "BooleanLiteralASTNode",
          value: (token as BooleanLiteralToken).value === "true",
        };
        break;
      }
      case "OpenParenthesesToken": {
        left = parseExpression();
        eatSpecific(["CloseParenthesesToken"]);
        break;
      }
      default: {
        throw new Error("Not implemented");
      }
    }

    while (true) {
      let nextToken = peek();
      if (!nextToken) break;

      // Check for double-token operators first
      if (nextToken.debugType === "LessThanToken" || nextToken.debugType === "GreaterThanToken") {
        const firstToken = eat();
        const secondToken = peek();

        // Check for <= or >=
        if (secondToken?.debugType === "EqualToken") {
          eat(); // consume the = token
          const operator = firstToken.debugType === "LessThanToken" ? "<=" : ">=";
          const right = parseExpression(precedence + 1);
          left = {
            debugType: "BinaryExpressionASTNode",
            left,
            right,
            operator,
          };
          continue;
        } else {
          // Single token < or >
          const operator = firstToken.debugType === "LessThanToken" ? "<" : ">";
          const right = parseExpression(precedence + 1);
          left = {
            debugType: "BinaryExpressionASTNode",
            left,
            right,
            operator,
          };
          continue;
        }
      }

      // Check for == and !=
      if (nextToken.debugType === "EqualToken" || nextToken.debugType === "ExclamationMarkToken") {
        const firstToken = eat();
        const secondToken = peek();

        if (secondToken?.debugType === "EqualToken") {
          eat(); // consume the = token
          const operator = firstToken.debugType === "EqualToken" ? "==" : "!=";
          const right = parseExpression(precedence + 1);
          left = {
            debugType: "BinaryExpressionASTNode",
            left,
            right,
            operator,
          };
          continue;
        } else if (firstToken.debugType === "ExclamationMarkToken") {
          throw new Error("Unexpected token !");
        }
      }

      // Check for && and ||
      if (nextToken.debugType === "AmperstandToken" || nextToken.debugType === "PipeToken") {
        const firstToken = eat();
        const secondToken = peek();

        if (
          (firstToken.debugType === "AmperstandToken" &&
            secondToken?.debugType === "AmperstandToken") ||
          (firstToken.debugType === "PipeToken" && secondToken?.debugType === "PipeToken")
        ) {
          eat(); // consume the second & or |
          const operator = firstToken.debugType === "AmperstandToken" ? "&&" : "||";
          const right = parseExpression(precedence + 1);
          left = {
            debugType: "BinaryExpressionASTNode",
            left,
            right,
            operator,
          };
          continue;
        } else {
          throw new Error(`Unexpected token ${firstToken.debugType}`);
        }
      }

      // Handle other single-token operators
      if (
        ![
          "AddOperationToken",
          "SubOperationToken",
          "MulOperationToken",
          "DivOperationToken",
          "PercentOperationToken",
        ].includes(nextToken.debugType)
      ) {
        break;
      }

      const operator = (eat() as OperationToken).raw;
      const right = parseExpression(precedence + 1);
      left = {
        debugType: "BinaryExpressionASTNode",
        left,
        right,
        operator,
      };
    }

    return left;
  };

  return parseProgram();
};
