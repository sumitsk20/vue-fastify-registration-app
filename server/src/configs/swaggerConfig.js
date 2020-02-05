'use strict';

module.exports = {
  routePrefix: '/api/v1/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Registration APP API',
      description: 'API doc for Registration APP',
      version: '0.0.1'
    },
    // host: 'localhost:4000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
};
