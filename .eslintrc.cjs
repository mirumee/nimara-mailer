module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:typescript-sort-keys/recommended",
    "plugin:drizzle/recommended",
  ],
  ignorePatterns: [
    "node_modules",
    "generated.ts",
    "schema.ts",
    "*.d.ts",
    "build",
  ],
  plugins: [
    "prettier",
    "simple-import-sort",
    "sort-keys-fix",
    "@typescript-eslint",
    "sort-keys-fix",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        disallowTypeAnnotations: false,
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      },
    ],

    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        argsIgnorePattern: "^_",
        caughtErrors: "none",
        ignoreRestSiblings: true,
      },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "curly": ["error", "all"],
    "import/no-default-export": ["error"],
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
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
    "sort-keys-fix/sort-keys-fix": "error",
  },
};
