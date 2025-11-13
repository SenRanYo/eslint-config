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
