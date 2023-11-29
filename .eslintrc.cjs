module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'tailwindcss/no-custom-classname': [
      'error',
      {
        whitelist: ['ql\\-[a-z]+'],
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: false,
        },
        allowList: {
          e2e: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'unicorn/no-null': 'off',
        'vue/no-v-html': 'off',
      },
    },
    {
      files: ['layouts/**/*.vue', 'pages/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['composables/**/*.ts', 'utils/**/*.ts', 'server/utils/**/*.ts'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
            },
          },
        ],
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
