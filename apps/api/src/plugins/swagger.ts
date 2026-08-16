import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const swaggerPlugin = fp((fastify) => {
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Cube API',
        description: 'Speedcubing timer, social platform and progress tracker',
        version: '0.1.0',
      },
      components: {
        securitySchemes: {
          jwtAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'token',
          },
        },
      },
    },
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
});
