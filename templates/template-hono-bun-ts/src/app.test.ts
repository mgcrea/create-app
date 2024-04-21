import { describe, expect, test } from "bun:test";
import { Hono } from "hono";
import { testClient } from "hono/testing";
import { app } from "./app";

describe("app", () => {
  const client = testClient(app);

  test("app is ok", () => {
    expect(app).toBeInstanceOf(Hono);
    expect(app.routes).toBeArray();
  });

  test("GET / is ok", async () => {
    const res = await client.index.$get();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: "Hello 🌎!" });
  });
});
