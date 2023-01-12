import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export const { name, version } = require("../package.json") as { name: string; version: string };
