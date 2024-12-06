// @ts-check

/**
 * Jest configuration
 * @see https://jestjs.io/docs/configuration
 * @type {import('jest').Config}
 */
export default {
  preset: "react-native",
  snapshotResolver: "./test/snapshotResolver.ts",
  setupFilesAfterEnv: ["./test/setupAfterEnv.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
