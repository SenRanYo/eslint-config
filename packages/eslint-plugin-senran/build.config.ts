import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // 入口文件
  entries: ['src/index'],
  // 是否生成声明文件
  declaration: true,
  // 是否清理输出目录
  clean: true,
  // rollup 配置
  rollup: {
    // 是否生成 CommonJS 格式的代码
    emitCJS: true,
  },
})

