import Fastify from 'fastify';
import { authRoutes } from './routes/auth';

const fastify = Fastify({ logger: true });

fastify.register(authRoutes, { prefix: '/api/auth' });

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
