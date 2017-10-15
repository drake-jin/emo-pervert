module.exports = {
  'extends': 'airbnb-base',
  'env': {
      'browser': false,
      'node': true,
      'jest': true
  },
  'rules': {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-unused-vars':['error',{'args':'all'}],
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'arrow-body-style': 'off',
      'no-use-before-define': 'off',
      'no-underscore-dangle': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-escape': 'off',
      'no-undef': 'off',
      'arrow-parens': 'off',
  },
  'parserOptions': {
      'ecmaVersion': 2017,
      'sourceType': 'module',
  },
}
