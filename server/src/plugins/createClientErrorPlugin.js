'use strict';

const fp = require('fastify-plugin');

function createClientError(fastify, opts, done) {
  fastify.decorate('createClientError', require('../utils').createClientError);
  done();
}

module.exports = fp(createClientError);
