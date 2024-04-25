import { describe, expect, test } from "vitest";
import * as module from "./index";

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
