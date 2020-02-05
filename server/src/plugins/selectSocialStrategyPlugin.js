'use strict';

const fp = require('fastify-plugin');

function socialStrategies(fastify, opts, done) {
  fastify.decorate('selectSocialStrategy', require('../helpers/strategies').selectSocialStrategy);
  done();
}
module.exports = fp(socialStrategies);
