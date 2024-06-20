import type { PinoLoggerOptions } from "fastify/types/logger";
import { IS_DEV, IS_TEST, LOG_LEVEL } from "./env";

// Logger
export const DEFAULT_LOGGER: PinoLoggerOptions =
  IS_DEV || IS_TEST
    ? {
        level: "debug",
        transport: {
          target: "@mgcrea/pino-pretty-compact",
          options: {
            colorize: true,
            translateTime: "SYS:HH:MM:ss.l",
            localTime: true,
            ignore: "pid,hostname",
          },
        },
      }
    : {
        level: LOG_LEVEL,
      };
