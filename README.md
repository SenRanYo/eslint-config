# @senran/eslint-config

一个基于 ESLint Flat Config 的多用途配置预设，内置 React/Vue/Svelte/Solid/Next.js、JSONC/YAML/TOML、格式化器、正则、UnoCSS 等常用集成，并自带 `css-property-order`、`import-length-order` 等自定义规则，帮助团队快速统一代码质量。

## 目录

```text
.github/              CI、工作流
src/                  配置与规则实现
test/                 规则与集成测试（Vitest）
  rules/              自定义规则单元测试
  integrations/       端到端 ESLint 场景测试
```

## 安装

```bash
pnpm install
# 或 npm / yarn 视项目需要
```

## 使用方式

在项目根目录创建 `eslint.config.js`（或 `.ts`）：

```ts
import eslint from "@senran/eslint-config";

export default eslint({
  react: true,
  vue: false,
  // 根据需要开启更多集成
});
```

常用 `pnpm` 命令：

| 命令            | 说明                                   |
| --------------- | -------------------------------------- |
| `pnpm build`    | 运行类型生成与 Rollup 打包             |
| `pnpm test`     | 执行所有规则与集成测试（Vitest）       |
| `pnpm lint`     | 使用当前配置对仓库执行 ESLint          |
| `pnpm lint:fix` | 自动修复仓库内的 lint 问题             |
| `pnpm gen`      | 运行 `scripts/typegen.ts` 生成类型定义 |

## 测试体系

- **规则级单元测试**：位于 `test/rules/*`，例如 `css-property-order`、`import-length-order` 会读取 `test/fixtures/rules/...` 的夹具，验证所有分支逻辑与自动修复。
- **集成级端到端测试**：位于 `test/integrations/*`，针对 `src/integrations` 中的每个模块准备真实项目结构（`test/fixtures/integrations/<name>`），运行 ESLint Composer 组合出的配置进行断言。覆盖范围包括 React/Vue/Svelte/Solid/Next、Vitest、JSONC/YAML/TOML、formatter、node/pnpm、comments、disables、忽略策略、排序等模块。格式化类测试会在控制台输出自动修复后的代码片段，便于排查。

执行所有测试：

```bash
pnpm vitest test/integrations
pnpm vitest test/rules
```

## 参与贡献

1. Fork & clone 仓库，执行 `pnpm install`
2. 修改代码并确保 `pnpm test` 全部通过
3. 提交 PR，说明本次变更内容与动机

如需新增 ESLint 集成，建议：

1. 先在 `src/integrations` 中实现逻辑
2. 在 `test/fixtures/integrations/<name>` 添加夹具（`options.json`、`files/`、`expect.json`）
3. 在 `test/integrations/<name>.test.ts` 调用 `lintIntegrationFixture` 并断言

## 许可证

[MIT](LICENSE)
