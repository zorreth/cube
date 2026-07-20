import type { FastifyInstance } from 'fastify';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/discord/callback', async function (req, reply) {
    const { token } =
      await this.discordOauth2.getAccessTokenFromAuthorizationCodeFlow(req);
    console.log(token.access_token);
    reply.send({ access_token: token.access_token });
  });
}
