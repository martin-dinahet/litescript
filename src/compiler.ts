import * as node from "./node.ts";

function compiler(astree: Array<node.statement>): string {
  let output = "";
  for (const statement of astree) {
    output += compile_statement(statement);
  }
  return output;
}

function compile_statement(statement: node.statement): string {
  switch (statement.t) {
    case "function_declaration":
      return compile_function_declaration(statement as node.function_declaration);
    case "variable_declaration":
      return compile_variable_declaration(statement as node.variable_declaration);
    case "return_statement":
      return compile_return_statement(statement as node.return_statement);
    case "use_statement":
      return compile_use_statement(statement as node.use_statement);
    case "function_call":
      return compile_function_call(statement as node.function_call);
    default:
      throw new Error(`Unknown statement type: ${JSON.stringify(statement)}`);
  }
}

function compile_function_declaration(function_declaration: node.function_declaration): string {
  const i = compile_identifier(function_declaration.i);
  const a = new Array<string>();
  for (const arg of function_declaration.a) {
    a.push(`${arg.v}: ${arg.a}`);
  }
  const r = compile_identifier(function_declaration.r);
  const b = new Array<string>();
  for (const stmt of function_declaration.b) {
    b.push(compile_statement(stmt));
  }
  return `const ${i} = (${a.join(", ")}): ${r} => {\n${b.join("\n")}\n}`;
}

function compile_variable_declaration(variable_declaration: node.variable_declaration): string {
  const i = compile_identifier(variable_declaration.i);
  const a = compile_identifier(variable_declaration.a);
  const v = compile_expression(variable_declaration.v);
  return `let ${i}: ${a} = ${v}`;
}

function compile_return_statement(return_statement: node.return_statement): string {
  const v = compile_expression(return_statement.v);
  return `return ${v}`;
}

function compile_use_statement(use_statement: node.use_statement): string {
  const v = compile_identifier(use_statement.v);
  return `import * as ${v} from "../doc/${v}.ts"\n`;
}

function compile_function_call(function_call: node.function_call): string {
  const i = compile_identifier(function_call.i);
  const a = new Array<string>();
  for (const arg of function_call.a) {
    a.push(compile_expression(arg));
  }
  return `${i}(${a.join(", ")})`;
}

function compile_expression(expression: node.expression): string {
  switch (expression.t) {
    case "function_call":
      return compile_function_call(expression as node.function_call);
    case "comparator_operation":
      return compile_comparator_operation(expression as node.comparator_operation);
    case "binary_operation":
      return compile_binary_operation(expression as node.binary_operation);
    case "identifier":
      return compile_identifier(expression as node.identifier);
    case "num_literal":
      return compile_literal(expression as node.literal_expression);
    case "str_literal":
      return compile_literal(expression as node.literal_expression);
    case "boo_literal":
      return compile_literal(expression as node.literal_expression);
    case "nil_literal":
      return compile_literal(expression as node.literal_expression);
    default:
      throw new Error(`Unknown expression: ${JSON.stringify(expression)}`);
  }
}

function compile_comparator_operation(comparator_operation: node.comparator_operation): string {
  const l = compile_literal(comparator_operation.l as node.literal_expression);
  const o = comparator_operation.o;
  const r = compile_expression(comparator_operation.r);
  return `${l} ${o} ${r}`;
}

function compile_binary_operation(binary_operation: node.binary_operation): string {
  const l = compile_literal(binary_operation.l as node.literal_expression);
  const o = binary_operation.o;
  const r = compile_expression(binary_operation.r);
  return `${l} ${o} ${r}`;
}

function compile_literal(literal: node.literal_expression): string {
  switch (literal.t) {
    case "num_literal":
      return `${literal.v}`;
    case "str_literal":
      return `"${literal.v}"`;
    case "boo_literal":
      return `${literal.v}`;
    case "nil_literal":
      return "null";
    default:
      throw new Error(`Unknown literal: ${JSON.stringify(literal)}`);
  }
}

function compile_identifier(identifier: node.identifier): string {
  if (identifier.v.length === 1) {
    return identifier.v[0];
  }
  return identifier.v.join(".");
}

export default compiler;
