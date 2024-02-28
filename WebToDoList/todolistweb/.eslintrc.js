module.exports = {
    extends: [
        'semistandard',
    ],
    globals:
    {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
    },
    rules:
    {
        semi: ['error', 'always',],
        "object-shorthand": ["off",],
        'brace-style': ['error', 'allman',],
        indent:
        [
            'error', 4,
            {
                outerIIFEBody: 1,
                FunctionExpression: { body: 1, parameters: 2, },
                SwitchCase: 1,
            },
        ],
        'no-unused-vars': ['off', { vars: 'local', },],
        'no-multi-spaces': ['off',],
        quotes: ["off",],
        "space-before-function-paren": ["off",],
        "comma-dangle":
            [
                "error",
                {
                    arrays: "always",
                    objects: "always",
                    imports: "always",
                    exports: "always",
                    functions: "never",
                },
            ],
        "keyword-spacing":
            [
                "error",
                {
                    overrides:
                    {
                        catch: { after: false, },
                    },
                },
            ],
    },
};
