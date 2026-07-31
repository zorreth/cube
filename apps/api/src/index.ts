import Fastify from 'fastify';
import fastifyOauth2 from '@fastify/oauth2';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import { jwtPlugin } from './middleware/jwt';
import { authRoutes } from './routes/auth';
import { usersRoutes } from './routes/users';
import { puzzlesRoutes } from './routes/puzzles';

const fastify = Fastify({ logger: true });

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Cube API',
      description: 'Speedcubing timer, social platform and progress tracker',
      version: '0.1.0',
    },
    components: {
      securitySchemes: {
        jwtAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

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

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
  sign: {
    expiresIn: '1d',
  },
});

fastify.register(jwtPlugin);

fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(usersRoutes, { prefix: '/api/users' });
fastify.register(puzzlesRoutes, { prefix: '/api/puzzles' });

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
