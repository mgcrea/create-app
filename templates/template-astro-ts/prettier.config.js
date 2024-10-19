/** @type {import("prettier").Config} */
export default {
  printWidth: 111,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
