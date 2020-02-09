'use strict';

const MiscController = require('../controllers').miscController;
const miscObj = new MiscController();

module.exports = function (fastify, opts, next) {

  fastify.post('/validate-request', miscObj.validateRequest);

  next();
};
