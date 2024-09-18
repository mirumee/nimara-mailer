/**
 * @type {import("eslint").Config}
 */
const config = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:typescript-sort-keys/recommended",
  ],
  plugins: [
    "import",
    "prettier",
    "simple-import-sort",
    "sort-keys-fix",
    "@typescript-eslint",
  ],
  rules: {
    curly: ["error", "all"],
    "no-unused-vars": "off",
    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        caughtErrors: "none",
        argsIgnorePattern: "^_",
        args: "none",
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports" },
    ],
    "import/no-default-export": ["error"],
    "arrow-body-style": ["error", "as-needed"],
    "no-restricted-imports": [
      "error",
      {
        paths: ["lodash"],
      },
    ],
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect  imports.
          ["^\\u0000"],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^@?\\w"],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything that does not start with a dot.
          ["^[^. ]"],
          // turbo apps/packages
          ["^@nimara-mailer"],
          // Aliases.
          ["^@/"],
          // Relative imports.
          // Anything that starts with a dot.
          ["^\\."],
          // Assets.
          ["^(@/assets|!!raw-loader)"],
          // Styles
          ["w*(@/styles|messages)"],
        ],
      },
    ],
  },

  overrides: [
    {
      files: ["*.d.ts", "codegen.*", "prettier.config.*"],
      rules: {
        "import/no-default-export": "off",
        "import/no-anonymous-default-export": "off",
      },
    },
  ],

  ignorePatterns: [
    "schema.ts",
    "generated.ts",
    "graphql.schema.json",
    "prettier.config.*",
    ".eslintrc.*",
    "*.d.ts",
    "schema.ts",
    "build",
    "node_modules",
  ],
};

module.exports = config;
