import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import { usersRoutes } from "./usersRoutes";

describe("usersRoutes", () => {
  const client = testClient(usersRoutes);

  test("GET / is ok", async () => {
    const res = await client.index.$get();
    expect(res.status).toBe(200);
    expect(await res.json()).toBeArray();
  });
  test("GET /:id is ok", async () => {
    const res = await client[":id"].$get({ param: { id: "1" } });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ result: "get 1" });
  });
  test("POST / is ok", async () => {
    const res = await client.index.$post({
      json: { name: "John Doe", email: "jdoe@gmail.com" },
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ id: expect.any(Number), name: "John Doe" });
  });
  test("POST / with bad data is nok", async () => {
    const res = await client.index.$post({ json: { name: "John Doe", email: "invalid-email" } });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ success: false, error: { name: "ZodError" } });
  });
});
