import { PACKAGE_NAME, PACKAGE_VERSION } from "src/config/env";
import type { FastifyRoutes } from "src/types";

export const baseRoutes: FastifyRoutes = async (app) => {
  app.get("/", async () => {
    return {
      data: "Hello 🌎!",
    };
  });
  app.get("/version", async () => {
    return {
      name: PACKAGE_NAME,
      version: PACKAGE_VERSION,
    };
  });
  app.get("/healthz", async () => {
    return { ok: 1 };
  });
};
