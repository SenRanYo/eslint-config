module.exports = {
  // 继承插件推荐的配置
  extends: [
    'plugin:react/recommended', // 使用 React 推荐的配置
    'plugin:react-hooks/recommended', // 使用 React hooks 推荐的配置
    '@senran/eslint-config-ts', // 使用 @senran/eslint-config-ts 的 TypeScript 配置
  ],
  settings: {
    // 配置 React 版本
    react: {
      version: '17.0',
    },
  },
  rules: {
    // 强制使用双引号的 JSX 属性
    'jsx-quotes': [
      'error',
      'prefer-double',
    ],
    // 关闭在 JSX 中导入 React 的警告
    'react/react-in-jsx-scope': 'off',
  },
}
