'use strict';

const modelConstants = fastify.modelConstants;

const generatePasswordResetToken = function (userObj) {
  const payload = fastify.jwt.generatePayload(userObj, modelConstants.TOKEN_TYPE_VERIFY);
  const authToken = fastify.jwt.sign(payload, process.env.PASSWORD_RESET_TTL * 1000); // Expire token in 3 hours
  fastify.redis.set(`passwordreset:${userObj._id}`, true, 'EX', process.env.PASSWORD_RESET_TTL);
  return authToken;
};

module.exports = { generatePasswordResetToken };
