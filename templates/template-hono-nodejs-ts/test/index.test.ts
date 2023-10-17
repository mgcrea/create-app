import * as module from "src/index";
import { describe, expect, test } from "vitest";
import { app } from "../src";

describe("module", () => {
  test("exports", () => {
    expect(Object.keys(module)).toMatchInlineSnapshot(`
      [
        "app",
        "default",
      ]
    `);
  });
});

describe("app", () => {
  test("GET /", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });
});
