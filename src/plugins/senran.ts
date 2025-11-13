/**
 * Senran 自定义 ESLint 插件
 * 提供专属于此配置的自定义 ESLint 规则
 */

import type { ESLint } from "eslint";
import { importLengthOrderRule } from "../rules/import-length-order";

const plugin = {
  meta: {
    name: "kirklin",
    version: "1.0.0",
  },
  rules: {
    "import-length-order": importLengthOrderRule,
  },
} satisfies ESLint.Plugin;

export default plugin;
