'use strict';

function validateRequiredFields(requestBody, requiredFields) {
  requiredFields.forEach(key => {
    if (Object.keys(requestBody).indexOf(key) === -1) throw new fastify.errorCodes['BAD_REQUEST_DATA'](`You need to pass ${key} in post body`);
  });
}

// Note pre update has query instance, use this._update <- doc in pre hook, and call next()

module.exports = {
  validateRequiredFields,
};
