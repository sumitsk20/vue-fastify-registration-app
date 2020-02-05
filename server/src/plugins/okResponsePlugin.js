'use strict';

const fp = require('fastify-plugin');

function okResponse(fastify, opts, done) {
  fastify.decorate('okResponse', require('../utils').okResponse);
  done();
}
module.exports = fp(okResponse);
