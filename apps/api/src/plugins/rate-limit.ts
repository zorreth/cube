import fp from 'fastify-plugin';
import fastifyRateLimit from '@fastify/rate-limit';

export const rateLimitPlugin = fp(async (fastify) => {
  await fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  fastify.setNotFoundHandler({ preHandler: fastify.rateLimit() }, (_, reply) => {
    reply.status(404).send({
      error: 'Not Found',
    });
  });
});
