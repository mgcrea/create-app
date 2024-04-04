import { describe, expect, test } from "bun:test";
import * as module from "src/index";

describe("module", () => {
  test("exports", () => {
    expect(Object.keys(module)).toEqual(["default"]);
  });
});
