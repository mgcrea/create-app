import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { baseRoutes, usersRoutes } from "./routes";
import { Bindings } from "./types";

export const app = new Hono<{ Bindings: Bindings }>()
  .use(prettyJSON())
  .notFound((c) => c.json({ message: "Not Found", success: false }, 404))
  .route("/", baseRoutes)
  .route("/users", usersRoutes);
