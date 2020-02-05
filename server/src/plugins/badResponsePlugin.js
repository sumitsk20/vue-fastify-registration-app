'use strict';

const fp = require('fastify-plugin');

function badResponse(fastify, opts, done) {
  fastify.decorate('badResponse', require('../utils').badResponse);
  done();
}
module.exports = fp(badResponse);
