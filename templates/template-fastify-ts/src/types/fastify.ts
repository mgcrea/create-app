import type { FastifyInstance } from "fastify";

export type FastifyRoutes = <T extends Record<string, unknown>>(
  fastify: FastifyInstance,
  options?: T,
) => Promise<void>;
