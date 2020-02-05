'use strict';
const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const generateRandomString = function (length = 6) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const generateHash = function (password, salt) {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  return hash.digest('hex').toString();
};

const generateHmac256 = function (value, secret) {
  const hash = crypto.createHmac('sha256', secret); /** Hashing algorithm sha512 */
  hash.update(value);
  return hash.digest('hex').toString();
};

const compareHash = function (password, hashedPassword) {
  return (hashedPassword === generateHash(password, fastify.config.SECRET_SALT));
};

const hashPassword = function (password) {
  let hashPassword = password;
  hashPassword = generateHash(password, fastify.config.SECRET_SALT);
  return hashPassword;
};

module.exports = {
  generateRandomString,
  generateHash,
  generateHmac256,
  compareHash,
  hashPassword
};
