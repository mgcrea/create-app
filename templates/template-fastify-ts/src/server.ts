import cors from "@fastify/cors";
import fastifyGracefulExit from "@mgcrea/fastify-graceful-exit";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import createFastify, { FastifyListenOptions, type FastifyServerOptions } from "fastify";
import { DEFAULT_LOGGER } from "src/config/log";
import * as routes from "./routes";

export type ServerOptions = FastifyServerOptions & Pick<FastifyListenOptions, "host" | "port">;

export const createServer = async (options: ServerOptions = {}) => {
  const logger = options.logger ?? DEFAULT_LOGGER;

  const app = createFastify({ logger, disableRequestLogging: true });

  // Middleware plugins
  await app.register(cors);
  await app.register(fastifyRequestLogger);
  await app.register(fastifyGracefulExit, { timeout: 3000 });

  // Application routes
  await app.register(routes.baseRoutes);

  return { app };
};
