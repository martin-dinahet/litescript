import * as node from "./node.ts";
import token from "./token.ts";

class parser {
  private tokens: Array<token>;
  private astree: Array<node.node>;
  private cursor: token | null;
  private ccount: number;

  constructor(tokens: Array<token>) {
    this.tokens = tokens;
    this.astree = new Array<node.node>();
    this.cursor = null;
    this.ccount = -1;
    this.next();
  }

  private next(): token {
    this.ccount++;
    const cursor = this.cursor_as_token();
    this.cursor = this.tokens.length > this.ccount ? this.tokens[this.ccount] : null;
    return cursor;
  }

  private cursor_as_token(): token {
    if (!this.cursor) {
      return { t: "", v: "" };
    }
    return this.cursor as token;
  }

  private cursor_equals_to(type: string, value: string): boolean {
    return this.cursor_as_token().t === type && this.cursor_as_token().v === value;
  }

  private expect(type?: string, value?: string): token {
    if (type) {
      if (type !== this.cursor_as_token().t) {
        throw new Error(`Expected '${type}', got '${this.cursor_as_token().t}'.`);
      }
    }
    if (value) {
      if (value !== this.cursor_as_token().v) {
        throw new Error(`Expected '${value}', got '${this.cursor_as_token().v}'`);
      }
    }
    return this.next();
  }

  private lookahead_equals_to(type: string, value: string): boolean {
    if (!this.tokens[this.ccount + 1]) {
      return false;
    }
    return this.tokens[this.ccount + 1].t === type && this.tokens[this.ccount + 1].v === value;
  }

  public run(): Array<node.node> {
    while (this.cursor !== null) {
      this.astree.push(this.parse_statement());
    }
    return this.astree;
  }

  private parse_argument(): node.argument {
    const annoted_value = this.parse_identifier() as node.identifier;
    this.expect("spe", ":");
    const annoted_type = this.parse_identifier() as node.identifier;
    return { t: "type_annotation", v: annoted_value, a: annoted_type };
  }

  private parse_statement(): node.statement {
    switch (this.cursor_as_token().v) {
      case "fn":
        return this.parse_function_declaration();
      case "let":
        return this.parse_variable_declaration();
      case "return":
        return this.parse_return_statement();
      case "use":
        return this.parse_use_statement();
      case "if":
        return this.parse_if_statement();
      case "else":
        return this.parse_else_statement();
      case "obj":
        return this.parse_object_declaration();
      default:
        if (this.cursor_as_token().t === "ide") {
          return this.parse_function_call();
        }
        throw new Error(`${this.cursor_as_token().v}: unknown keyword`);
    }
    // return this.parse_expression();
  }

  private parse_function_declaration(): node.function_declaration {
    this.expect("key", "fn");
    const identifier = this.parse_identifier() as node.identifier;
    const args = new Array<node.argument>();
    this.expect("spe", "(");
    while (true) {
      if (this.cursor_equals_to("spe", ")")) {
        break;
      }
      args.push(this.parse_argument());
      if (this.cursor_equals_to("spe", ")")) {
        break;
      }
      this.expect("spe", ",");
    }
    this.expect("spe", ")");
    this.expect("spe", "=>");
    const return_type = this.parse_identifier() as node.identifier;
    this.expect("spe", "{");
    const body = new Array<node.statement>();
    while (!this.cursor_equals_to("spe", "}")) {
      body.push(this.parse_statement());
    }
    this.expect("spe", "}");
    return { t: "function_declaration", i: identifier, a: args, r: return_type, b: body };
  }

  private parse_variable_declaration(): node.variable_declaration {
    this.expect("key", "let");
    const identifier = this.parse_identifier() as node.identifier;
    this.expect("spe", ":");
    const annoted_type = this.parse_identifier() as node.identifier;
    this.expect("spe", "=");
    const value = this.parse_expression() as node.expression;
    return { t: "variable_declaration", i: identifier, a: annoted_type, v: value };
  }

  private parse_return_statement(): node.return_statement {
    this.expect("key", "return");
    const value = this.parse_expression() as node.expression;
    return { t: "return_statement", v: value };
  }

  private parse_use_statement(): node.use_statement {
    this.expect("key", "use");
    const value = this.parse_identifier();
    return { t: "use_statement", v: value };
  }

  private parse_if_statement(): node.if_statement {
    this.expect("key", "if");
    const condition = this.parse_expression();
    this.expect("spe", "{");
    const value = new Array<node.statement>();
    while (!this.cursor_equals_to("spe", "}")) {
      value.push(this.parse_statement());
    }
    this.expect("spe", "}");
    return { t: "if_statement", c: condition, v: value };
  }

