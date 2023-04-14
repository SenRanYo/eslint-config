const fs = require('node:fs')
const { join } = require('node:path')
const basic = require('@senran/eslint-config-basic')

// 定义tsconfig文件名，如果没有定义则默认为'tsconfig.eslint.json'
const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json'

module.exports = {
  extends: [
    '@senran/eslint-config-basic',
    // TypeScript相关的import语句
    'plugin:import/typescript',
    // TypeScript的推荐配置
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  overrides: basic.overrides.concat(
    // 判断tsconfig文件是否存在
    !fs.existsSync(join(process.cwd(), tsconfig))
      ? []
      : [{
          parserOptions: {
            tsconfigRootDir: process.cwd(), // 解析 tsconfig.json 的根目录
            project: [tsconfig], // TypeScript 项目配置文件的路径
          },
          parser: '@typescript-eslint/parser', // 解析 TypeScript 代码的解析器
          excludedFiles: ['**/*.md/*.*'], // 排除 Markdown 文件
          files: ['*.ts', '*.tsx', '*.mts', '*.cts'], // 仅检查 TypeScript 和 TSX 文件
          rules: {
            'no-throw-literal': 'off', // 禁止抛出字面量
            '@typescript-eslint/no-throw-literal': 'error', // 禁止抛出字面量（TypeScript 版）
            'no-implied-eval': 'off', // 禁止隐含的 eval
            '@typescript-eslint/no-implied-eval': 'error', // 禁止隐含的 eval（TypeScript 版）
            'dot-notation': 'off', // 禁止不必要的方括号
            '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }], // 强制使用点操作符
            '@typescript-eslint/no-floating-promises': 'error', // 禁止未处理的 Promise
            '@typescript-eslint/no-misused-promises': 'error', // 禁止 Promise 误用
            '@typescript-eslint/await-thenable': 'error', // 禁止使用非 Promise 的 thenable
            '@typescript-eslint/no-for-in-array': 'error', // 禁止 for...in 遍历数组
            '@typescript-eslint/no-unnecessary-type-assertion': 'error', // 禁止不必要的类型断言
            '@typescript-eslint/no-unsafe-argument': 'error', // 禁止不安全的参数类型
            '@typescript-eslint/no-unsafe-assignment': 'error', // 禁止不安全的类型转换
            '@typescript-eslint/no-unsafe-call': 'error', // 禁止不安全的函数调用
            '@typescript-eslint/no-unsafe-member-access': 'error', // 禁止不安全的成员访问
            '@typescript-eslint/no-unsafe-return': 'error', // 禁止不安全的返回值类型
            'require-await': 'off', // 禁止在 async 函数中使用无需等待的异步函数
            '@typescript-eslint/require-await': 'error', // 强制在 async 函数中使用等待的异步函数
            '@typescript-eslint/restrict-plus-operands': 'error', // 强制数值类型的加法使用明确的类型
            '@typescript-eslint/restrict-template-expressions': 'error', // 禁止类型不明确的模板字符串
            '@typescript-eslint/unbound-method': 'error', // 禁止未绑定 this 的方法访问实例属性
          },
        },
        // Jest 测试框架的配置
        {
          files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
          plugins: ['jest'],
          rules: {
            '@typescript-eslint/unbound-method': 'off', // 禁用ESLint中的'unbound-method'规则，该规则检测类成员方法是否正确地绑定到实例上，因为Jest在运行测试时会在执行上下文中自动绑定this对象，所以禁用该规则避免冗余的警告信息。
            'jest/unbound-method': 'error', // 启用Jest插件中的'unbound-method'规则，该规则与ESLint中的'unbound-method'类似，但是它只在Jest测试代码中检测。
          },
        }],
  ),
  rules: {
    // TypeScript 相关的规则
    'import/named': 'off', // 关闭默认规则，使用 @typescript-eslint/eslint-plugin 规则
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }], // 禁止使用特定的 TypeScript 注释语法
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }], // 类型定义成员的分号样式
    '@typescript-eslint/type-annotation-spacing': ['error', {}], // 强制类型注释的间距一致
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }], // 强制一致地使用 import 语句导入类型
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // 强制使用 interface 而不是 type 定义对象类型
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 在 catch 块中使用 TypeScript 的 @ts-expect-error 而不是 @ts-ignore

    'no-useless-constructor': 'off', // 禁用 no-useless-constructor 规则，该规则用于检测不必要的构造函数
    'indent': 'off', // 禁用 indent 规则，该规则用于强制使用一致的缩进风格

    // 控制 TypeScript 代码的缩进风格，使用2个空格进行缩进
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1, // switch 语句中 case 子句相对于 switch 语句缩进 1 个空格
      VariableDeclarator: 1, // 变量声明语句中的变量相对于变量声明语句缩进 1 个空格
      outerIIFEBody: 1, // 自调用函数表达式中函数体相对于 IIFE 起始括号缩进 1 个空格
      MemberExpression: 1, // 成员表达式中的属性相对于对象缩进 1 个空格
      FunctionDeclaration: { parameters: 1, body: 1 }, // 函数声明中的参数和函数体相对于函数关键字缩进 1 个空格
      FunctionExpression: { parameters: 1, body: 1 }, // 函数表达式中的参数和函数体相对于函数关键字缩进 1 个空格
      CallExpression: { arguments: 1 }, // 函数调用中的参数相对于函数名缩进 1 个空格
      ArrayExpression: 1, // 数组表达式中的元素相对于数组起始括号缩进 1 个空格
      ObjectExpression: 1, // 对象表达式中的属性相对于对象起始括号缩进 1 个空格
      ImportDeclaration: 1, // import 语句中的规范模块路径相对于 import 关键字缩进 1 个空格
      flatTernaryExpressions: false, // 不允许使用悬挂缩进的三元表达式
      ignoreComments: false, // 不忽略注释
      ignoredNodes: [
        // 忽略以下节点
        'TemplateLiteral *',
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild',
        'TSTypeParameterInstantiation',
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
      offsetTernaryExpressions: true, // 在三元表达式的第二个操作数（即冒号后面）后保留一个额外的缩进级别
    }],

    'no-redeclare': 'off', // 禁止重复声明变量
    '@typescript-eslint/no-redeclare': 'error', // 禁止在 TypeScript 中重复声明变量
    'no-use-before-define': 'off', // 禁止在变量定义之前使用它们
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }], // 禁止在 TypeScript 中在变量定义之前使用它们，但允许在函数和类定义之前使用它们
    'brace-style': 'off', // 大括号的样式
    '@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }], // 在 TypeScript 中强制使用 Stroustrup 风格的大括号，并允许单行大括号
    'comma-dangle': 'off', // 尾随逗号的样式
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'], // 在 TypeScript 中要求尾随逗号，但只在多行情况下
    'object-curly-spacing': 'off', // 对象字面量中大括号的样式
    '@typescript-eslint/object-curly-spacing': ['error', 'always'], // 在 TypeScript 中强制对象字面量中的大括号使用空格
    'semi': 'off', // 分号的样式
    '@typescript-eslint/semi': ['error', 'never'], // 在 TypeScript 中禁止使用分号
    'quotes': 'off', // 引号的样式
    '@typescript-eslint/quotes': ['error', 'single'], // 在 TypeScript 中强制使用单引号
    'space-before-blocks': 'off', // 代码块的前后空格
    '@typescript-eslint/space-before-blocks': ['error', 'always'], // 在 TypeScript 中要求代码块之前使用空格
    'space-before-function-paren': 'off', // 函数参数的前后空格
    '@typescript-eslint/space-before-function-paren': [ // 在 TypeScript 中要求在函数的参数列表和圆括号之间使用空格
      'error',
      {
        anonymous: 'always', // 对于匿名函数，始终需要空格
        named: 'never', // 对于命名函数，不需要空格
        asyncArrow: 'always', // 对于异步箭头函数，始终需要空格
      },
    ],

    'space-infix-ops': 'off', // 禁用原生的空格操作符检查规则
    '@typescript-eslint/space-infix-ops': 'error', // 启用TypeScript插件的空格操作符检查规则
    'keyword-spacing': 'off', // 禁用原生的关键字空格检查规则
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }], // 启用TypeScript插件的关键字空格检查规则，并指定检查前后都要有空格
    'comma-spacing': 'off', // 禁用原生的逗号空格检查规则
    '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }], // 启用TypeScript插件的逗号空格检查规则，并指定逗号后面要有空格，逗号前面不需要空格
    'no-extra-parens': 'off', // 禁用原生的额外括号检查规则
    '@typescript-eslint/no-extra-parens': ['error', 'functions'], // 启用TypeScript插件的额外括号检查规则，并指定只检查函数部分
    'no-dupe-class-members': 'off', // 禁用原生的类成员重复检查规则
    '@typescript-eslint/no-dupe-class-members': 'error', // 启用TypeScript插件的类成员重复检查规则
    'no-loss-of-precision': 'off', // 禁用原生的精度丢失检查规则
    '@typescript-eslint/no-loss-of-precision': 'error', // 启用TypeScript插件的精度丢失检查规则
    'lines-between-class-members': 'off', // 禁用原生的类成员之间空行检查规则
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }], // 启用TypeScript插件的类成员之间空行检查规则，并指定在单行类成员后不需要空行，其他情况都需要空行

    'senran/generic-spacing': 'error',

    '@typescript-eslint/consistent-indexed-object-style': 'off', // 禁止在对象和接口中使用不一致的索引签名风格
    '@typescript-eslint/naming-convention': 'off', // 强制使用特定的命名规则
    '@typescript-eslint/explicit-function-return-type': 'off', // 要求函数和类方法的显式返回类型
    '@typescript-eslint/explicit-member-accessibility': 'off', // 要求类和接口成员的可访问性声明
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/parameter-properties': 'off', // 强制函数参数的双重约束
    '@typescript-eslint/no-empty-interface': 'off', // 禁止空接口
    '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 // @ts-ignore 注释
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
    '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用非空断言运算符
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 强制导出函数和类的公共类和函数的显式返回类型和参数类型
    '@typescript-eslint/ban-types': 'off', // 禁止特定的类型
    '@typescript-eslint/no-namespace': 'off', // 禁止使用命名空间
    '@typescript-eslint/triple-slash-reference': 'off', // 禁止使用三斜线引用
    // handled by unused-imports/no-unused-imports
    '@typescript-eslint/no-unused-vars': 'off', // 禁止未使用的变量
  },
}
