module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
        browser: false,
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "react/react-in-jsx-scope": "off",
    camelcase: "error",
    "no-duplicate-imports": "error",
  },
};
