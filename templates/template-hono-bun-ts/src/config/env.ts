import { resolve } from "node:path";
import { name, version } from "../../package.json" assert { type: "json" };

export const ROOT_DIR = resolve(
  __dirname.endsWith("dist") ? `${__dirname}/..` : `${__dirname}/../..`,
);

// Package
export const PACKAGE_NAME = name;
export const PACKAGE_VERSION = version;
export const PACKAGE_RELEASE = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;

// Environment
export const NODE_ENV = process.env["NODE_ENV"] ?? "development";
export const [IS_DEV, IS_PROD] = [NODE_ENV === "development", NODE_ENV === "production"];
export const NODE_PORT = process.env["NODE_PORT"] ? parseInt(process.env["NODE_PORT"]) : 3000;
export const NODE_HOST = process.env["NODE_HOST"] ?? "0.0.0.0";
