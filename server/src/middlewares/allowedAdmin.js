'use strict';
module.exports = (...allowedAdmin) => {
  return async function (request, reply) {
    if (!request.user || (Number(request.user.role) !== fastify.modelConstants.ADMIN_ROLE_SUPER && allowedAdmin.indexOf(Number(request.user.role)) === -1))
      throw new fastify.errorCodes['FORBIDDEN']();
  };
};