  private parse_else_statement(): node.else_statement {
    this.expect("key", "else");
    this.expect("spe", "{");
    const value = new Array<node.statement>();
    while (!this.cursor_equals_to("spe", "}")) {
      value.push(this.parse_statement());
    }
    this.expect("spe", "}");
    return { t: "else_statement", v: value };
  }

  private parse_object_declaration(): node.object_declaration {
    this.expect("key", "obj");
    const identifier = this.parse_identifier();
    this.expect("spe", "{");
    const args = new Array<node.argument>();
    while (!this.cursor_equals_to("spe", "}")) {
      args.push(this.parse_argument());
    }
    this.expect("spe", "}");
    return { t: "object_declaration", i: identifier, a: args };
  }

  private parse_object_reference(): node.object_reference {
    this.expect("spe", "{");
    const object_components = new Array<node.object_component>();
    while (!this.cursor_equals_to("spe", "}")) {
      object_components.push(this.parse_object_component());
    }
    this.expect("spe", "}");
    return { t: "object_reference", v: object_components };
  }

  private parse_object_component(): node.object_component {
    const identifier = this.parse_identifier();
    this.expect("spe", ":");
    const value = this.parse_expression();
    if (this.cursor_equals_to("spe", ",")) {
      this.expect("spe", ",");
    }
    return { t: "object_component", i: identifier, v: value };
  }

  private parse_expression(): node.expression {
    if (this.cursor_equals_to("spe", "{")) {
      return this.parse_object_reference();
    }
    return this.parse_comparator_expression();
  }

  private parse_function_call(): node.function_call {
    const identifier = this.parse_identifier();
    const args = new Array<node.expression>();
    this.expect("spe", "(");
    while (true) {
      if (this.cursor_equals_to("spe", ")")) {
        break;
      }
      args.push(this.parse_expression());
      if (this.cursor_equals_to("spe", ")")) {
        break;
      }
      this.expect("spe", ",");
    }
    this.expect("spe", ")");
    return { t: "function_call", i: identifier, a: args };
  }

  private parse_literal_expression(): node.literal_expression | node.binary_operation {
    switch (this.cursor_as_token().t) {
      case "num":
        return this.parse_num_literal();
      case "str":
        return this.parse_str_literal();
      case "boo":
        return this.parse_boo_literal();
      case "nil":
        return this.parse_nil_literal();
      case "ide":
        if (this.lookahead_equals_to("spe", "(")) {
          return this.parse_function_call();
        } else {
          return this.parse_identifier();
        }
      default:
        throw new Error(`Unknown token type: '${this.cursor_as_token().t}'`);
    }
  }

  private parse_comparator_expression(): node.literal_expression | node.comparator_operation | node.binary_operation {
    let l = this.parse_additive_expression();
    while (this.cursor_as_token().t === "cmp") {
      const o = this.next().v;
      const r = this.parse_expression();
      l = { t: "comparator_operation", l, r, o };
    }
    return l;
  }

  private parse_additive_expression(): node.literal_expression | node.binary_operation | node.comparator_operation {
    let l = this.parse_multiplicative_expression();
    while (
      this.cursor_as_token().t === "ope" &&
      (this.cursor_as_token().v === "+" || this.cursor_as_token().v === "-")
    ) {
      const o = this.next().v;
      const r = this.parse_expression();
      l = { t: "binary_operation", l, r, o };
    }
    return l;
  }

  private parse_multiplicative_expression(): node.literal_expression | node.binary_operation {
    let l = this.parse_literal_expression();
    while (
      this.cursor_as_token().t === "ope" &&
      (this.cursor_as_token().v === "*" || this.cursor_as_token().v === "/")
    ) {
      const o = this.next().v;
      const r = this.parse_expression();
      l = { t: "binary_operation", l, r, o };
    }
    return l;
  }

  private parse_num_literal(): node.literal_expression {
    return { t: "num_literal", v: parseInt(this.next().v) };
  }

  private parse_str_literal(): node.str_literal {
    return { t: "str_literal", v: this.next().v };
  }

  private parse_boo_literal(): node.boo_literal {
    return { t: "boo_literal", v: this.next().v === "true" ? true : false };
  }

  private parse_nil_literal(): node.nil_literal {
    return { t: "nil_literal", v: this.next().v === "nil" ? null : null };
  }

  private parse_identifier(): node.identifier {
    const buffer = new Array<string>();
    buffer.push(this.next().v);
    while (this.cursor_equals_to("spe", "::")) {
      this.expect("spe", "::");
      buffer.push(this.next().v);
    }
    return { t: "identifier", v: buffer };
  }
}

export default parser;
