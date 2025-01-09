import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './graphql';
import { authMiddleware } from './auth';
import cors from 'cors';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema,
  });

  // Start Apollo Server
  await apolloServer.start();

  app.use(
    '/api/graphql',
    cors<cors.CorsRequest>(),
    authMiddleware,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        user: req.user,
      }),
    }),
  );

  return httpServer;
}