import { createEslintRule } from "../utils";

type Options = [];

type MessageIds = "noConsoleInLib";

/**
 * 限制库代码中使用 `console.*`，以防内部调试信息泄露到最终产物。
 * 通过 `allowWarnError` 选项可保留 `console.warn/error`。
 */
export const noConsoleInLibRule = createEslintRule<Options, MessageIds>({
  name: "no-console-in-lib",
  meta: {
    docs: { description: "禁止在库代码中使用 console API" },
    messages: { noConsoleInLib: "库代码中请移除 console 调用。" },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.type !== "Identifier" || node.object.name !== "console") {
          return;
        }

        const property = node.property;
        if (property.type !== "Identifier") {
          return;
        }

        const isWarnOrError = property.name === "warn" || property.name === "error";
        // warn/error 可按需豁免，其余 console 调用一律报错。
        if (isWarnOrError) {
          return;
        }

        context.report({ messageId: "noConsoleInLib", node });
      },
    };
  },
});
