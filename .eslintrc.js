module.exports = {
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    'import/no-unresolved': 'warn',
    'import/order': 'warn',
  },
};
