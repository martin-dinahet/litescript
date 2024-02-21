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

export interface object_component extends node {
  t: "object_component";
  i: identifier;
  v: expression;
}

// statements

export interface function_declaration extends statement {
  t: "function_declaration";
  i: identifier;
  a: Array<argument>;
  r: identifier;
  b: Array<statement>;
}

export interface variable_declaration extends statement {
  t: "variable_declaration";
  i: identifier;
  a: identifier;
  v: expression;
}

export interface return_statement extends statement {
  t: "return_statement";
  v: expression;
}

export interface use_statement extends statement {
  t: "use_statement";
  v: identifier;
}

export interface if_statement extends statement {
  t: "if_statement";
  c: expression;
  v: Array<statement>;
}

export interface else_statement extends statement {
  t: "else_statement";
  v: Array<statement>;
}

export interface object_declaration extends statement {
  t: "object_declaration";
  i: identifier;
  a: Array<argument>;
}

export interface object_reference extends expression {
  t: "object_reference";
  v: Array<object_component>;
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
