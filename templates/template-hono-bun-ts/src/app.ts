import { Hono } from "hono";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./config/env";

export const app = new Hono();

app.get("/", (c) => {
  return c.json({ data: "Hello 🌎!" });
});

app.get("/version", (c) => {
  return c.json({ name: PACKAGE_NAME, version: PACKAGE_VERSION });
});

app.get("/healthz", (c) => {
  c.status(200);
  return c.body(null);
});
