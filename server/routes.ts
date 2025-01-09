import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { apolloServer } from "./graphql";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);
  await apolloServer.start();

  // GraphQL endpoint
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const token = req.headers.authorization;
        const expectedToken = 'Bearer 54321-this-is-secret-token';

        if (!token || token !== expectedToken) {
          throw new Error('Unauthorized - Invalid or missing token');
        }

        return { auth: true };
      }
    })
  );

  const httpServer = createServer(app);

  return httpServer;
}