import { serve } from "@hono/node-server";
import { fileURLToPath } from "node:url";
import { app } from "./app";
import { NODE_HOST, NODE_PORT } from "./config";

export { app };

const options = {
  port: NODE_PORT,
  host: NODE_HOST,
  fetch: app.fetch,
};

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  serve(options, ({ address, port }) => {
    console.log(`Server listening at http://${address}:${port}`);
  });
}
