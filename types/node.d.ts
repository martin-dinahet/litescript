export type ASTNode =
  | ProgramASTNode //
  | IdentifierASTNode //
  | LiteralASTNode //
  | BinaryExpressionASTNode //
  | VariableDeclarationASTNode //
  | ReturnStatementASTNode //
  | ConditionalStatementASTNode //
  | FunctionExpressionASTNode //
  | FunctionCallASTNode //
  | StructDeclarationASTNode; //

/* */

export type ProgramASTNode = {
  debugType: "ProgramASTNode";
  body: Array<ASTNode>;
};

/* */

export type IdentifierASTNode = {
  debugType: "IdentifierASTNode";
  value: string;
};

/* */

export type LiteralASTNode =
  | NumberLiteralASTNode //
  | StringLiteralASTNode //
  | BooleanLiteralASTNode; //

export type NumberLiteralASTNode = {
  debugType: "NumberLiteralASTNode";
  value: number;
};

export type StringLiteralASTNode = {
  debugType: "StringLiteralASTNode";
  value: string;
};

export type BooleanLiteralASTNode = {
  debugType: "BooleanLiteralASTNode";
  value: boolean;
};

/* */

export type BinaryExpressionASTNode = {
  debugType: "BinaryExpressionASTNode";
  left: ASTNode;
  right: ASTNode;
  operator: "+" | "-" | "*" | "/" | "%" | "<" | ">" | ">=" | "<=" | "==" | "!=" | "&&" | "||";
};

export type VariableDeclarationASTNode = {
  debugType: "VariableDeclarationASTNode";
  identifier: string;
  value: ASTNode;
};

export type ReturnStatementASTNode = {
  debugType: "ReturnStatementASTNode";
  value: ASTNode;
};

export type ConditionalStatementASTNode = {
  debugType: "ConditionalStatementASTNode";
  test: ASTNode;
  consequent: Array<ASTNode>;
  alternate?: Array<ASTNode>;
};

export type FunctionExpressionASTNode = {
  debugType: "FunctionExpressionASTNode";
  parameters: Array<IdentifierASTNode>;
  body: Array<ASTNode>;
};

export type FunctionCallASTNode = {
  debugType: "FunctionCallASTNode";
  identifier: IdentifierASTNode;
  arguments: Array<ASTNode>;
};

export type StructDeclarationASTNode = {
  debugType: "StructDeclarationASTNode";
  identifier: IdentifierASTNode;
  properties: Array<IdentifierASTNode>;
};
