import { app } from "./app";
import { NODE_HOST, NODE_PORT } from "./config";

export { app };

export default {
  port: NODE_PORT,
  host: NODE_HOST,
  fetch: app.fetch,
};
