'use strict';

const modelConstants = fastify.modelConstants;
const https = require('https');
const qs = require('querystring');

const generatePasswordResetToken = function (userObj) {
  const payload = fastify.jwt.generatePayload(userObj, modelConstants.TOKEN_TYPE_VERIFY);
  const authToken = fastify.jwt.sign(payload, process.env.PASSWORD_RESET_TTL * 1000); // Expire token in 3 hours
  fastify.redis.set(`passwordreset:${userObj._id}`, true, 'EX', process.env.PASSWORD_RESET_TTL);
  return authToken;
};

const verifyRecapthca = function (params, postData) {
  const options = {
    hostname: 'www.google.com',
    port: 443,
    path: `/recaptcha/api/siteverify?${qs.encode(params)}`,
    method: 'POST',
    headers: {}
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, result => {

      const data = [];

      result.on('data', chunk => {
        data.push(chunk);
      });

      result.on('end', () => {
        const jsonResult = JSON.parse(Buffer.concat(data).toString());
        resolve(jsonResult);
      });

    });

    req.on('error', reject);

    if (postData)
      req.write(postData);

    req.end();
  });
};

module.exports = { generatePasswordResetToken, verifyRecapthca };
