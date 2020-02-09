'use strict';

const BaseAppController = require('./baseAppController');

class MiscController extends BaseAppController {
  constructor(model) {
    super(model);
  }


  async validateRequest(request, reply) {
    await fastify.validateRequiredFields(request.body, ['ip', 'action']);

    await fastify.redis.incr(`IP:${request.body.ip}:${request.body.action}`);
    await fastify.redis.expire(`IP:${request.body.ip}:${request.body.action}`, 86400);

    const count = await fastify.redis.get(`IP:${request.body.ip}:${request.body.action}`);
    return fastify.okResponse(request, reply, { count });
  }
}

module.exports = MiscController;
