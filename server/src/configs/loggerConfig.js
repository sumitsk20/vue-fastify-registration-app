'use strict';

module.exports = {

  serializers: {
    req: function asReqValue(req) {
      return {
        method: req.method,
        url: req.url,
        version: req.headers['accept-version'],
        hostname: req.hostname,
        remoteAddress: req.ip,
        remotePort: req.connection.remotePort
      };
    },

    res: function asResValue(res) {
      return {
        statusCode: res.statusCode,
      };
    }
  },
};
