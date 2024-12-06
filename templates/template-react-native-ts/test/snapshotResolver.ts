export default {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath: string, snapshotExtension: string) =>
    testPath.replace(/\.test\.([tj]sx?)/, `${snapshotExtension}.$1`),

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) =>
    snapshotFilePath.replace(snapshotExtension, ".test"),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "some/example.test.js",
};
