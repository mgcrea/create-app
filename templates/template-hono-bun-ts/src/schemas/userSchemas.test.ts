import assert from "assert";
import { describe, expect, it } from "bun:test";
import { userSchema } from "./userSchemas";

describe("userSchema", () => {
  it("should validate correct data", () => {
    const result = userSchema.safeParse({
      email: "test@example.com",
      name: "John Doe",
      password: "123456",
    });
    expect(result.success).toBe(true);
    assert(result.success);
    expect(result.data).toEqual({
      email: "test@example.com",
      name: "John Doe",
      password: "123456",
    });
  });

  it("should fail validation with invalid email", () => {
    const result = userSchema.safeParse({
      email: "test",
      name: "John Doe",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("should handle null password as default", () => {
    const result = userSchema.safeParse({
      email: "test@example.com",
      name: "John Doe",
      password: null,
    });

    expect(result.success).toBe(true);
    assert(result.success);
    expect(result.data.password).toBeNull();
  });
});
