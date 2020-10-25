module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx',
  ],
  rules: {
    'import/no-named-as-default-member': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
  },
};
