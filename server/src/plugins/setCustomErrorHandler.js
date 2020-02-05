'use strict';

const fp = require('fastify-plugin');

function errorHandler(fastify, opts, done) {
  fastify.setErrorHandler(function customErrorHandler(error, request, reply) {
    // handle schema validation error
    if (error.validation)
      error.name = 'ValidationError';


    if (error.isAxiosError) {
      const axiosError = error;
      if (typeof error.response.data.error == 'object') { error = axiosError.response.data.error; }
      else if (error.response.data.errors) { error = axiosError.response.data.errors[0]; }
      else {
        error.message = axiosError.response.data.error;
        if (axiosError.response.data.error_description)
          error.message = axiosError.response.data;

      }
      error.name = 'AxiosError';
      error.statusCode = axiosError.response.status;
    }

    const errorName = error.name;
    const statusCode = error.statusCode || 400;
    reply.log.error({ req: reply.request.raw, res: reply.res, err: error }, error && error.message);

    // handle mongo/mongoose error
    switch (errorName) {
      case 'ValidationError':
      case 'MongoError':
        return fastify.badResponse(request, reply, error);
    }

    // handle general error
    switch (statusCode) {
      case 400:
        return fastify.badResponse(request, reply, error);
      case 401:
      case 403:
      case 404:
      case 422:
      default:
        return fastify.errorResponse(request, reply, error);
    }
  });
  done();
}
module.exports = fp(errorHandler);
