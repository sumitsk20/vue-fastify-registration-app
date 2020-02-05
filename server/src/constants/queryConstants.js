'use strict';

const FIELD_TYPE_STRING = 'String';
const FIELD_TYPE_DATE = 'Date';
const FIELD_TYPE_NUMBER = 'Number';
const FIELD_TYPE_ARRAY = 'Array';
const FIELD_TYPE_BOOLEAN = 'Boolean';
const FIELD_TYPE_OBJECTID = 'ObjectID';

const ALLOWED_QUERY_OPERATIONS = {
  [FIELD_TYPE_STRING]: ['$exists', '$contains', '$in', '$all', '$nin'],
  [FIELD_TYPE_DATE]: ['$eq', '$gt', '$gte', '$lt', '$lte', '$ne', '$exists', '$range'],
  [FIELD_TYPE_NUMBER]: ['$eq', '$gt', '$gte', '$lt', '$lte', '$ne', '$exists', '$in', '$all', '$nin', '$range'],
  [FIELD_TYPE_ARRAY]: ['$in', '$all', '$nin', '$exists', '$size'],
  [FIELD_TYPE_BOOLEAN]: ['$exists', '$in', '$all', '$eq'],
  [FIELD_TYPE_OBJECTID]: ['$nin', '$in', '$all']
};

module.exports = {
  FIELD_TYPE_STRING,
  FIELD_TYPE_DATE,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_ARRAY,
  FIELD_TYPE_BOOLEAN,
  FIELD_TYPE_OBJECTID,
  ALLOWED_QUERY_OPERATIONS
};
