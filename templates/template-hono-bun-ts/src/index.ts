import "src/utils/debug";
import { app } from "./app";
import { NODE_HOST, NODE_PORT } from "./config/env";

export default {
  port: NODE_PORT,
  host: NODE_HOST,
  fetch: app.fetch,
};
