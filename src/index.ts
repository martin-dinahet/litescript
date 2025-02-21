import { Token } from "#/token";
import { Lexer } from "@/lexer";
import { Parser } from "@/parser";
import { Compiler } from "@/compiler";
import { ASTNode, ProgramASTNode } from "#/node";

import fs from "fs";
import path from "path";
import prettier from "prettier";
import { exec } from "child_process";

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

(async () => {
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error("No file path provided");
  }
  try {
    const code = fs.readFileSync(filePath, "utf-8");
    const tokens: Array<Token> = Lexer({ code });
    console.log(tokens.map((t) => `${t.debugType}`));
    const programASTNode: ProgramASTNode = Parser({ tokens });
    logASTNode(programASTNode);
    const output: Array<string> = Compiler({ programASTNode });
    const outputFilePath = path.join("output.js");
    fs.writeFileSync(outputFilePath, output.join("\n"));
    const formattedCode = await prettier.format(fs.readFileSync(outputFilePath, "utf-8"), {
      parser: "babel",
    });
    fs.writeFileSync(outputFilePath, formattedCode);
  } catch (err) {
    throw new Error(`Error reading file: ${err}`);
  }
})();
