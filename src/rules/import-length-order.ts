import type { TSESTree } from "@typescript-eslint/utils";
import { createEslintRule } from "../utils";

type Options = [];
type MessageIds = "shouldSort";

type SortableNode
  = | TSESTree.ImportDeclaration
    | TSESTree.ExportAllDeclaration
    | (TSESTree.ExportNamedDeclaration & { source: TSESTree.StringLiteral });

function isSortableStatement(statement: TSESTree.Statement): statement is SortableNode {
  if (statement.type === "ImportDeclaration") {
    return true;
  }
  if (statement.type === "ExportAllDeclaration") {
    return true;
  }
  return statement.type === "ExportNamedDeclaration" && !!statement.source;
}

export const importLengthOrderRule = createEslintRule<Options, MessageIds>({
  name: "import-length-order",
  meta: {
    docs: { description: "按语句长度对 import/export 语句排序，短语句优先。" },
    fixable: "code",
    schema: [],
    type: "suggestion",
    messages: {
      shouldSort: "请按语句长度从短到长排列导入/再导出语句。",
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program(programNode) {
        const sortableNodes = collectSortableBlock(programNode);
        if (sortableNodes.length < 2) {
          return;
        }

        const items = sortableNodes.map((node, index) => {
          const next = sortableNodes[index + 1];
          const textSegment = sourceCode.text.slice(node.range[0], next ? next.range[0] : node.range[1]);
          return {
            length: sourceCode.getText(node).length,
            node,
            originalIndex: index,
            priority: getTypePriority(node),
            segment: textSegment,
          };
        });

        const sorted = [...items].sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          if (a.length !== b.length) {
            return a.length - b.length;
          }
          return a.originalIndex - b.originalIndex;
        });

        const isAlreadySorted = items.every((item, idx) => item.originalIndex === sorted[idx].originalIndex);
        if (isAlreadySorted) {
          return;
        }

        const firstMismatchIndex = items.findIndex((item, idx) => item.originalIndex !== sorted[idx].originalIndex);
        const eol = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";
        const replaceStart = sortableNodes[0].range[0];
        const replaceEnd = sortableNodes[sortableNodes.length - 1].range[1];

        context.report({
          messageId: "shouldSort",
          node: sortableNodes[firstMismatchIndex],
          fix(fixer) {
            // 将导入块整体替换成排序后的段落，保留每条语句后原有的空白/注释。
            const rewritten = sorted
              .map((item, idx) => {
                if (idx === sorted.length - 1) {
                  return item.segment;
                }
                return /\s$/.test(item.segment) ? item.segment : `${item.segment}${eol}`;
              })
              .join("");
            return fixer.replaceTextRange([replaceStart, replaceEnd], rewritten);
          },
        });
      },
    };

    function collectSortableBlock(programNode: TSESTree.Program): SortableNode[] {
      const result: SortableNode[] = [];
      let hasStartedCollecting = false;

      for (const statement of programNode.body) {
        if (!hasStartedCollecting) {
          if (statement.type === "ExpressionStatement" && typeof statement.directive === "string") {
            continue;
          }
          if (isSortableStatement(statement)) {
            hasStartedCollecting = true;
            result.push(statement);
            continue;
          }
          // 顶部遇到非导入语句说明文件并未以 import/export 块开头，不再处理。
          break;
        }

        if (isSortableStatement(statement)) {
          result.push(statement);
          continue;
        }

        break;
      }

      return result;
    }

    /**
     * type-only 导入/导出优先级最高，始终排在普通语句前面。
     * 通过整语句 importKind/exportKind 或逐个 specifier 检测类型标记。
     */
    function getTypePriority(node: SortableNode): number {
      if (node.type === "ImportDeclaration") {
        if (node.importKind === "type") {
          return 0;
        }
        if (node.specifiers.length > 0 && node.specifiers.every(specifier => specifier.type === "ImportSpecifier" && specifier.importKind === "type")) {
          return 0;
        }
        return 1;
      }

      if (node.type === "ExportNamedDeclaration") {
        if (node.exportKind === "type") {
          return 0;
        }
        if (node.specifiers && node.specifiers.length > 0 && node.specifiers.every(specifier => specifier.exportKind === "type")) {
          return 0;
        }
      }

      return 1;
    }
  },
});
