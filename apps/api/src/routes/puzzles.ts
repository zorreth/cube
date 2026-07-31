import type { FastifyInstance } from 'fastify';
import { db } from '../db';
import { puzzlesTable } from '../db/schema';
import { and, eq } from 'drizzle-orm';

const bodySchema = {
  type: 'object',
  required: ['name', 'color'],
  properties: {
    name: { type: 'string' },
    color: { type: 'string' },
  },
};

const paramsSchema = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'integer' } },
};

export async function puzzlesRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { name: string; color: string } }>(
    '',
    {
      schema: { tags: ['puzzles'], body: bodySchema },
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      const userId = req.user.sub;
      const { name, color } = req.body;

      const [puzzle] = await db.insert(puzzlesTable).values({ userId, name, color }).returning();

      if (!puzzle) {
        return reply.status(500).send({ error: 'Failed to create puzzle' });
      }

      return reply.status(201).send(puzzle);
    },
  );

  fastify.get(
    '',
    { schema: { tags: ['puzzles'] }, onRequest: [fastify.authenticate] },
    async (req) => {
      return db.select().from(puzzlesTable).where(eq(puzzlesTable.userId, req.user.sub));
    },
  );

  fastify.get<{ Params: { id: number } }>(
    '/:id',
    {
      schema: { tags: ['puzzles'], params: paramsSchema },
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      const [puzzle] = await db
        .select()
        .from(puzzlesTable)
        .where(and(eq(puzzlesTable.id, req.params.id), eq(puzzlesTable.userId, req.user.sub)));

      if (!puzzle) {
        return reply.status(404).send({ error: 'Not found' });
      }

      return puzzle;
    },
  );

  fastify.put<{ Params: { id: number }; Body: { name: string; color: string } }>(
    '/:id',
    {
      schema: { tags: ['puzzles'], params: paramsSchema, body: bodySchema },
      onRequest: [fastify.authenticate],
    },
    async (req, reply) => {
      const [updatedPuzzle] = await db
        .update(puzzlesTable)
        .set(req.body)
        .where(and(eq(puzzlesTable.id, req.params.id), eq(puzzlesTable.userId, req.user.sub)))
        .returning();

      if (!updatedPuzzle) {
        return reply.status(404).send({ error: 'Not found' });
      }

      return updatedPuzzle;
    },
  );

  fastify.delete<{ Params: { id: number } }>(
    '/:id',
    { schema: { tags: ['puzzles'], params: paramsSchema }, onRequest: [fastify.authenticate] },
    async (req, reply) => {
      const [deletedPuzzle] = await db
        .delete(puzzlesTable)
        .where(and(eq(puzzlesTable.id, req.params.id), eq(puzzlesTable.userId, req.user.sub)))
        .returning({ id: puzzlesTable.id });

      if (!deletedPuzzle) {
        return reply.status(404).send({ error: 'Not found' });
      }

      return reply.status(204).send();
    },
  );
}
