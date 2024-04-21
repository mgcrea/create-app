import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { baseRoutes, usersRoutes } from "./routes";

export const app = new Hono()
  .use(logger())
  .use(prettyJSON())
  .notFound((c) => c.json({ message: "Not Found", success: false }, 404))
  .route("/", baseRoutes)
  .route("/users", usersRoutes);
