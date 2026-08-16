import Fastify from 'fastify';
import { swaggerPlugin, oauthPlugin, jwtPlugin, rateLimitPlugin } from './plugins';
import { authRoutes, usersRoutes, puzzlesRoutes, solvesRoutes } from './routes';

const fastify = Fastify({ logger: true });

fastify.register(swaggerPlugin);
fastify.register(oauthPlugin);
fastify.register(jwtPlugin);
fastify.register(rateLimitPlugin);

fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(usersRoutes, { prefix: '/api/users' });
fastify.register(puzzlesRoutes, { prefix: '/api/puzzles' });
fastify.register(solvesRoutes, { prefix: '/api/solves' });

fastify.listen({ host: '0.0.0.0', port: 8080 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
