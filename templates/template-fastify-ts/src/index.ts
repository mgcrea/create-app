import { NODE_HOST, NODE_PORT } from "./config/env";
import { createServer } from "./server";

const server = await createServer();

await server.app.listen({ host: NODE_HOST, port: NODE_PORT });
