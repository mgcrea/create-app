// @ts-check
import baseConfig from "@mgcrea/eslint-config-react-native";

/**
 * Eslint configuration
 * @see https://eslint.org/docs/latest/use/configure/
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  ...baseConfig,
  {
    files: ["**/*.{mock,spec,test,snap}.{js,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  },
];

export default config;
