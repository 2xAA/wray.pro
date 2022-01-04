module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2020,
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "prefer-const": "error",
    "no-var": "error",
  },
};
