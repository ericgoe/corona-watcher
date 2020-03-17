module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    rules: {
        //eslint rules
        'no-console': 'warn',
        //typescript rules
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/interface-name-prefix': [
            'error',
            'always'
        ],
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                "ignoreParameters": true,
                "ignoreProperties": true,
            }
        ]
    }
}