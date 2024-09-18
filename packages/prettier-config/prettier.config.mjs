/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  useTabs: false,
  arrowParens: "avoid",
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 79,
  customAttributes: ["className"],
  customFunctions: ["classNames", "cn"],
  plugins: [],
};

export default config;
