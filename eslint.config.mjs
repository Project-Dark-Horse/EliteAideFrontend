// eslint.config.js

import js from '@eslint/js';
import react from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      // Specify parser options here
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
  {
    files: ['**/*.{js,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'warn',
      'linebreak-style': 0,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        browser: true,
      },
    },
  },
];
