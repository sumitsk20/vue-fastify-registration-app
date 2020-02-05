'use strict';

const fp = require('fastify-plugin');

function requestValidators(fastify, opts, done) {
  const { validateRequiredFields } = require('../utils').requestValidators;
  fastify.decorate('validateRequiredFields', validateRequiredFields);
  done();
}
module.exports = fp(requestValidators);
