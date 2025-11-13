# import-length-order

按导入语句长度对 `import`/`export` 语句排序，`type-only` 导入优先，短语句优先。

## 规则详情

这个规则自动对文件顶部的 import/export 语句块进行排序，遵循以下优先级：

1. **优先级 1**：`type-only` 导入/导出（`import type` 或 `export type`）
2. **优先级 2**：普通导入/导出

同一优先级内按照语句长度从短到长排序。这样做的好处是：

- ✅ 类型导入与运行时导入清晰分离
- ✅ 便于快速定位导入项（短的在前）
- ✅ 符合现代 TypeScript 最佳实践
- ✅ 自动处理 specifiers 排序

## 排序示例

### 不好的做法

```js
import { veryLongNamedImport, a } from 'module';
import type { TypeA, TypeB } from 'types';
import { b } from 'lib';
import type { Config } from './config';
```

### 好的做法

```js
import type { Config } from './config';
import type { TypeA, TypeB } from 'types';
import { b } from 'lib';
import { veryLongNamedImport, a } from 'module';
```

### Specifier 排序

大括号内的 specifiers 也会自动按长度排序：

```js
// 排序前
import { veryLongSpecifierName, b, abc } from 'pkg';

// 排序后
import { b, abc, veryLongSpecifierName } from 'pkg';
```

## 选项

```ts
type Options = {
  groupType?: boolean;      // 是否将 type-only 导入分组到最前面（默认 true）
  ignoreNames?: string[];   // 忽略的模块名称列表
  maxLines?: number;        // 导入块最大行数限制（默认 50）
};
```

### `groupType` (默认: `true`)

控制是否将 `type-only` 导入单独分组到最前面。

```js
/* groupType: true */
import type { T } from 'types';
import { a } from 'lib';

/* groupType: false */
import { a } from 'lib';
import type { T } from 'types';
```

### `ignoreNames` (默认: `[]`)

指定一个模块名称列表，这些模块的导入将保持原有顺序，不参与自动排序。

```js
/* ignoreNames: ['react', '@/utils'] */
import { VeryLongComponentName } from 'react';   // 保持不变
import { z } from 'zod';                        // 被排序
import { a } from 'lib';                        // 被排序
import { LongUtilName } from '@/utils';         // 保持不变
```

### `maxLines` (默认: `50`)

指定导入块的最大行数限制。当导入块超过此行数时，规则将不自动排序。

## 配置示例

### ESLint Flat Config

```ts
import { importLengthOrderRule } from '@senran/eslint-config/rules';

export default [
  {
    rules: {
      'senran/import-length-order': [
        'warn',
        {
          groupType: true,
          ignoreNames: ['react', 'vue'],
          maxLines: 50,
        },
      ],
    },
  },
];
```

## 何时使用此规则

**应该启用** 如果你想要：

- 自动组织导入语句
- 将 type-only 导入与运行时导入分离
- 快速查找导入项

**应该禁用** 如果：

- 团队已有其他导入排序工具
- 需要自定义排序规则

## 与其他规则的配合

此规则可以与以下规则协作：

- [`import/order`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md) - 按路径分类排序
- [`simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort) - 简化导入排序
- [`@typescript-eslint`](https://typescript-eslint.io/) - TypeScript 相关检查

## 自动修复

此规则支持 ESLint 的自动修复：

```bash
eslint --fix src/
```

## 注意事项

⚠️ **重要提示**：

1. 此规则只处理文件顶部的连续导入/导出块
2. 一旦遇到其他代码语句，导入块被视为结束
3. 注释和空行会被保留
4. 缩进格式会被保持
5. 超出 `maxLines` 限制的导入块不会被修改

```js
// 这部分会被处理
import { a } from 'lib';
import { b } from 'lib2';

// 这里有其他代码
const x = 1;

// 这部分导入不会被处理
import { c } from 'lib3';
```

## 性能

此规则的性能影响极小：

- 只分析文件顶部的导入块
- 使用高效的字符串匹配
- 缓存计算结果

## 相关资源

- [ESLint 规则入门](https://eslint.org/docs/rules/)
- [TypeScript import type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-exports)
