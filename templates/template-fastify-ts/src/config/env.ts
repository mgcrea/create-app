import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve root directory
const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = resolve(
  __dirname.endsWith("dist") ? `${__dirname}/..` : `${__dirname}/../..`,
);

// Package info
const require = createRequire(import.meta.url);
export const { name: PACKAGE_NAME, version: PACKAGE_VERSION } = require(
  join(ROOT_DIR, "package.json"),
) as {
  name: string;
  version: string;
};
export const PACKAGE_RELEASE = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;

// Environment
export const NODE_ENV = process.env["NODE_ENV"] ?? "development";
export const [IS_DEV, IS_PROD, IS_TEST] = [
  NODE_ENV === "development",
  NODE_ENV === "production",
  NODE_ENV === "test",
];

// Server configuration
export const NODE_PORT = process.env["NODE_PORT"] ? parseInt(process.env["NODE_PORT"]) : 3000;
export const NODE_HOST = process.env["NODE_HOST"] ?? "0.0.0.0";
export const LOG_LEVEL = process.env["LOG_LEVEL"] ?? "debug";
