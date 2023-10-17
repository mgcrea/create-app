import { describe, expect, test } from "bun:test";
import { app } from "../src";

describe("App", () => {
  test("GET /", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });
});
