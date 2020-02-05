'use strict';

const { serverUtility } = require('./utils');

const main = async () => {
  // initialize app
  const utilities = await serverUtility.initializeApp();

  // registered app routes
  utilities.fastify.register(require('./routes'), { prefix: 'api/v1' });

  await utilities.startServer();

};

main();
