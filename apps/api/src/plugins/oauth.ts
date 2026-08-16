import fp from 'fastify-plugin';
import fastifyOauth2, { type OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    discordOauth2: OAuth2Namespace;
    googleOauth2: OAuth2Namespace;
  }
}

export const oauthPlugin = fp((fastify) => {
  fastify.register(fastifyOauth2, {
    name: 'discordOauth2',
    credentials: {
      client: {
        id: process.env.DISCORD_CLIENT_ID!,
        secret: process.env.DISCORD_CLIENT_SECRET!,
      },
      auth: fastifyOauth2.DISCORD_CONFIGURATION,
    },
    scope: ['identify', 'email'],
    startRedirectPath: '/api/auth/discord',
    callbackUri: process.env.BACKEND_URL! + '/api/auth/discord/callback',
    tags: ['auth'],
  });

  fastify.register(fastifyOauth2, {
    name: 'googleOauth2',
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    scope: ['profile', 'email'],
    startRedirectPath: '/api/auth/google',
    callbackUri: process.env.BACKEND_URL! + '/api/auth/google/callback',
    tags: ['auth'],
  });
});
