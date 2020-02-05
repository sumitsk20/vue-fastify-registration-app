'use strict';

const { userModel } = require('../models');
const generatePasswordResetToken = require('../helpers/auth/token').generatePasswordResetToken;

class AuthService {
  constructor() {
    this._model = userModel;
  }

  async getSocialData(strategy, credentials) {
    const SocialStrategy = fastify.selectSocialStrategy(strategy);
    const authStrategy = new SocialStrategy();
    return await authStrategy.getSocialData(credentials);
  }

  async registerNewUser(body, requestUser) {
    switch (body.strategy) {
      case 'email':
        return this.registerEmail(body.userData);
      default:
        throw new fastify.errorCodes['INVALID_STRATEGY'](body.strategy);
    }
  }

  async connect(body, requestUser) {
    switch (body.strategy) {
      case 'email':
        return this.loginEmail(body.credentials);
      default:
        throw new fastify.errorCodes['INVALID_STRATEGY'](body.strategy);
    }
  }

  async registerEmail(data) {
    await fastify.validateRequiredFields(data, ['fullName', 'email', 'password']);
    try {
      const isValidEmail = fastify.validators.emailRegexChecker(data.email);
      if (!isValidEmail)
        throw new fastify.errorCodes['INVALID_EMAIL'](data.email);

      const userAlredyExist = await this._model.checkUserByEmail(data.email);
      if (userAlredyExist)
        throw new fastify.errorCodes['EMAIL_ALREADY_EXIST']();

      return await this._model.createObj(data);
    } catch (error) {
      throw error;
    }
  }

  async loginEmail(credentials) {
    await fastify.validateRequiredFields(credentials, ['email', 'password']);
    const { email, password } = credentials;
    try {
      const userObj = await this._model.getObjByEmail(email);
      if (!userObj || !fastify.hash.compareHash(password, userObj.password))
        throw new fastify.errorCodes['INVALID_CREDS']();
      return userObj;
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      const userObj = await this._model.getObjByEmail(email);
      if (userObj) {
        const token = generatePasswordResetToken(userObj);
        /*
         *  TODO: We can send email using any email sender.
         * Currently passing token in response back untill we setup an email provider
         */
        return { 'success': true, 'message': `Password reset link has been sent to ${email}`, 'token': token };
      }
      else { throw new fastify.errorCodes['NOT_FOUND'](this._model.modelName); }
    }
    catch (error) {
      throw error;
    }
  }

  resetPassword(userId, password) {
    try {
      fastify.redis.exists(`passwordreset:${userId}`).then(async (exists) => {
        if (exists === 1) {
          const data = await this._model.updateObj(userId, { password: password });
          fastify.redis.del(`passwordreset:${userId}`);
          return data;
        }
        else { throw new fastify.errorCodes['EXPIRED_TOKEN'](); }
      });
    }
    catch (error) {
      throw error;
    }
  }

}

module.exports = AuthService;

