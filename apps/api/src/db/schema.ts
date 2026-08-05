import { defineRelations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  discordId: varchar('discord_id').unique(),
  googleId: varchar('google_id').unique(),
  email: varchar().unique().notNull(),
  username: varchar().unique().notNull(),
  displayName: varchar('display_name'),
  avatar: varchar(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const puzzlesTable = pgTable('puzzles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  name: varchar().notNull(),
  color: varchar({ length: 7 }).notNull().default('#ffffff'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const solvesTable = pgTable('solves', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  puzzleId: integer('puzzle_id')
    .notNull()
    .references(() => puzzlesTable.id),
  time: integer().notNull(),
  scramble: varchar(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const relations = defineRelations({ usersTable, puzzlesTable }, (r) => ({
  puzzlesTable: {
    user: r.one.usersTable({
      from: r.puzzlesTable.userId,
      to: r.usersTable.id,
    }),
  },
}));
