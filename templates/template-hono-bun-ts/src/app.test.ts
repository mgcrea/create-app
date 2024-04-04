import { describe, expect, test } from "bun:test";
import { app } from "./app";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./config/env";

describe("app", () => {
  test("GET / is ok", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: "Hello 🌎!" });
  });
  test("GET /version is ok", async () => {
    const res = await app.request("/version");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ name: PACKAGE_NAME, version: PACKAGE_VERSION });
  });
  test("GET /healthz is ok", async () => {
    const res = await app.request("/healthz");
    expect(res.status).toBe(200);
    expect(await res.text()).toEqual("");
  });
});
