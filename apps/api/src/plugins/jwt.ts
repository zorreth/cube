import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { sub: number };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export const jwtPlugin = fp((fastify) => {
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

  fastify.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
  });
});
