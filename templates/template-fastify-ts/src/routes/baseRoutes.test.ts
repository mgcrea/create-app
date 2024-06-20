import type { FastifyInstance } from "fastify";
import { createServer } from "src/server";
import { beforeAll, describe, expect, test } from "vitest";

describe("baseRoutes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
    await app.ready();
  });

  test("Get root", async () => {
    const res = await app.inject({
      method: "GET",
      url: `/`,
    });
    expect(res.statusCode).toBe(200);
  });

  test("Get version", async () => {
    const res = await app.inject({
      method: "GET",
      url: `/version`,
    });
    expect(res.statusCode).toBe(200);
  });
});
