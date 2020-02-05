'use strict';

module.exports = () => {
  return async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw err;
    }
  };
};
