import { fileURLToPath } from "node:url";
import { createServer } from "./server";

export const server = await createServer();

export default server.handler;

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
await server.start(isMain);
