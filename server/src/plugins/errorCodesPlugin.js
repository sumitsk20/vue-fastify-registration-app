'use strict';

const fp = require('fastify-plugin');

function errorCodes(fastify, opts, done) {
  fastify.decorate('errorCodes', require('../utils').errorCodes);
  done();
}

module.exports = fp(errorCodes);
