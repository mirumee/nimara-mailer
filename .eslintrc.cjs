const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:typescript-sort-keys/recommended",
    "plugin:drizzle/recommended",
  ],
  plugins: [
    "prettier",
    "import",
    "simple-import-sort",
    "sort-keys-fix",
    "@typescript-eslint",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "curly": ["error", "all"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    "import/no-default-export": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],

          // Node.js builtins prefixed with `node:`.
          ["^node:"],

          // Packages. Things that start with a letter (or digit or underscore)
          ["^@?\\w"],

          // Virtual modules
          ["^/:"],

          // Anything not matched in another group.
          ["^"],
          // Relative imports.
          // Anything that starts with a dot.
          ["^\\.*"],
        ],
      },
    ],
  },
  overrides: [
    {
      rules: {
        "import/no-default-export": "off",
        "import/no-anonymous-default-export": "off",
      },
      files: [
        "**/plugins/**/*.ts",
        "**/emails/**/*.tsx",
        "*.config.*",
        "codegen.*",
      ],
    },
  ],
});
