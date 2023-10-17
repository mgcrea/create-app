import { createRequire } from "node:module";

// Package
const require = createRequire(import.meta.url);
export const { name: PACKAGE_NAME, version: PACKAGE_VERSION } = require("../package.json") as {
  name: string;
  version: string;
};

// Environment
export const NODE_ENV = process.env["NODE_ENV"] ?? "development";
export const [IS_DEV, IS_PROD] = [NODE_ENV === "development", NODE_ENV === "production"];
export const NODE_PORT = process.env["NODE_PORT"] ? parseInt(process.env["NODE_PORT"]) : 3000;
export const NODE_HOST = process.env["NODE_HOST"] ?? "0.0.0.0";
