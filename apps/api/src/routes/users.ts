import type { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usersTable } from '../db/schema';

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/me',
    { schema: { tags: ['users'] }, onRequest: [fastify.authenticate] },
    async (req, reply) => {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.user.sub));

      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return user;
    },
  );

  fastify.get<{ Params: { username: string } }>(
    '/:username',
    { schema: { tags: ['users'] } },
    async (req, reply) => {
      const [user] = await db
        .select({
          id: usersTable.id,
          username: usersTable.username,
          displayName: usersTable.displayName,
          avatar: usersTable.avatar,
        })
        .from(usersTable)
        .where(eq(usersTable.username, req.params.username));

      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return user;
    },
  );
}
