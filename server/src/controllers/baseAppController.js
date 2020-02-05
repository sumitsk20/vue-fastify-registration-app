'use strict';

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */

const modelConstants = fastify.modelConstants;

class BaseAppController {
  /**
   * @param {Model} model The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   */
  constructor(model) {
    this._model = model;

    this.getList = this.getList.bind(this);
    this.createObj = this.createObj.bind(this);
    this.getObj = this.getObj.bind(this);
    this.updateObj = this.updateObj.bind(this);
    this.deleteObj = this.deleteObj.bind(this);
    this.getPaginatedList = this.getPaginatedList.bind(this);
  }

  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */

  async getList(request, reply) {
    try {
      const isAdmin = request.user.userType === modelConstants.USER_TYPE_ADMIN;
      if (!isAdmin) request.query.isActive = true;
      const data = await this._model.getList(request.query);
      fastify.okResponse(request, reply, data);
    } catch (err) {
      throw err;
    }
  }

  async createObj(request, reply) {
    try {
      const data = await this._model.createObj(request.body);
      fastify.okResponse(request, reply, data);
    } catch (err) {
      throw err;
    }
  }

  async getObj(request, reply) {
    try {
      const data = await this._model.getObj(request.params.id);
      if (!data) throw new fastify.errorCodes['NOT_FOUND'](this._model.modelName);
      fastify.okResponse(request, reply, data);
    } catch (err) {
      throw err;
    }
  }

  async updateObj(request, reply) {
    try {
      const data = await this._model.updateObj({ _id: request.params.id }, request.body);
      if (!data) throw new fastify.errorCodes['NOT_FOUND'](this._model.modelName);
      fastify.okResponse(request, reply, data);
    } catch (err) {
      throw err;
    }
  }

  async deleteObj(request, reply) {
    try {
      const data = await this._model.deleteObj(request.params.id);
      if (!data) throw new fastify.errorCodes['NOT_FOUND'](this._model.modelName);
      fastify.okResponse(request, reply, data);
    } catch (err) {
      throw err;
    }
  }

  async getPaginatedList(request, reply) {
    try {
      const isAdmin = request.user.userType === modelConstants.USER_TYPE_ADMIN;
      if (!isAdmin) request.query.isActive = true;
      const data = await this._model.getPaginatedList(request.query);
      fastify.okResponse(request, reply, data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseAppController;
