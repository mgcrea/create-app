import type { FastifyInstance } from "fastify";
import { createServer } from "src/server";
import { beforeAll, describe, expect, test } from "vitest";

describe("api", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const created = await createServer();
    app = created.app;
    await app.ready();
  });

  test("GET /", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/",
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchInlineSnapshot(`
      {
        "data": "Hello 🌎!",
        "name": "rgis-vision-backend",
        "version": "0.0.0",
      }
    `);
  });
});
