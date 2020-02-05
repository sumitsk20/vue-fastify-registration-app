'use strict';

const FORMAT = require('string-format');
FORMAT.extend(String.prototype);
const uuidv4 = require('uuid4');
const AutoLoad = require('fastify-autoload');
const fastifyEnv = require('fastify-env');

const { swaggerOpts, loggerOpts, dotenvOpts, rateLimitOpts, corsOpts, helmetOpts, autoloadOpts, redisOpts } = require('../configs');
const initializeApp = async (options) => {
  options;
  const createRequestId = () => uuidv4();

  const fastify = require('fastify')({
    logger: loggerOpts,
    genReqId: createRequestId,
    ignoreTrailingSlash: true,
  });

  fastify
    .register(fastifyEnv, dotenvOpts)
    .register(require('fastify-blipp'))
    .register(require('fastify-redis'), redisOpts)
    .register(AutoLoad, autoloadOpts) // loading plugin directory here
    .register(require('fastify-cors'), corsOpts)
    .register(require('fastify-helmet'), helmetOpts)
    .register(require('fastify-rate-limit'), rateLimitOpts)
    .register(require('fastify-swagger'), swaggerOpts)
    .get('/health', require('../schemas/healthCheckSchema').healthCheckSchema, (request, reply) => {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'Server up & running' });
    });

  fastify.decorate('addSchemaHelper', require('./schemaHelperUtility'));
  fastify.decorate('validators', require('./schemaValidatorUtility'));

  global.fastify = fastify;
  global.fastify.modelConstants = require('../constants').modelConstants;
  global.fastify.appConstants = require('../constants').appConstants;
  global.fastify.emailConstants = require('../constants').emailConstants;

  const startServer = async () => {
    try {
      await fastify.ready();
      await fastify.listen({ port: fastify.config.PORT, host: fastify.config.SERVER_ADDRESS });
      fastify.swagger();
      if (fastify.config.NODE_ENV === 'localhost')
        fastify.blipp();
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  return { fastify, startServer };
};

module.exports = {
  initializeApp,
};
