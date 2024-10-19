// @ts-check
import baseConfig from "@mgcrea/eslint-config-astro";

const config = [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default config;
