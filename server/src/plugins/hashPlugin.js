'use strict';

const fp = require('fastify-plugin');

function hashPlugin(fastify, opts, done) {
  fastify.decorate('hash', require('../utils').hashUtility);
  done();
}
module.exports = fp(hashPlugin);
