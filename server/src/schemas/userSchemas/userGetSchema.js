'use strict';

const { errorSchema } = require('../commonSchemas');

const userGetSchmea = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    fullName: { type: 'string' },
    shortName: { type: 'string' },
    email: { type: 'string' },
    phone: {
      type: ['number', 'null'],
      'minLength': 10,
      'maxLength': 10
    },
    dob: { type: 'string' },
    gender: { type: 'string' },
    photo: {
      type: 'object',
      properties: {
        mediaUrl: { type: 'string' },
        mediaType: { type: 'string' }
      }
    },
    countryCode: { type: 'number' },
    isEmailVerified: { type: 'boolean' },
    isPhoneVerified: { type: 'boolean' },
    isBlocked: { type: 'boolean' },
    isActive: { type: 'boolean' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

module.exports = {
  schema: {
    description: 'CRUD Api\'s for Users',
    tags: ['Users',],
    summary: 'Get User listing',

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
          data: userGetSchmea
        }
      },
    }
  }
};
