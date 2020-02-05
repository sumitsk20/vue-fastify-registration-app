'use strict';

module.exports = {
  authenticate: require('./authenticate'),
  optionalAuthenticate: require('./loginAuthenticate'),
  allowedUsers: require('./allowedUsers'),
  allowedAdmin: require('./allowedAdmin'),
};
