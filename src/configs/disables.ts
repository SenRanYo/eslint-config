import type { TypedFlatConfigItem } from '../types';
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';

export async function disables(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [`**/scripts/${GLOB_SRC}`],
      name: 'senran/disables/scripts',
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
    {
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      name: 'senran/disables/cli',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.d.?([cm])ts'],
      name: 'senran/disables/dts',
      rules: {
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'senran/disables/cjs',
      rules: {
        'ts/no-require-imports': 'off',
      },
    },
    {
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      name: 'senran/disables/config-files',
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
  ];
}
