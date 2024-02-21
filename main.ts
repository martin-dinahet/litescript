import lexer from "./src/lexer.ts";
import parser from "./src/parser.ts";
import compiler from "./src/compiler.ts";

const source = Deno.readTextFileSync(Deno.args[0]);
const tokens = new lexer(source).run();
const astree = new parser(tokens).run();
const output = compiler(astree) + "\nDeno.exit(main())";

Deno.writeTextFileSync("./out/output.ts", output);
