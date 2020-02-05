'use strict';

const AuthController = require('../controllers').authController;
const auth = new AuthController();
const { loginSchema, logoutSchema } = require('../schemas/authSchemas');
const onRequestLoginValidations = [fastify.auth.optionalAuthenticate()];
const onRequestValidations = [fastify.auth.authenticate()];

module.exports = async function (fastify, opts, done) {

  fastify.post('/register', { onRequest: onRequestLoginValidations }, auth.register);

  fastify.post('/login', { onRequest: onRequestLoginValidations }, auth.login);

  fastify.post('/logout', logoutSchema, auth.logout);

  fastify.post('/forgot-password', auth.sendPasswordResetEmail);

  fastify.post('/reset-password', { onRequest: onRequestValidations }, auth.resetPassword);

  done();
};
