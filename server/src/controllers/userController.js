'use strict';

const BaseAppController = require('./baseAppController');

class UserController extends BaseAppController {
  constructor(model) {
    super(model);
  }
}

module.exports = UserController;
