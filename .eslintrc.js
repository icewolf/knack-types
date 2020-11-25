require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:vue/essential',
    '@vue/typescript',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    // fixes https://stackoverflow.com/a/63961972
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        config: {
          resolve: {
            extensions: ['.js', '.ts'],
          },
        },
      },
    },
    'import/extensions': ['ts', 'js'],
  },
};
