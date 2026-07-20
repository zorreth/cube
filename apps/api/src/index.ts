import Fastify from 'fastify';
import fastifyOauth2 from '@fastify/oauth2';
import { authRoutes } from './routes/auth';

const fastify = Fastify({ logger: true });

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
  callbackUri: process.env.DISCORD_CALLBACK_URL!,
});

fastify.register(authRoutes, { prefix: '/api/auth' });

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
