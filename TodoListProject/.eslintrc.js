module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: ['error', 'always'],
    'object-shorthand': ['off'],
    'brace-style': ['error', 'allman'],
    'no-unused-vars': ['off', {vars: 'local'}],
    'no-multi-spaces': ['off'],
    quotes: ['off'],
    'space-before-function-paren': ['off'],
    'keyword-spacing': [
      'error',
      {
        overrides: {
          catch: {after: false},
        },
      },
    ],
  },
};
