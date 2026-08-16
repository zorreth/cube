import Fastify from 'fastify';
import { jwtPlugin } from './plugins/jwt';
import { swaggerPlugin } from './plugins/swagger';
import { oauthPlugin } from './plugins/oauth';
import { authRoutes, usersRoutes, puzzlesRoutes, solvesRoutes } from './routes';

const fastify = Fastify({ logger: true });

fastify.register(swaggerPlugin);
fastify.register(oauthPlugin);
fastify.register(jwtPlugin);

fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(usersRoutes, { prefix: '/api/users' });
fastify.register(puzzlesRoutes, { prefix: '/api/puzzles' });
fastify.register(solvesRoutes, { prefix: '/api/solves' });

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
