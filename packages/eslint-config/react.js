const config = {
  $schema: "https://json.schemastore.org/eslintrc.json",
  extends: ["./base"],
  plugins: ["react", "eslint-plugin-react"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
      },
    ],
  },
};

module.exports = config;
