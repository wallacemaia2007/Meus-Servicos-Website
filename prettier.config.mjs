/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["eslint-plugin-simple-import-sort"],
};

export default config;
