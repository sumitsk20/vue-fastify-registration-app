'use strict';
module.exports = (...allowedUsers) => {
  return async function (request, reply) {
    if (!request.user || (Number(request.user.role) !== fastify.modelConstants.ADMIN_ROLE_SUPER && allowedUsers.indexOf(Number(request.user.userType)) === -1))
      throw new fastify.errorCodes['FORBIDDEN']();

  };
};
