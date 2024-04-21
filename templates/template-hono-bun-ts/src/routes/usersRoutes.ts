import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { userSchema } from "src/schemas";

export const usersRoutes = new Hono()
  .get("/", (c) => c.json([{ id: 1, name: "John Doe" }]))
  .post("/", zValidator("json", userSchema), (c) => {
    const body = c.req.valid("json");
    return c.json({ id: 1, ...body }, 201);
  })
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));
