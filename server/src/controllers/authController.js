'use strict';

const AuthService = require('../services').auth;
const { verifyRecapthca } = require('../helpers/auth/token');
class AuthController {
  constructor() {
  }

  async register(request, reply) {
    console.log(request.body);

    await fastify.validateRequiredFields(request.body, ['userData', 'userRequestData', 'strategy']);
    const requestCount = await fastify.redis.get(`IP:${request.body.userRequestData.userip}:signup`);
    if (requestCount > 3) {
      if (!request.body.userRequestData.captchaToken || request.body.userRequestData.captchaToken === '')
        throw new fastify.errorCodes['CAPTCHA_REQUIRED']();
      const capthcaResult = await verifyRecapthca({
        secret: fastify.config.CAPTCHA_SECRET_KEY,
        response: request.body.userRequestData.captchaToken,
        remoteip: request.body.userRequestData.userip
      });
      if (!capthcaResult.success)
        throw new fastify.errorCodes['CAPTCHA_FAILED']();
    }
    const auth = new AuthService();
    const usrObject = await auth.registerNewUser(request.body, request.user);

    /*
     * usrObject.lastLogin = +new Date();
     * usrObject.save();
     * const payload = fastify.jwt.generatePayload(usrObject);
     * const authToken = fastify.jwt.sign(payload);
     */

    // We can return user token if we don't want user to perform addidtional step
    fastify.okResponse(request, reply, usrObject);
  }

  async login(request, reply) {
    console.log(request.body);

    await fastify.validateRequiredFields(request.body, ['credentials', 'userRequestData', 'strategy']);
    const requestCount = await fastify.redis.get(`IP:${request.body.userRequestData.userip}:login`);
    if (requestCount > 3) {
      if (!request.body.userRequestData.captchaToken || request.body.userRequestData.captchaToken === '')
        throw new fastify.errorCodes['CAPTCHA_REQUIRED']();
      const capthcaResult = await verifyRecapthca({
        secret: fastify.config.CAPTCHA_SECRET_KEY,
        response: request.body.userRequestData.captchaToken,
        remoteip: request.body.userRequestData.userip
      });
      if (!capthcaResult.success)
        throw new fastify.errorCodes['CAPTCHA_FAILED']();
    }

    const auth = new AuthService(request.body.userType);
    const usrObject = await auth.connect(request.body, request.user);

    if (!usrObject.isActive) throw new fastify.errorCodes['INACTIVE_ACCOUNT']();
    if (usrObject.isBlocked) throw new fastify.errorCodes['BLOCKED_ACCOUNT']();

    usrObject.lastLogin = +new Date();
    usrObject.save();

    const payload = fastify.jwt.generatePayload(usrObject);

    // TODO: Add redis logic here
    const authToken = fastify.jwt.sign(payload);
    fastify.okResponse(request, reply, usrObject, { authToken });
  }

  async logout(request, reply) {
    const data = { success: true };
    fastify.okResponse(request, reply, data);
  }

  async sendPasswordResetEmail(request, reply) {
    await fastify.validateRequiredFields(request.body, ['userType', 'email']);
    try {
      const auth = new AuthService(request.body.userType);
      const data = await auth.sendPasswordResetEmail(request.body.email);
      fastify.okResponse(request, reply, data);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(request, reply) {
    await fastify.validateRequiredFields(request.body, ['userType', 'password']);
    try {
      const auth = new AuthService(request.body.userType);
      const data = await auth.resetPassword(request.user.userId, request.body.password);
      fastify.okResponse(request, reply, data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthController;
