import type { FastifyInstance, FastifyReply } from 'fastify';
import { db } from '../db';
import { usersTable } from '../db/schema';

type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  email: string;
};

type GoogleUser = {
  id: string;
  name: string;
  picture: string;
  email: string;
};

async function saveUser(
  fastify: FastifyInstance,
  reply: FastifyReply,
  newUser: typeof usersTable.$inferInsert,
) {
  const [user] = await db
    .insert(usersTable)
    .values(newUser)
    .onConflictDoUpdate({
      target: usersTable.email,
      set: {
        discordId: newUser.discordId,
        googleId: newUser.googleId,
      },
    })
    .returning({ id: usersTable.id });

  if (!user) {
    throw new Error('Failed to create user');
  }

  const jwtToken = fastify.jwt.sign({
    sub: user.id,
  });

  return reply
    .setCookie('token', jwtToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
    .redirect(process.env.FRONTEND_URL!);
}

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/discord/callback', { schema: { tags: ['auth'] } }, async (req, reply) => {
    const { token } = await fastify.discordOauth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const discordResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (!discordResponse.ok) {
      throw new Error('Failed to fetch Discord user data');
    }

    const discordUser = (await discordResponse.json()) as DiscordUser;

    return saveUser(fastify, reply, {
      discordId: discordUser.id,
      username: discordUser.username,
      avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
      email: discordUser.email,
    });
  });

  fastify.get('/google/callback', { schema: { tags: ['auth'] } }, async (req, reply) => {
    const { token } = await fastify.googleOauth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (!googleResponse.ok) {
      throw new Error('Failed to fetch Google user data');
    }

    const googleUser = (await googleResponse.json()) as GoogleUser;

    return saveUser(fastify, reply, {
      googleId: googleUser.id,
      username: googleUser.name,
      avatar: googleUser.picture,
      email: googleUser.email,
    });
  });

  fastify.get('/logout', { schema: { tags: ['auth'] } }, async (_, reply) => {
    return reply.clearCookie('token', { path: '/' }).send({ success: true });
  });
}
