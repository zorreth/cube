import type { OAuth2Namespace } from '@fastify/oauth2';
import type { PrismaClient } from './generated/prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    discordOauth2: OAuth2Namespace;
  }
}
