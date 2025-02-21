import { Token } from "#/token";
import { Lexer } from "@/lexer";
import { Parser } from "@/parser";
import { ASTNode } from "#/node";

const logASTNode = (node: ASTNode, indent = "") => {
  for (const key in node) {
    if (Object.prototype.hasOwnProperty.call(node, key)) {
      const value = node[key as keyof ASTNode];
      if (Array.isArray(value)) {
        console.log(`${indent}  ${key}: [`);
        value.forEach((item, index) => {
          logASTNode(item, `${indent}    `);
        });
        console.log(`${indent}  ]`);
      } else if (typeof value === "object" && value !== null) {
        console.log(`${indent}  ${key}: {`);
        logASTNode(value, `${indent}    `);
        console.log(`${indent}  }`);
      } else {
        console.log(`${indent}  ${key}: ${value}`);
      }
    }
  }
};

const code = `
  const add = (a, b) => {
    return a + b;
  };

  add(3, 5);
`;

const tokens: Array<Token> = Lexer({ code });
console.log(tokens.map((t) => `${t.debugType}`));
const programASTNode: ASTNode = Parser({ tokens });
logASTNode(programASTNode);
