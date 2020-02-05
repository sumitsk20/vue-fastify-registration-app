
'use strict';

const emailRegexChecker = function (value) {
  const emailRegex = /^[a-z][a-z|0-9|]*([_+.-][a-z|0-9]+)*?@[a-z][a-z|0-9|]*\.([a-z][a-z|0-9]*(\.[a-z][a-z|0-9]*)?)$/;
  return emailRegex.test(value);
};


// eslint-disable-next-line no-useless-escape
const regexValidator = function (expression = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})') {
  const strongRegex = new RegExp(expression);
  return (stringToMatch) => {
    return strongRegex.test(stringToMatch);
  };
};

/**
 * @description Perform a count query on passed model & return true if referenced id is valid.
 * @param mongooseModel: Pass mongoose model
 */
const refValidator = function (mongooseModel) {
  let res;
  return async function (_id) {
    if (_id)
      res = await mongooseModel.countDocuments({ _id });
    return res >= 1 || _id === null;
  };
};


module.exports = {
  emailRegexChecker,
  refValidator,
  regexValidator
};
