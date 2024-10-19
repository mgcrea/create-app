// @ts-check
import baseConfig from "@mgcrea/eslint-config-node";

const config = [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default config;
