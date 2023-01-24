import cors from "@fastify/cors";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import createFastify, { type FastifyServerOptions } from "fastify";
import type { RequestListener } from "node:http";
import { DEFAULT_LOGGER, PACKAGE_NAME, PACKAGE_VERSION } from "./config";

export type ServerOptions = FastifyServerOptions & {
  port?: number;
};

export const createServer = async (options: ServerOptions = {}) => {
  const port = options.port ?? 3000;
  const logger = options.logger ?? DEFAULT_LOGGER;

  const app = createFastify({ logger, disableRequestLogging: true });

  await app.register(cors);
  app.register(fastifyRequestLogger);

  app.get("/", async () => {
    return {
      name: PACKAGE_NAME,
      version: PACKAGE_VERSION,
      data: "Hello 🌎!",
    };
  });

  const start = async (listen: boolean) => {
    try {
      if (!listen) {
        await app.ready();
        return;
      }
      await app.listen({ port });
      return app.server;
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  const stop = () => {
    app.close();
  };
  const handler: RequestListener = (request, reply) => {
    app.server.emit("request", request, reply);
  };

  return { app, start, stop, handler };
};
