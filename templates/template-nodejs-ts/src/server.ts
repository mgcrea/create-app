import http, { type RequestListener } from "node:http";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./config";

export type ServerOptions = {
  port?: number;
};

export const createServer = async (options: ServerOptions = {}) => {
  const port = options.port ?? 3000;

  const handler: RequestListener = (req, res) => {
    console.log(`Incoming ${req.method} request on url="${req.url}"`);
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        name: PACKAGE_NAME,
        version: PACKAGE_VERSION,
        data: "Hello 🌎!",
      })
    );
  };

  const server = http.createServer(handler);

  const start = async (listen: boolean) => {
    try {
      if (!listen) {
        return server;
      }
      await new Promise((resolve, reject) => {
        server.listen(port).once("listening", resolve).once("error", reject);
      });
      console.log(`Server listening at http://127.0.0.1:${port}`);
      return server;
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  const stop = () => {
    server.close();
  };

  return { start, stop, handler };
};
