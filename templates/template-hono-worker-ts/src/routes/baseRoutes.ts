import { Hono } from "hono";
import { Bindings } from "src/types";

export const baseRoutes = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.json({ data: "Hello 🌎!" });
  })
  .get("/env", (c) => {
    return c.json(c.env);
  })
  .get("/healthz", (c) => {
    return c.body(null, 200);
  });
