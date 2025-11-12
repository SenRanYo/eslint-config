import { Linter } from "eslint";
import { describe, expect, it } from "vitest";
import parser from "@typescript-eslint/parser";
import { importLengthOrderRule } from "../src/rules/import-length-order";

const baseConfig = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module" as const,
  },
  rules: {
    "import-length-order": "error" as const,
  },
};

describe("import-length-order rule", () => {
  it("保持已排序的导入块不报错", () => {
    const linter = createLinter();
    const code = [
      "import a from \"./a\";",
      "export * from \"./longer-path\";",
      "export * from \"./even-longer-path-file\";",
    ].join("\n");

    const result = linter.verify(code, baseConfig);
    expect(result).toHaveLength(0);
  });

  it("当长语句位于短语句之前时给出报错并提供修复", () => {
    const linter = createLinter();
    const code = [
      "import { createEslintRule } from \"../utils\";",
      "export * from \"./no-console-in-lib\";",
    ].join("\n");

    const messages = linter.verify(code, baseConfig);
    expect(messages[0]?.ruleId).toBe("import-length-order");

    const { fixed, output } = linter.verifyAndFix(code, baseConfig);
    expect(fixed).toBe(true);
    expect(output).toBe(
      [
        "export * from \"./no-console-in-lib\";",
        "import { createEslintRule } from \"../utils\";",
        "",
      ].join("\n"),
    );
  });

  it("import type 语句始终排在最前面", () => {
    const linter = createLinter();
    const code = [
      "import { helper } from \"./helper\";",
      "import type { VeryLongTypeName } from \"../types/very-long-path\";",
    ].join("\n");

    const { output } = linter.verifyAndFix(code, baseConfig);
    expect(output).toBe(
      [
        "import type { VeryLongTypeName } from \"../types/very-long-path\";",
        "import { helper } from \"./helper\";",
        "",
      ].join("\n"),
    );
  });
});

function createLinter(): Linter {
  const linter = new Linter({ configType: "eslintrc" });
  linter.defineRule("import-length-order", importLengthOrderRule as any);
  linter.defineParser("@typescript-eslint/parser", parser as any);
  return linter;
}
