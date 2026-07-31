import type { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usersTable } from '../db/schema';

export function usersRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/me',
    { schema: { tags: ['users'] }, onRequest: [fastify.authenticate] },
    async (req, reply) => {
      const userId = req.user.sub;

      const [user] = await db
        .select({
          id: usersTable.id,
          discordId: usersTable.discordId,
          googleId: usersTable.googleId,
          email: usersTable.email,
          username: usersTable.username,
          avatar: usersTable.avatar,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      if (!user) {
        throw new Error('User not found');
      }

      return reply.send(user);
    },
  );
}
