import * as std from "../doc/std.ts"
const main = (): std.res => {
std.io.write("Hello, World!")
return std.res.ok
}
Deno.exit(main())