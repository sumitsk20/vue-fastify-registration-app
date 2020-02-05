'use strict';

const errorSchema = {
  statusCode: { type: 'number' },
  error: {
    additionalProperties: false,
    type: 'object',
    properties: {
      name: { type: 'string' },
      code: { type: 'string' },
      message: { type: 'string' },
      statusCode: { type: 'number' },
    }
  },
  message: { type: 'string' },
};

module.exports = {
  errorSchema
};
