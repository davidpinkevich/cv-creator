import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{ts,tsx}"] },
  { ignores: ["**/*.js"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^react", "^\\w", "^@"], ["^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },
];
