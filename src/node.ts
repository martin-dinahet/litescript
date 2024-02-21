export interface node {
  t: string;
}

export interface statement extends node {
  t: string;
}

export interface expression extends node {
  t: string;
}

// helpers

export interface argument extends node {
  t: "type_annotation";
  v: identifier;
  a: identifier;
}

// statements

export interface function_declaration {
  t: "function_declaration";
  i: identifier;
  a: Array<argument>;
  r: identifier;
  b: Array<statement>;
}

export interface variable_declaration {
  t: "variable_declaration";
  i: identifier;
  a: identifier;
  v: expression;
}

export interface return_statement {
  t: "return_statement";
  v: expression;
}

export interface use_statement {
  t: "use_statement";
  v: identifier;
}

export interface if_statement {
  t: "if statement";
  c: expression;
  v: Array<statement>;
}

export interface else_statement {
  t: "else statement";
  v: Array<statement>;
}

// expressions

export interface function_call extends expression {
  t: "function_call";
  i: identifier;
  a: Array<expression>;
}

export interface binary_operation extends expression {
  t: "binary_operation";
  l: expression;
  r: expression;
  o: string;
}

export interface comparator_operation extends expression {
  t: "comparator_operation";
  l: expression;
  r: expression;
  o: string;
}

export type literal_expression = num_literal | str_literal | boo_literal | nil_literal | identifier | function_call;

export interface num_literal extends expression {
  t: "num_literal";
  v: number;
}

export interface str_literal extends expression {
  t: "str_literal";
  v: string;
}

export interface boo_literal extends expression {
  t: "boo_literal";
  v: boolean;
}

export interface nil_literal extends expression {
  t: "nil_literal";
  v: null;
}

export interface identifier extends expression {
  t: "identifier";
  v: Array<string>;
}
