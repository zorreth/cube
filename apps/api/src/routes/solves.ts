import type { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { puzzlesTable, solvesTable } from '../db/schema';

export async function solvesRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: {
      puzzleId: number;
      time: number;
      scramble: string;
    };
  }>(
    '',
    {
      schema: {
        tags: ['solves'],
        body: {
          type: 'object',
          required: ['puzzleId', 'time', 'scramble'],
          properties: {
            puzzleId: { type: 'number' },
            time: { type: 'number' },
            scramble: { type: 'string' },
          },
        },
      },
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      const userId = req.user.sub;
      const { puzzleId, time, scramble } = req.body;

      const [puzzle] = await db.select().from(puzzlesTable).where(eq(puzzlesTable.id, puzzleId));

      if (!puzzle) {
        return reply.status(404).send({ error: 'This puzzle does not exist' });
      }

      const [solve] = await db
        .insert(solvesTable)
        .values({ userId, puzzleId, time, scramble })
        .returning();

      if (!solve) {
        return reply.status(500).send({ error: 'Failed to create solve' });
      }

      return reply.status(201).send(solve);
    },
  );

  fastify.get(
    '',
    { schema: { tags: ['solves'] }, onRequest: [fastify.authenticate] },
    async (req, _) => {
      return db.select().from(solvesTable).where(eq(solvesTable.userId, req.user.sub));
    },
  );
}
