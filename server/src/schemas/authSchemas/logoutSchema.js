'use strict';

const { errorSchema } = require('../commonSchemas');

const bodyJsonSchema = {};

const queryStringJsonSchema = {};

const paramsJsonSchema = {};

const headersJsonSchema = {};


const responseSchmea = { type: 'object' };

module.exports = {
  schema: {
    description: 'Logout API',
    tags: ['Auth',],
    summary: 'Logout a valid authenticated user.',

    body: bodyJsonSchema,

    querystring: queryStringJsonSchema,

    params: paramsJsonSchema,

    headers: headersJsonSchema,

    response: {
      401: {
        description: 'Unauthorized Response',
        type: 'object',
        properties: errorSchema
      },
      404: {
        description: 'Resource not found.',
        type: 'object',
        properties: errorSchema
      },
      500: {
        description: 'Internal Server Error',
        type: 'object',
        properties: errorSchema
      },
      200: {
        description: 'Success response',
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          data: responseSchmea
        }
      },
    }
  }
};
