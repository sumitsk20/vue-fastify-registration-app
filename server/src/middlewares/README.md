# Middlewares

**This directory will contain middlewares to be used for this project.**

Fastify middlewares don't support the full syntax middleware(err, req, res, next), because error handling is done inside Fastify. Furthermore methods added by Express and Restify to the enhanced versions of req and res are not supported in Fastify middlewares.

[Read more](https://github.com/fastify/fastify/blob/master/docs/Middlewares.md) about Middlewares.

