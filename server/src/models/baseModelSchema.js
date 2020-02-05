'use strict';
/*
 *Summary: keep base schema objects that is common between Schemas.
 */
const Mongoose = fastify.db.mongoose;
const modelConstants = fastify.modelConstants;

const baseSchema = {
  createdBy: {
    type: Mongoose.Schema.Types.ObjectId,
    index: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
};

const docSchema = {
  _id: false,
  displayOrder: {
    type: Number,
    default: 1
  },
  mediaUrl: {
    type: String,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Media URL' })]
  },
  mediaType: {
    type: String,
    required: [true, modelConstants.ERROR_TEMPLATES.EMPTY_FIELD.format({ field: 'Media Type' })]
  }
};


module.exports = {
  baseSchema,
  docSchema
};
