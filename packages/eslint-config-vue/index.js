const { isPackageExists } = require('local-pkg')

const TS = isPackageExists('typescript')

if (!TS)
  console.warn('[@senran/eslint-config] TypeScript is not installed, fallback to JS only.')

module.exports = {
  overrides: [
    {
      // 对于.vue文件，使用vue-eslint-parser解析器
      files: ['*.vue'],
      // 使用vue-eslint-parser解析器
      parser: 'vue-eslint-parser',
      parserOptions: {
        // 使用@typescript-eslint/parser解析器
        parser: '@typescript-eslint/parser',
      },
      rules: {
        // 关闭no-unused-vars规则
        'no-unused-vars': 'off',
        // 关闭no-undef规则
        'no-undef': 'off',
        // 如果没有安装TypeScript，则关闭@typescript-eslint/no-unused-vars规则
        ...(TS ? { '@typescript-eslint/no-unused-vars': 'off' } : null),
      },
    },
  ],
  extends: [
    // 使用vue3-recommended插件
    'plugin:vue/vue3-recommended',
    // 如果安装了TypeScript，则使用@senran/eslint-config-ts配置，否则使用@senran/eslint-config-basic配置
    TS
      ? '@senran/eslint-config-ts'
      : '@senran/eslint-config-basic',
  ],
  rules: {
    // 关闭每行最大属性数限制
    'vue/max-attributes-per-line': 'off',
    // 关闭禁止使用v-html指令
    'vue/no-v-html': 'off',
    // 关闭要求prop类型
    'vue/require-prop-types': 'off',
    // 关闭要求默认prop
    'vue/require-default-prop': 'off',
    // 关闭多个单词组成的组件名
    'vue/multi-word-component-names': 'off',
    // 关闭优先使用import Vue from 'vue'的规则
    'vue/prefer-import-from-vue': 'off',
    // 关闭在组件上使用v-html和v-text指令
    'vue/no-v-text-v-html-on-component': 'off',
    // 关闭在setup函数中解构props
    'vue/no-setup-props-destructure': 'off',
    // 组件标签顺序
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    // 块标签换行
    'vue/block-tag-newline': ['error', {
      singleline: 'always',
      multiline: 'always',
    }],
    // 组件名在模板中的大小写风格
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    // 组件选项的命名风格
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    // 自定义事件名的命名风格
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    // 定义宏的顺序
    'vue/define-macros-order': ['error', {
      order: ['defineProps', 'defineEmits'],
    }],
    // HTML注释的内容前后是否需要空格
    'vue/html-comment-content-spacing': ['error', 'always', {
      exceptions: ['-'],
    }],
    // 禁止使用v-bind指令的值以v-开头
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    // 禁止使用无效的v-bind指令
    'vue/no-useless-v-bind': 'error',
    // 禁止定义未使用的ref
    'vue/no-unused-refs': 'error',
    // 在块之间填充空行
    'vue/padding-line-between-blocks': ['error', 'always'],
    // 静态类应该单独成行
    'vue/prefer-separate-static-class': 'error',
    // 数组方括号内的间距
    'vue/array-bracket-spacing': ['error', 'never'],
    // 箭头函数的间距
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    // 块内的间距
    'vue/block-spacing': ['error', 'always'],
    // 大括号的风格
    'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    // 对象或数组的最后一个元素后是否加逗号
    'vue/comma-dangle': ['error', 'always-multiline'],
    // 逗号前后的间距
    'vue/comma-spacing': ['error', { before: false, after: true }],
    // 逗号的风格
    'vue/comma-style': ['error', 'last'],
    // 点号的位置
    'vue/dot-location': ['error', 'property'],
    // 对象属性的访问方式
    'vue/dot-notation': ['error', { allowKeywords: true }],
    // 使用全等
    'vue/eqeqeq': ['error', 'smart'],
    // 'vue/func-call-spacing': ['off', 'never'],
    // 对象字面量中冒号的前后空格
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 关键字前后的空格
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    // 禁止在条件语句中出现常量表达式
    'vue/no-constant-condition': 'warn',
    // 禁止使用空解构模式
    'vue/no-empty-pattern': 'error',
    // 禁止不必要的括号
    'vue/no-extra-parens': ['error', 'functions'],
    // 禁止不规则的空白
    'vue/no-irregular-whitespace': 'error',
    // 禁止精度损失
    'vue/no-loss-of-precision': 'error',
    // 禁用特定的语法
    'vue/no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    // 禁止使用稀疏数组
    'vue/no-sparse-arrays': 'error',
    // 对象字面量中大括号内的换行符的风格
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    // 对象字面量中大括号内的间距的风格
    'vue/object-curly-spacing': ['error', 'always'],
    // 对象字面量中每个属性的换行符的风格
    'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    // 对象字面量中属性名的引号风格
    'vue/object-shorthand': [
      'error',
      'always',
      {
        // 是否忽略构造函数
        ignoreConstructors: false,
        // 是否避免使用引号
        avoidQuotes: true,
      },
    ],
    // 操作符的换行风格
    'vue/operator-linebreak': ['error', 'before'],
    // 优先使用模板字符串
    'vue/prefer-template': 'error',
    // 对象字面量中属性名的引号风格
    'vue/quote-props': ['error', 'consistent-as-needed'],
    // 圆括号内的间距
    'vue/space-in-parens': ['error', 'never'],
    // 操作符之间的间距
    'vue/space-infix-ops': 'error',
    // 一元操作符之后的间距
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    // 模板字符串中花括号内的间距
    'vue/template-curly-spacing': 'error',
  },
}
