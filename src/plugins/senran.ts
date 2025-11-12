import type { ESLint } from "eslint";
import { noConsoleInLibRule } from "../rules/no-console-in-lib";

const plugin = {
  meta: {
    name: "kirklin",
    version: "1.0.0",
  },
  rules: {
    "no-console-in-lib": noConsoleInLibRule,
  },
} satisfies ESLint.Plugin;

export default plugin;
