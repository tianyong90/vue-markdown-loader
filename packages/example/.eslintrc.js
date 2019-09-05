module.exports = {
  root: false,
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
  },
  'extends': [
    "plugin:prettier/recommended",
    "prettier/standard",
    'plugin:jest/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'jest',
    'prettier',
    '@typescript-eslint',
  ],
  'rules': {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'jest/no-large-snapshots': 'warn',
    'jest/prefer-spy-on': 'warn',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'import/export': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none',
          },
          singleline: {
            delimiter: 'comma',
          },
        }],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
  ],
}
