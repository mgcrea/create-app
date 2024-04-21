import { Hono } from "hono";
import { PACKAGE_NAME, PACKAGE_VERSION } from "src/config/env";

export const baseRoutes = new Hono()
  .get("/", (c) => {
    return c.json({ data: "Hello 🌎!" });
  })
  .get("/version", (c) => {
    return c.json({ name: PACKAGE_NAME, version: PACKAGE_VERSION });
  })
  .get("/healthz", (c) => {
    c.status(200);
    return c.body(null);
  });
