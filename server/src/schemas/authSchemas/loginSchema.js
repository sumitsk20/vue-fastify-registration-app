'use strict';

const { errorSchema } = require('../commonSchemas');

const bodyJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['strategy', 'userType', 'credentials'],
  properties: {
    strategy: { type: 'string' },
    userType: { type: 'number' },
    credentials: { type: 'object' },
  }
};

const queryStringJsonSchema = {};

const paramsJsonSchema = {};

const headersJsonSchema = {};


const responseSchmea = {
  type: 'object', additionalProperties: true,
};

module.exports = {
  schema: {
    description: 'Login API',
    tags: ['Auth',],
    summary: 'Verify user credential and gives a valid app token ',

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
        additionalProperties: true,
        properties: {
          statusCode: { type: 'number' },
          data: responseSchmea,
          authToken: { type: 'string' }
        }
      },
    }
  }
};
