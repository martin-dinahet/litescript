import { Token } from "#/token";
import { Lexer } from "@/lexer";
import { Parser } from "@/parser";
import { ASTNode } from "#/node";

const code = "const a = 5 + 3;";

const tokens: Array<Token> = Lexer({ code });
console.log(tokens.map((t) => `${t.debugType}`));
const programASTNode: ASTNode = Parser({ tokens });
console.log(programASTNode);
