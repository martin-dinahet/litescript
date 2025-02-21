import { ASTNode, IdentifierASTNode } from "#/node";
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
        // Check if it's a function call (IdentifierToken followed by OpenParenthesesToken)
        if (peek()?.debugType === "OpenParenthesesToken") {
          const identifier: IdentifierASTNode = {
            debugType: "IdentifierASTNode",
            value: (token as IdentifierToken).value,
          };
          eatSpecific(["IdentifierToken"]); // Eat the identifier token
          eatSpecific(["OpenParenthesesToken"]); // Eat the opening parentheses

          const args: ASTNode[] = [];
          // Parse the arguments inside the parentheses
          if (peek()?.debugType !== "CloseParenthesesToken") {
            do {
              args.push(parseExpression()); // Parse each argument
              if (peek()?.debugType === "CommaToken") {
                eatSpecific(["CommaToken"]); // Handle the comma between arguments
              }
            } while (peek()?.debugType !== "CloseParenthesesToken");
          }

          eatSpecific(["CloseParenthesesToken"]); // Eat the closing parentheses

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
      if (
        !nextToken ||
        ![
          "AddOperationToken",
          "SubOperationToken",
          "MulOperationToken",
          "DivOperationToken",
          "PercentOperationToken",
          "LessThanToken",
          "GreaterThanToken",
        ].includes(nextToken.debugType)
      ) {
        break;
      }
      const operator = eat() as OperationToken;
      const right = parseExpression(precedence + 1);
      left = {
        debugType: "BinaryExpressionASTNode",
        left,
        right,
        operator: operator.raw,
      };
    }

    return left;
  };

  return parseProgram();
};
