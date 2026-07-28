import type { FastifyInstance } from 'fastify';
import { db } from '../db';
import { usersTable } from '../db/schema';

type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  email: string;
};

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/discord/callback', async function (req, reply) {
    const { token } = await this.discordOauth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const discordResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (!discordResponse.ok) {
      throw new Error('Failed to fetch Discord user data');
    }

    const discordUser = (await discordResponse.json()) as DiscordUser;

    await db
      .insert(usersTable)
      .values({
        discordId: discordUser.id,
        email: discordUser.email,
        username: discordUser.username,
        avatar: discordUser.avatar,
      })
      .onConflictDoUpdate({
        target: usersTable.discordId,
        set: {
          email: discordUser.email,
          username: discordUser.username,
          avatar: discordUser.avatar,
        },
      });

    return reply.redirect(process.env.BASE_URL!);
  });
}
