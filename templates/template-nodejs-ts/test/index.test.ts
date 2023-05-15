import * as module from "src/index";
import { describe, expect, test } from "vitest";

describe("module", () => {
  test("exports", () => {
    expect(Object.keys(module)).toMatchInlineSnapshot(`
      [
        "server",
        "default",
      ]
    `);
  });
});
