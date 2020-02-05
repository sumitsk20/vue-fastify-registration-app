'use strict';

const ERROR_TEMPLATES = {
  DUPLICATE_FIELDS_NAMED: 'Value for {field} already exists.',
  EMPTY_FIELD: '{field} can\'t be empty',
};

const USER_TYPE_ADMIN = 1;
const USER_TYPE_MEMBER = 2;
const USER_TYPE_ENUM = [USER_TYPE_ADMIN, USER_TYPE_MEMBER];

const ADMIN_ROLE_BASIC = 10;
const ADMIN_ROLE_SUPER = 19;
const ADMIN_ROLE_ENUM = [
  ADMIN_ROLE_BASIC,
  ADMIN_ROLE_SUPER
];
const ADMIN_ROLE_STR_MAPPER = {
  [ADMIN_ROLE_BASIC]: 'basic',
  [ADMIN_ROLE_SUPER]: 'super',
};

const AUTH_STRATEGY_FBKIT = 10;
const AUTH_STRATEGY_FACEBOOK = 20;
const AUTH_STRATEGY_GOOGLE = 30;
const AUTH_STRATEGY_INSTAGRAM = 40;
const AUTH_STRATEGY_TWITTER = 50;
const AUTH_STRATEGY_LINKEDIN = 60;
const AUTH_STRATEGY_LOCAL = 70;
const AUTH_STRATEGY_OTP = 80;
const AUTH_STRATEGY_ENUM = [
  AUTH_STRATEGY_LOCAL,
  AUTH_STRATEGY_OTP,
  AUTH_STRATEGY_FBKIT,
  AUTH_STRATEGY_FACEBOOK,
  AUTH_STRATEGY_GOOGLE,
  AUTH_STRATEGY_INSTAGRAM,
  AUTH_STRATEGY_TWITTER,
  AUTH_STRATEGY_LINKEDIN
];
const AUTH_STRATEGY_STR_MAPPER = {
  [AUTH_STRATEGY_LOCAL]: 'Local',
  [AUTH_STRATEGY_OTP]: 'OTP',
  [AUTH_STRATEGY_FACEBOOK]: 'Facebook',
  [AUTH_STRATEGY_GOOGLE]: 'Google',
  [AUTH_STRATEGY_INSTAGRAM]: 'Instagram',
  [AUTH_STRATEGY_TWITTER]: 'Twitter',
  [AUTH_STRATEGY_LINKEDIN]: 'LinkedIn'
};


const TOKEN_TYPE_AUTH = 'auth';
const TOKEN_TYPE_VERIFY = 'verify';

const AUTH_KEY_PATTERN = 'AUTH:{userType}:{userId}';
const VERIFICATION_KEY_PATTERN = 'VERIFY:{userType}:{userId}';

function RedisGetAuthKey(userType, userId) {
  return AUTH_KEY_PATTERN.format({ userType, userId });
}

function RedisGetVerificationKey(userType, userId) {
  return VERIFICATION_KEY_PATTERN.format({ userType, userId });
}


module.exports = {
  ERROR_TEMPLATES,

  USER_TYPE_ADMIN,
  USER_TYPE_MEMBER,
  USER_TYPE_ENUM,

  ADMIN_ROLE_BASIC,
  ADMIN_ROLE_SUPER,
  ADMIN_ROLE_ENUM,
  ADMIN_ROLE_STR_MAPPER,

  AUTH_STRATEGY_FBKIT,
  AUTH_STRATEGY_FACEBOOK,
  AUTH_STRATEGY_GOOGLE,
  AUTH_STRATEGY_INSTAGRAM,
  AUTH_STRATEGY_TWITTER,
  AUTH_STRATEGY_LINKEDIN,
  AUTH_STRATEGY_LOCAL,
  AUTH_STRATEGY_ENUM,
  AUTH_STRATEGY_STR_MAPPER,

  TOKEN_TYPE_AUTH,
  TOKEN_TYPE_VERIFY,
  RedisGetAuthKey,
  RedisGetVerificationKey,

};
