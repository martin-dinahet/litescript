import {
  ASTNode,
  BinaryExpressionASTNode,
  BooleanLiteralASTNode,
  ConditionalStatementASTNode,
  FunctionCallASTNode,
  FunctionExpressionASTNode,
  IdentifierASTNode,
  NumberLiteralASTNode,
  ProgramASTNode,
  ReturnStatementASTNode,
  StringLiteralASTNode,
  StructDeclarationASTNode,
  VariableDeclarationASTNode,
} from "#/node";

type CompilerTypeDefinition = (params: { programASTNode: ProgramASTNode }) => Array<string>;
export const Compiler: CompilerTypeDefinition = ({ programASTNode }) => {
  const visitProgramASTNode = (node: ProgramASTNode): Array<string> => {
    return node.body.flatMap((statement: ASTNode) => visitNode(statement));
  };

  const visitIdentifierASTNode = (node: IdentifierASTNode): Array<string> => {
    return [node.value];
  };

  const visitNumberLiteralASTNode = (node: NumberLiteralASTNode): Array<string> => {
    return [String(node.value)];
  };

  const visitStringLiteralASTNode = (node: StringLiteralASTNode): Array<string> => {
    return [`"${node.value}"`];
  };

  const visitBooleanLiteralASTNode = (node: BooleanLiteralASTNode): Array<string> => {
    return [String(node.value)];
  };

  const visitBinaryExpressionASTNode = (node: BinaryExpressionASTNode): Array<string> => {
    const left = visitNode(node.left);
    const right = visitNode(node.right);
    return [...left, node.operator, ...right];
  };

  const visitVariableDeclarationASTNode = (node: VariableDeclarationASTNode): Array<string> => {
    const value = visitNode(node.value);
    return [`const ${node.identifier} = ${value.join(" ")};`];
  };

  const visitReturnStatementASTNode = (node: ReturnStatementASTNode): Array<string> => {
    const value = visitNode(node.value);
    return [`return ${value.join(" ")};`];
  };

  const visitConditionalStatementASTNode = (node: ConditionalStatementASTNode): Array<string> => {
    const test = visitNode(node.test);
    const consequent = node.consequent.flatMap((node: ASTNode) => visitNode(node));
    if (!node.alternate) {
      return [`if (${test.join(" ")}) {`, ...consequent.map((line) => `  ${line}`), "}"];
    }
    const alternate = node.alternate.flatMap((node: ASTNode) => visitNode(node));
    return [
      `if (${test.join(" ")}) {`,
      ...consequent.map((line) => `  ${line}`),
      "} else {",
      ...alternate.map((line) => `  ${line}`),
      "}",
    ];
  };

  const visitFunctionExpressionASTNode = (node: FunctionExpressionASTNode): Array<string> => {
    const params = node.parameters.map((param: IdentifierASTNode) => param.value).join(", ");
    const body = node.body.flatMap((node: ASTNode) => visitNode(node));
    return [`(${params}) => {`, ...body.map((line) => `  ${line}`), "}"];
  };

  const visitFunctionCallASTNode = (node: FunctionCallASTNode): Array<string> => {
    const identifier = visitNode(node.identifier);
    const args = node.arguments.map((arg) => visitNode(arg).join(" ")).join(", ");
    return [`${identifier.join("")}(${args})`];
  };

  const visitStrucDeclarationASTNode = (node: StructDeclarationASTNode): Array<string> => {
    const identifier = visitNode(node.identifier);
    const properties = node.properties.map((property) => visitNode(property).join(" "));
    return [
      `function ${identifier}(${properties.join(", ")}) {`,
      properties.map((property) => `this.${property} = ${property};`).join("\n"),
      "}",
    ];
  };

  const visitNode = (node: ASTNode): Array<string> => {
    switch (node.debugType) {
      case "ProgramASTNode":
        return visitProgramASTNode(node);
      case "IdentifierASTNode":
        return visitIdentifierASTNode(node);
      case "NumberLiteralASTNode":
        return visitNumberLiteralASTNode(node);
      case "StringLiteralASTNode":
        return visitStringLiteralASTNode(node);
      case "BooleanLiteralASTNode":
        return visitBooleanLiteralASTNode(node);
      case "BinaryExpressionASTNode":
        return visitBinaryExpressionASTNode(node);
      case "VariableDeclarationASTNode":
        return visitVariableDeclarationASTNode(node);
      case "ReturnStatementASTNode":
        return visitReturnStatementASTNode(node);
      case "ConditionalStatementASTNode":
        return visitConditionalStatementASTNode(node);
      case "FunctionExpressionASTNode":
        return visitFunctionExpressionASTNode(node);
      case "FunctionCallASTNode":
        return visitFunctionCallASTNode(node);
      case "StructDeclarationASTNode":
        return visitStrucDeclarationASTNode(node);
    }
  };

  return visitNode(programASTNode);
};
