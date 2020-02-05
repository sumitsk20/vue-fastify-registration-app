'use strict';

module.exports = function (fastify, opts, done) {
  fastify.register(require('./authRoutes'), { prefix: '/auth' });
  fastify.register(require('./userRoutes'), { prefix: '/users' });
  done();
};
