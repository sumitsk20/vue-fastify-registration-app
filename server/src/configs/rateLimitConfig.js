'use strict';

module.exports = {
  global: true, // default true
  max: 20, // default 1000
  timeWindow: 5000, // default 1000 * 60
  cache: 10000, // default 5000
  whitelist: ['localhost', '127.0.0.1'], // default []
  // redis: new Redis({ host: '127.0.0.1' }), // default null
  skipOnError: true, // default false
  // keyGenerator: function (req) { /* ... */ }, // default (req) => req.raw.ip
};
