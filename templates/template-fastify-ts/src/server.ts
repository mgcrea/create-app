import cors from "@fastify/cors";
import fastifyGracefulExit from "@mgcrea/fastify-graceful-exit";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import createFastify, { FastifyListenOptions, type FastifyServerOptions } from "fastify";
import type { RequestListener } from "node:http";
import { DEFAULT_LOGGER, NODE_HOST, NODE_PORT, PACKAGE_NAME, PACKAGE_VERSION } from "./config";

export type ServerOptions = FastifyServerOptions & Pick<FastifyListenOptions, "host" | "port">;

export const createServer = async (options: ServerOptions = {}) => {
  const host = options.host ?? NODE_HOST;
  const port = options.port ?? NODE_PORT;
  const logger = options.logger ?? DEFAULT_LOGGER;

  const app = createFastify({ logger, disableRequestLogging: true });

  await app.register(cors);
  await app.register(fastifyRequestLogger);
  await app.register(fastifyGracefulExit, { timeout: 3000 });

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
      await app.listen({ host, port });
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
