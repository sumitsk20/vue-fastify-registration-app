'use strict';

const fp = require('fastify-plugin');
const { sign, verify, decode, generatePayload, replySign, requestVerify } = require('../utils').jwtUtility(fastify);
function jwtPlugin(fastify, opts, done) {
  fastify.decorate('jwt', { sign: sign, verify: verify, decode: decode, generatePayload });
  fastify.decorateRequest('jwtVerify', requestVerify);
  fastify.decorateReply('jwtSign', replySign);
  done();
}
module.exports = fp(jwtPlugin);
