import { createExecutionContext, env, waitOnExecutionContext } from "cloudflare:test";
import { testClient } from "hono/testing";
import { describe, expect, test } from "vitest";
import { baseRoutes } from "./baseRoutes";

describe("baseRoutes", () => {
  const client = testClient(baseRoutes, env);

  test("GET / is ok", async () => {
    const res = await client.index.$get();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: "Hello 🌎!" });
  });
  test("GET /env is ok", async () => {
    const ctx = createExecutionContext();
    const res = await client.env.$get({ ctx });
    await waitOnExecutionContext(ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchInlineSnapshot(`
      {
        "IS_DEV": true,
        "IS_PROD": false,
      }
    `);
  });
  test("GET /healthz is ok", async () => {
    const res = await client.healthz.$get();
    expect(res.status).toBe(200);
    expect(await res.text()).toEqual("");
  });
});
