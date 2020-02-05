'use strict';


async function okResponse(request, reply, data, extra, ct) {
  const contentType = ct || 'application/json';
  let dataToSend = {};

  switch (ct) {
    case 'application/octet-stream':
      dataToSend = data;
      break;
    default:
      dataToSend = {
        statusCode: 200,
        data: data,
        ...extra
      };
  }

  return reply
    .code(200)
    .header('Content-Type', `${contentType}; charset=utf-8`)
    .send(dataToSend);
}

async function badRequestResponse(request, reply, error) {
  const message = error.message.error || error._message || error.message;

  if (!fastify.config.DEBUG) {
    delete error.stack;
    delete error.config;
  }
  return reply
    .code(400)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      statusCode: 400,
      error: error,
      message: message
    });
}

async function errorResponse(request, reply, error) {
  const message = error.message.error || error._message || error.message;
  const statusCode = error.statusCode || 500;

  if (!fastify.config.DEBUG) {
    delete error.stack;
    delete error.config;
  }

  return reply
    .code(statusCode)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      statusCode: statusCode,
      error: error,
      message: message
    });
}

module.exports = {
  okResponse, badRequestResponse, errorResponse
};
