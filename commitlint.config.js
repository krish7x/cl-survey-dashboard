module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'feat', 'fix', 'refactor', 'revert', 'style', 'test'],
    ],
  },
};
