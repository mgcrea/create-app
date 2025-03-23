import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "./server";

export const server = await createServer();

export default server.handler;

// Determine if this is the main entry point
const currentFile = fileURLToPath(import.meta.url);
const entryArg = resolve(process.argv[1] ?? "");
const isMain = entryArg === currentFile || entryArg === resolve(".");

await server.start(isMain);
