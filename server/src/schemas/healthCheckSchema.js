'use strict';

exports.healthCheckSchema = {
  schema: {
    description: 'Get Health status of server',
    tags: ['Health Check',],
    summary: 'Get Health status of server',
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: { type: 'string' },
        }
      }
    }
  }
};
