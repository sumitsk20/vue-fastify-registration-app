'use strict';

const { AUTH_STRATEGY_GOOGLE } = fastify.modelConstants;

const GoogleApiStrategy = require('./googleStrategy');

function selectStrategy(strategy) {

  switch (strategy) {
    case AUTH_STRATEGY_GOOGLE:
      return GoogleApiStrategy;
    default:
      throw new fastify.errorCodes['INVALID_STRATEGY'](strategy);
  }
}
module.exports = selectStrategy;
