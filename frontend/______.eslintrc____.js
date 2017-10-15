module.exports = {
    'extends': 'airbnb',
    'env': {
        'browser': true,
        'node': true,
        'jest': true
    },
    'rules': {
        // enable additional rules
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'no-unused-vars':['error',{'args':'all'}],
        'no-console': 'off', // default is warning
        // disable rules from base configurations
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'arrow-body-style': 'off',
        'no-use-before-define': 'off',
        'no-underscore-dangle': 'off',
        'no-prototype-builtins': 'off',
        'no-useless-escape': 'off',
        'no-undef': 'off',
        'arrow-parens': 'off',

        'react/jsx-filename-extension': 'off',
        'react/no-render-return-value': 'off',
    },
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module',
    },
};