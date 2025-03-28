import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "!**/.*",
    "**/.git",
    "**/.vite",
    "**/build",
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:tailwindcss/recommended",
      ),
    ),

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      react,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },

      react: {
        version: "detect",
      },
    },

    rules: {
      "@typescript-eslint/no-misused-promises": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
      "react/prop-types": "off",
      "react/state-in-constructor": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-key": "warn",
      "react/display-name": "off",
      // Known limitation as tailwindcss plugin support only version 3
      "tailwindcss/no-custom-classname": "off",
    },
  },
]);
