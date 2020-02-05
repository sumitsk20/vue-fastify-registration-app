'use strict';

const fp = require('fastify-plugin');

const { authenticate, allowedUsers, allowedAdmin, optionalAuthenticate } = require('../middlewares');
function authPlugin(fastify, opts, done) {
  fastify.decorate('auth', { authenticate, allowedUsers, allowedAdmin, optionalAuthenticate });
  done();
}
module.exports = fp(authPlugin);
