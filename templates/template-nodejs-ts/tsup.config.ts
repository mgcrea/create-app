import { defineConfig } from "tsup";

const tsupConfig = defineConfig({
  entry: {
    cli: "src/bin/cli.ts",
    index: "src/index.ts",
  },
  splitting: false,
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});

export default tsupConfig;
