'use strict';

module.exports = () => {
  return async function (request, reply) {
    try {
      await request.jwtVerify();
      // eslint-disable-next-line no-empty
    } catch (error) { }
  };
};
