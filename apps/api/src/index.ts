import Fastify from 'fastify';
import { authRoutes } from './routes/auth';
import fastifyOauth2 from '@fastify/oauth2';

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
  startRedirectPath: '/login/discord',
  callbackUri: process.env.DISCORD_CALLBACK_URL!,
});

fastify.register(authRoutes);

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
