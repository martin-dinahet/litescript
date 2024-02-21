import lexer from "./src/lexer.ts";
import parser from "./src/parser.ts";
import compiler from "./src/compiler.ts";

const source = Deno.readTextFileSync(Deno.args[0]);
const tokens = new lexer(source).run();
const astree = new parser(tokens).run();
const output = compiler(astree) + generate_types() + generate_main();

function generate_types(): string {
  return `
    type str = string
    type num = number
    type boo = boolean
  `;
}

function generate_main(): string {
  return `
    Deno.exit(main())
  `;
}

Deno.writeTextFileSync("./out/output.ts", output);
