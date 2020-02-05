'use strict';

const fp = require('fastify-plugin');

function errorResponse(fastify, opts, done) {
  fastify.decorate('errorResponse', require('../utils').errorResponse);
  done();
}
module.exports = fp(errorResponse);
