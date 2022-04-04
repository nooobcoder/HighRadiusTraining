module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'plugin:tailwindcss/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'tailwindcss'],
  rules: {
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-console': 'off',
    'object-curly-newline': 'off',
  },
};
