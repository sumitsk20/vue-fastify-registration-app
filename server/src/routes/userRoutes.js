'use strict';

const userModel = require('../models').userModel;
const UserController = require('../controllers').userController;
const user = new UserController(userModel);
// let { userGetSchema, userListSchema, userPostSchema, userPutSchema } = require('../schemas/userSchemas');

const onRequestUserValidations = [fastify.auth.authenticate()];


module.exports = function (fastify, opts, next) {

  fastify.get('/', { onRequest: onRequestUserValidations }, user.getList);

  fastify.post('/', { onRequest: onRequestUserValidations }, user.createObj);

  fastify.get('/:id', { onRequest: onRequestUserValidations }, user.getObj);

  fastify.put('/:id', { onRequest: onRequestUserValidations }, user.updateObj);

  fastify.delete('/:id', { onRequest: onRequestUserValidations }, user.deleteObj);

  next();
};
