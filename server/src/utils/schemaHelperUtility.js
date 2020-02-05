/* eslint-disable no-prototype-builtins */

'use strict';

const parseQuery = require('./queryUtility').parseQuery;

const schemaTranslator = {
  getters: true,
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret.password;
    delete ret.__v;
    delete ret.deletedAt;
  }
};

const validateFilters = function (model, findQuery) {
  if (model.hasOwnProperty('metaData')) {
    const metaData = model.metaData();

    const validFilterFields = metaData.filterField;
    const nonFilterFields = metaData.nonFilterField;

    if (validFilterFields) {
      if (validFilterFields instanceof Array)
        for (const key in findQuery)
          if (validFilterFields.indexOf(key) === -1) delete findQuery[key];


    }
    else if (nonFilterFields) {
      if (nonFilterFields instanceof Array) {
        for (const key in findQuery)
          if (nonFilterFields.indexOf(key) !== -1) delete findQuery[key];
      }
      else if (nonFilterFields === '__all__') {
        for (const key in findQuery)
          delete findQuery[key];
      }
    }
  }
};

const processOrderBy = function (rawOrderBy) {
  if (rawOrderBy && typeof (rawOrderBy) === 'string' && rawOrderBy.trim()) {
    rawOrderBy = rawOrderBy.split(',');

    const orderBy = {};
    for (const field of rawOrderBy) {
      const data = field.split(':');
      orderBy[data[0].trim()] = data[1].trim();
    }
    return orderBy;
  }
  else { return { createdAt: -1 }; }
};

const processQuery = function (model, query) {
  const populate = query.populate && query.populate instanceof Array ? query.populate : null;
  const select = query.select || null;
  const page = Number(query.page) || 0;
  const orderBy = processOrderBy(query.orderBy || null);
  const pageSize = Number(query.pageSize) || process.env.PAGE_SIZE || 20;
  delete query.populate;
  delete query.select;
  delete query.page;
  delete query.orderBy;
  delete query.pageSize;

  let findQuery = {};
  findQuery = parseQuery(model, query);

  validateFilters(model, findQuery);

  query.populate = populate;
  query.page = page;
  query.findQuery = findQuery;
  query.orderBy = orderBy;
  query.pageSize = pageSize;
  query.select = select;

};

const getPaginatedList = async function (model, query) {
  processQuery(model, query);

  let dbQuery = model.find(query.findQuery).sort(query.orderBy).select(query.select).skip((query.pageSize * query.page)).limit(query.pageSize);

  if (query.populate) dbQuery = dbQuery.populate(...query.populate);

  const [result, totalCount] = await Promise.all([
    dbQuery,
    model.countDocuments(query.findQuery)
  ]);
  return {
    result,
    count: result.length,
    next: totalCount > (query.page * query.pageSize + result.length) ? query.page + 1 : null,
    totalCount,
    prev: (query.page >= 1) ? query.page - 1 : null
  };
};

const getByQuery = function (model, query) {
  processQuery(model, query);
  let dbQuery = model.find(query.findQuery).sort(query.orderBy).select(query.select);
  if (query.populate) dbQuery = dbQuery.populate(...query.populate);

  return dbQuery;
};

const addHelper = function (Schemaa) {
  Schemaa.index({ 'createdAt': -1 });
  Schemaa.index({ 'updatedAt': -1 });
  Schemaa.set('toObject', schemaTranslator);
  Schemaa.set('toString', schemaTranslator);
  Schemaa.set('toJSON', schemaTranslator);

  Schemaa.statics.getPaginatedList = function (options) {
    return getPaginatedList(this, options);
  };

  Schemaa.statics.getList = function (query) {
    query = query || {};
    return getByQuery(this, query);
  };

  Schemaa.statics.createObj = function (data) {
    const obj = new this(data);
    return obj.save();
  };

  Schemaa.statics.deleteObj = async function (_id) {
    _id = _id || null;
    let data = await this.deleteOne({ _id });
    data = Object.assign({}, data, { success: true });
    if (data.n === 0)
      data = undefined;
    return data;
  };

  Schemaa.statics.getObj = async function (_id) {
    _id = _id || null;
    const data = await getByQuery(this, { _id });
    return data[0];
  };

  Schemaa.statics.getObjByQuery = async function (query) {
    if (!query) return undefined;
    const data = await getByQuery(this, query);
    return data[0];
  };

  Schemaa.statics.updateObj = function (filterQuery, updateQuery, options = { runValidators: true, new: true }) {
    if (!updateQuery.$set && !updateQuery.$push && !updateQuery.$addToSet)
      updateQuery = { $set: updateQuery };
    filterQuery = filterQuery.findQuery ? filterQuery.findQuery : filterQuery;
    return this.findByIdAndUpdate(filterQuery, updateQuery, options);
  };

  Schemaa.statics.updateObjByQuery = function (filterQuery, updateQuery, options = { runValidators: true, new: true }) {
    if (!updateQuery.$set && !updateQuery.$push && !updateQuery.$addToSet)
      updateQuery = { $set: updateQuery };
    filterQuery = filterQuery.findQuery ? filterQuery.findQuery : filterQuery;
    return this.findOneAndUpdate(filterQuery, updateQuery, options);
  };

  Schemaa.statics.findOneOrCreate = function (filterQuery, updateQuery, options = { runValidators: true, new: true, upsert: true, setDefaultsOnInsert: true }) {
    if (!updateQuery.$set && !updateQuery.$push && !updateQuery.$addToSet)
      updateQuery = { $set: updateQuery };
    filterQuery = filterQuery.findQuery ? filterQuery.findQuery : filterQuery;
    return this.findOneAndUpdate(filterQuery, updateQuery, options);
  };

  Schemaa.statics.updateMultiple = function (filterQuery, updateQuery, options = {}) {
    if (!updateQuery.$set && !updateQuery.$push && !updateQuery.$addToSet)
      updateQuery = { $set: updateQuery };
    filterQuery = filterQuery.findQuery ? filterQuery.findQuery : filterQuery;
    return this.updateMany(filterQuery, updateQuery, options);
  };
};

module.exports = addHelper;
