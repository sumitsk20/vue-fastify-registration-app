'use strict';

const schema = {
  type: 'object',
  required: ['PORT', 'DEBUG', 'SERVER_ADDRESS',
    'MONGOOSE_DEBUG',
    'SECRET_SALT', 'JWT_SECRET_KEY', 'JWT_EXPIRY_TIME', 'JWT_ALGORITHM',
  ],
  properties: {
    PORT: {
      type: 'string',
      default: process.env.PORT || 3000
    },
    NODE_ENV: {
      type: 'string',
      default: process.env.NODE_ENV || 'localhost'
    },
    DEBUG: {
      type: 'boolean',
      default: process.env.DEBUG || true
    },
    SERVER_ADDRESS: {
      type: 'string',
      default: process.env.SERVER_ADDRESS || '0.0.0.0'
    },
    JWT_SECRET_KEY: {
      type: 'string',
      default: process.env.JWT_SECRET_KEY || '@)wdq$@#7(&@%!'
    },
    JWT_EXPIRY_TIME: {
      type: 'string',
      default: process.env.JWT_EXPIRY_TIME || '30d'
    },
    JWT_ALGORITHM: {
      type: 'string',
      default: process.env.JWT_ALGORITHM || 'HS256'
    },
    MONGOOSE_DEBUG: {
      type: 'boolean',
      default: process.env.MONGOOSE_DEBUG || true
    },
    ALLOWED_HOSTS: {
      type: 'string',
      default: process.env.ALLOWED_HOSTS || '*'
    },
    ALLOWED_PORTS: {
      type: 'string',
      default: process.env.ALLOWED_PORTS
    },
    MONGO_DATABASE_NAME: {
      type: 'string',
      default: process.env.MONGO_DATABASE_NAME || 'test_db'
    },
    MONGO_URI: {
      type: 'string',
      default: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
    },
    SECRET_SALT: {
      type: 'string',
      default: process.env.SECRET_SALT || 'wsaqfoiwfnj@'
    },
    CAPTCHA_SITE_KEY: {
      type: 'string',
      default: '6LdyINcUAAAAAPQazVGspIR__nA5OGKQS6c0tOLQ'
    },
    CAPTCHA_SECRET_KEY: {
      type: 'string',
      default: '6LdyINcUAAAAAPrUBsLs4f-sGAXc9Am74DwbBPEK'
    }
  }
};

const options = {
  confKey: 'config', // optional, default: 'config'
  schema: schema,
  dotenv: {
    path: `${__dirname}/../../.env`,
    // debug: true
  }
};
module.exports = options;
