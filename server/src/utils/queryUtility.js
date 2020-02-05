'use strict';

const queryConstants = require('../constants').queryConstants;

function parseQuery(model, query) {

  let field, operator, fieldType, parent = {};
  const findQuery = {};

  /**
   * Get field type by parsing the model.
   *  P.S. - Try consoling model's object
   *
   * Some properties in object may not have any type.  -->  [Handled at #1]
   */
  function getFieldType(field) {
    let ref = model;
    let parent = ref;
    const fieldArray = field.split('.');
    const fieldsLen = fieldArray.length;
    for (let i = 0; i < fieldsLen; i++) {
      if (ref && Object.keys(ref.schema.paths).includes(fieldArray[i]) && ref.schema.paths[fieldArray[i]].instance === 'ObjectID' && fieldArray[i + 1])
        throw new fastify.errorCodes['NO_NESTED_REF_FILTER'](field);

      if (Object.keys(ref.schema.paths).includes(fieldArray[i])) {
        ref = ref.schema.paths[fieldArray[i]];
      } else if (Object.keys(ref.schema.paths).includes(`${fieldArray[i]}.${fieldArray[i + 1]}`)) {  // #1
        ref = ref.schema.paths[`${fieldArray[i]}.${fieldArray[i + 1]}`];
        i++;
      } else {
        ref = ref.schema.paths[field];
        break;
      }
    }

    try {
      parent = fieldArray[fieldsLen - 1].instance || null;
      return [ref.instance, parent];
    } catch (error) {
      throw new fastify.errorCodes['NO_SUCH_FIELD'](field);
    }
  }

  /** Check if operation is allowed on the field */
  function isValidOperation(operator, fieldType) {
    return queryConstants.ALLOWED_QUERY_OPERATIONS[fieldType].includes(operator)
      || (parent === 'Array' && queryConstants.ALLOWED_QUERY_OPERATIONS[parent].includes(operator));
  }

  for (const key in query) {

    [field, operator] = key.split('__');

    if (field === 'id') field = '_id';

    [fieldType, parent] = getFieldType(field);

    // Convert comma seperated values to array
    if (['all', 'in', 'nin', 'range'].includes(operator))
      query[key] = query[key].split(',');

    if (operator === undefined) {
      findQuery[field] = query[key];
    }
    else {
      operator = `$${operator}`;
      if (isValidOperation(operator, fieldType)) {
        // eslint-disable-next-line no-prototype-builtins
        if (!findQuery.hasOwnProperty(field))
          findQuery[field] = {};

        if (operator === '$contains')    // Handles substring matching
          findQuery[field] = { '$regex': query[key], '$options': 'i' };

        if (operator === '$range')    // Handles substring matching
          findQuery[field] = { '$gte': query[key][0], '$lte': query[key][1] };

        else
          findQuery[field][operator] = query[key];

      }
    }
    delete query[key];

  }
  return findQuery;
}

module.exports = {
  parseQuery
};
