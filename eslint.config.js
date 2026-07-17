import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
      ],
    }
  }
];
