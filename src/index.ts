/**
 * @senran/eslint-config - ESLint Flat Config 库
 * 项目入口文件，导出所有公共 API
 */

export * from "./globs";
export * from "./types";
export * from "./utils";
export * from "./configs";
export * from "./factory";
import { eslint } from "./factory";

export default eslint;
