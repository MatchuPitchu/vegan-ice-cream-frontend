import eslint from '@eslint/js'
import checkFile from 'eslint-plugin-check-file'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/public',
      '**/dist',
      '**/build',
      '**/coverage',
      '**/.husky',
      'cypress.config.ts',
    ],
  },
  eslint.configs.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  importPlugin.flatConfigs.recommended,
  // jsxA11y.flatConfigs.recommended, // for now disabled
  // typescript eslint rules: https://typescript-eslint.io/getting-started/#additional-configs
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  {
    files: ['**/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{jsx,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: 'latest',
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js'],
          defaultProject: 'tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      // import resolver only needed for `eslint-plugin-import`
      // https://github.com/import-js/eslint-plugin-import/issues/2948#issuecomment-2148832701
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    // rules: https://eslint.org/docs/latest/rules/
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // base rule must be disabled as it can report incorrect errors
      // https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports', // allows e.g. import type { ... } from 'react' and import { ...} from 'react' and the first import type is completely removed by the compiler
        },
      ], // automatically detects if imported module is type or not and formats if needed
      'react/jsx-props-no-spreading': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'accessor-pairs': 'warn',
      'capitalized-comments': 'off',
      'default-case': 'warn',
      'default-case-last': 'error',
      'dot-notation': 'warn',
      eqeqeq: 'error',
      'func-style': ['error', 'expression'],
      'import/no-duplicates': 'error',
      'max-depth': ['warn', 3],
      'max-nested-callbacks': ['warn', 3],
      'no-console': 'warn',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-eq-null': 'error',
      'no-lonely-if': 'warn',
      'no-nested-ternary': 'warn',
      'no-shadow': 'off',
      'no-template-curly-in-string': 'warn',
      'no-unreachable-loop': 'warn',
      'no-use-before-define': 'warn',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
    },
  },
)
