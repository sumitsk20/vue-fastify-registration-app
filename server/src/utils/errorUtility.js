'use strict';

const { inherits, format } = require('util');
const errorCodes = {};


createCustomError('NOT_FOUND', '\'%s\' resource not found.', 404);
createCustomError('INVALID_STRATEGY', '\'%s\' is invalid social provider.', 400);
createCustomError('BAD_REQUEST_DATA', '%s', 400);
createCustomError('INVALID_CREDS', 'One of your email or password is incorrect.', 401);
createCustomError('UNAUTHORIZED', 'You\'re not authorized to go beyond this point.', 401);
// createCustomError('DEVICE_ERROR', '%s', 400);

createCustomError('MISSING_TOKEN', 'You need to provide token in \'Authorization\' header.', 401);
createCustomError('INVALID_TOKEN', 'Token you\'re passing is invalid.', 401);
createCustomError('EXPIRED_TOKEN', 'Token you\'re passing is expired.', 401);
createCustomError('PAYLOAD_REQUIRED', 'JWT sign require a payload.', 400);
createCustomError('FORBIDDEN', 'You don\'t have enough permission to access this resource.', 403);

createCustomError('NO_SUCH_FIELD', '%s is not filterable', 400);
createCustomError('NO_NESTED_REF_FILTER', '%s is not filterable, because it\'s a reference field.', 400);
createCustomError('INVALID_EMAIL', '%s is not a valid email.', 400);
createCustomError('EMAIL_ALREADY_EXIST', 'User with similar data already exist.', 409);
createCustomError('CAPTCHA_FAILED', 'Capthca verification failed.', 400);
createCustomError('CAPTCHA_REQUIRED', 'Capthca is Required.', 400);


function createCustomError(code, message, statusCode = 400, error_data = {}, Base = Error) {
  if (!code) throw new Error('Backend error code must not be empty');
  if (!message) throw new Error('Backend error message must not be empty');

  code = code.toUpperCase();

  function ClientError(a, b, c) {
    Error.captureStackTrace(this, ClientError);
    this.name = 'BackendClientError';
    this.code = `ERR_${code}`;

    // more performant than spread (...) operator
    if (a && b && c)
      this.message = format(message, a, b, c);
    else if (a && b)
      this.message = format(message, a, b);
    else if (a)
      this.message = format(message, a);
    else
      this.message = message;


    this.message = `${this.message}`;
    this.statusCode = statusCode || undefined;
    this.error_data = error_data;
  }
  ClientError.prototype[Symbol.toStringTag] = 'Error';

  inherits(ClientError, Base);

  errorCodes[code] = ClientError;

  return errorCodes[code];
}

module.exports = { errorCodes, createCustomError };
