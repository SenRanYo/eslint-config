# @senran/eslint-config

### 此源码大部分移植 [Anthony Fu](https://github.com/antfu) 大佬的 [eslint-config](https://github.com/antfu/eslint-config)，并加入一些DIY化配置，感谢原作者的贡献和付出。

- 使用单引号，不需要分号
- 自动修复格式（旨在独立使用，**无需** Prettier）
- 设计用于与 TypeScript、Vue 无缝配合
- 对 json、yaml、markdown 进行语法检查
- 排序 import，处理末尾逗号
- 合理的默认设置、最佳实践，仅需一行配置
- **风格原则**: 最小化阅读难度，保持稳定的差异性

## 使用

### 安装

```bash
pnpm add -D eslint @senran/eslint-config
```

### 配置 `.eslintrc`

```json
{
  "extends": "@senran"
}
```

> 您通常不需要 `.eslintignore` 因为它是由预设提供的.

### 添加脚本到 package.json

例如:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 配置VS代码自动修复

安装 [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 和创建 `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### TypeScript Aware Rules

当在项目根目录中找到 `tsconfig.eslint.json` 文件时，Type aware 规则将被启用，这将在您的项目中引入一些更严格的规则。如果您想在没有 `tsconfig.eslint.json` 文件的情况下启用它，可以通过修改 `ESLINT_TSCONFIG` 环境变量来更改 tsconfig 的名称。

```js
// .eslintrc.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@senran'
}
```

### Lint Staged

如果您想在每次提交之前应用 lint 和自动修复，可以将以下内容添加到您的 `package.json` 文件中：

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

然后

```bash
npm i -D lint-staged simple-git-hooks
```

## FAQ

### Prettier?

[为什么不使用Prettier](https://antfu.me/posts/why-not-prettier)

### How to lint CSS?

这个配置文件不会对 CSS 进行代码检查。我个人使用 [UnoCSS](https://github.com/unocss/unocss) 来避免写 CSS。如果你仍然喜欢使用 CSS，你可以使用 [stylelint](https://stylelint.io/) 来进行代码检查。

### I prefer XXX...

当然，您可以覆盖您的 `.eslintrc` 文件中的规则。

<!-- eslint-skip -->

```jsonc
{
  "extends": "@senran",
  "rules": {
    // your rules...
  }
}
```

或者你可以fork这个仓库并创建你自己的版本。

## Check Also

- [antfu/dotfiles](https://github.com/antfu/dotfiles) - My dotfiles
- [antfu/vscode-settings](https://github.com/antfu/vscode-settings) - My VS Code settings
- [antfu/ts-starter](https://github.com/antfu/ts-starter) - My starter template for TypeScript library
- [antfu/vitesse](https://github.com/antfu/vitesse) - My starter template for Vue & Vite app

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [SenRan](https://github.com/SenRanYo)
