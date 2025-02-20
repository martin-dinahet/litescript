import { Lexer } from "./lexer";

const source = `
  const add = (a: number, b: number): number => {
    return a + b;
  };
`;

console.log(Lexer({ code: source }));
