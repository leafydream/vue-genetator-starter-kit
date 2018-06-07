'use strict'

const version = require('./package.json').version;

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 6
    },
    env: {
        node: true,
        mocha: true
    },
    extends: [
        'plugin:eslint-plugin/recommended',
        'plugin:vue-libs/recommended'
    ],
    rules: {
        'eslint-plugin/report-message-format': ['error', '^[A-Z`\'].*\\.$'],
        'eslint-plugin/prefer-placeholders': 'error',
        'eslint-plugin/consistent-output': 'error',
        "quotes": [2, "single"],
        "strict": [2, "never"],
        "babel/generator-star-spacing": 1,
        "babel/new-cap": 1,
        "babel/object-shorthand": 1,
        "babel/arrow-parens": 1,
        "babel/no-await-in-loop": 1
    },

    overrides: [{
        files: ['lib/rules/*.js'],
        rules: {
            "consistent-docs-description": "error",
            "no-invalid-meta": "error",
            "require-meta-docs-url": ["error", {
                "pattern": `https://github.com/vuejs/eslint-plugin-vue/blob/v${version}/docs/rules/{{name}}.md`
            }]
        }
    }]
};