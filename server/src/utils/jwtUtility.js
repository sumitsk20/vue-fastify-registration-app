'use strict';
module.exports = (fastify) => {

  // const fs = require('fs');
  const jwt = require('jsonwebtoken');
  const uuid4 = require('uuid4');
  const modelConstants = require('../constants').modelConstants;

  /*
   * use 'utf8' to get string instead of byte array  (1024 bit key)
   * var publicKey = fs.readFileSync(__dirname + '/keys/public.key', 'utf8');
   * const privateKey = fs.readFileSync(__dirname + '/private.key', 'utf8');
   */
  const publicKey = fastify.config.JWT_SECRET_KEY;
  const privateKey = fastify.config.JWT_SECRET_KEY;

  const options = {
    issuer: 'yourdomain.com',
    subject: 'yourdomainauth',
    audience: 'yourdomainusers',
    expiresIn: fastify.config.JWT_EXPIRY_TIME,
    algorithm: fastify.config.JWT_ALGORITHM
  };

  const decodeJWT = function (token) {
    return jwt.decode(token, publicKey, options);
  };

  const verifyJWT = function (token) {
    const responseData = jwt.verify(token, publicKey, options);
    // if (process.env.USE_JWT_REDIS);
    return responseData;
  };

  const generateJWT = function (payload, expiresIn) {
    const customOptions = { ...options };
    if (expiresIn) customOptions.expiresIn = expiresIn;
    return jwt.sign(payload, privateKey, customOptions);
  };

  const generatePayload = function (user, userType = (user.constructor.modelName === 'user') ? 2 : 1, tokenType = modelConstants.TOKEN_TYPE_AUTH) {
    const isAdmin = userType === 1 ? true : false;
    const payload = {
      userId: user.id,
      userModel: user.constructor.modelName,
      userType: userType,
      tokenType: tokenType,
      sessionId: uuid4(),
      email: user.email,
      phone: user.phone,
      role: user.role,
      isAdmin: isAdmin,
      fullName: user.fullName
    };
    return payload;
  };

  const requestVerify = function (opts, next) {
    if (typeof opts === 'function' && !next) {
      next = opts;
      opts = Object.assign({}, options);
    } // support no options

    if (!opts)
      opts = Object.assign({}, options);


    const request = this;

    if (next === undefined)
      return new Promise(function (resolve, reject) {
        request.jwtVerify(opts, function (err, val) {
          err ? reject(err) : resolve(val);
        });
      });

    let payload;
    if (request.headers && request.headers.authorization) {
      const authToken = request.headers.authorization;
      try {
        payload = verifyJWT(authToken);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError)
          throw new fastify.errorCodes['EXPIRED_TOKEN']();

        if (err instanceof jwt.JsonWebTokenError)
          throw new fastify.errorCodes['INVALID_TOKEN']();
      }
    } else {
      throw new fastify.errorCodes['MISSING_TOKEN']();
    }
    request.user = payload;
    next();
  };

  const replySign = function (payload, opts, next) {
    if (typeof opts === 'function' && !next) {
      next = opts;
      opts = Object.assign({}, options);
    } // support no options

    if (!opts)
      opts = Object.assign({}, options);


    const reply = this;

    if (next === undefined)
      return new Promise(function (resolve, reject) {
        reply.jwtSign(opts, function (err, val) {
          err ? reject(err) : resolve(val);
        });
      });

    if (!payload) throw new fastify.errorCodes['PAYLOAD_REQUIRED']();
    generateJWT(payload);
    next();
  };


  return {
    verify: verifyJWT,
    decode: decodeJWT,
    sign: generateJWT,
    generatePayload,
    requestVerify,
    replySign,
  };

};
