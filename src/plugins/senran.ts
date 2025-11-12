import type { ESLint } from "eslint";
import { noConsoleInLibRule } from "../rules/no-console-in-lib";
import { importLengthOrderRule } from "../rules/import-length-order";

const plugin = {
  meta: {
    name: "kirklin",
    version: "1.0.0",
  },
  rules: {
    "no-console-in-lib": noConsoleInLibRule,
    "import-length-order": importLengthOrderRule,
  },
} satisfies ESLint.Plugin;

export default plugin;
