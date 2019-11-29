module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-use-before-define': 'off',
    'prettier/prettier': 'on',
    'global-require': 'warn',
    'no-undef': 'off',
    'prefer-template': 'off',
    'no-plusplus': 'warn',
    'linebreak-style': 'off',
    'no-restricted-syntax': 'warn',
    'no-restricted-globals': 'warn',
    'comma-dangle': 'warn',
    'curly': 'off',
    'nonblock-statement-body-position': 'off'

  }
};