FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
COPY apps/api/package.json /temp/prod/apps/api/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY . .
WORKDIR /usr/src/app/apps/api

USER bun
EXPOSE 8080/tcp
ENTRYPOINT ["sh", "-c", "bun run migrate && bun run start"]
