import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import { fixupPluginRules } from '@eslint/compat';
import reactHooks from 'eslint-plugin-react-hooks';
import path from 'node:path';
import url from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';

export default tsEslint.config(
  { ignores: ['**/*.js'] },
  {
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      ...new FlatCompat({
        baseDirectory: path.dirname(url.fileURLToPath(import.meta.url)),
      }).extends('eslint-config-standard'),
      ...tsEslint.configs.recommended,
      prettier,
    ],
    plugins: { 'react-hooks': fixupPluginRules(reactHooks) },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,
    },
  },
);
