import tseslint from 'typescript-eslint';

// @ts-check

import eslint from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginUnicorn.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['dist', 'eslint.config.js', 'vite.config.js', '*.d.ts', 'node_modules'],
  },
  {
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-null': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
    },
  }
);
