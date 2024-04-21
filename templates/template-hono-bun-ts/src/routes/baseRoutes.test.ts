import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import { PACKAGE_NAME, PACKAGE_VERSION } from "src/config/env";
import { baseRoutes } from "./baseRoutes";

describe("baseRoutes", () => {
  const client = testClient(baseRoutes);

  test("GET / is ok", async () => {
    const res = await client.index.$get();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: "Hello 🌎!" });
  });
  test("GET /version is ok", async () => {
    const res = await client.version.$get();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ name: PACKAGE_NAME, version: PACKAGE_VERSION });
  });
  test("GET /healthz is ok", async () => {
    const res = await client.healthz.$get();
    expect(res.status).toBe(200);
    expect(await res.text()).toEqual("");
  });
});
