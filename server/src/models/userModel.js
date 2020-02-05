'use strict';

const Mongoose = fastify.db.mongoose;

const { baseSchema } = require('./baseModelSchema');
const validators = fastify.validators;
const modelConstants = fastify.modelConstants;

const userFileds = {
  fullName: { type: String, default: '' },
  gender: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    index: true,
    unique: true,
    max: 9999999999,
    min: 1000000000,
  },
  password: {
    type: String,
    set: fastify.hash.hashPassword,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: { // blocked by admin
    type: Boolean,
    default: false,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  }
};

const userSchema = new Mongoose.Schema(Object.assign({}, userFileds, baseSchema), { runSettersOnQuery: true, timestamps: true });

fastify.addSchemaHelper(userSchema);

userSchema.statics.getObjByPhone = async function (phone) {
  phone = phone || null;
  const data = await this.findOne({ phone });
  return data;
};

userSchema.statics.getObjByEmail = async function (email) {
  email = email || null;
  const data = await this.findOne({ email });
  return data;
};

userSchema.statics.checkUserByEmail = async function (email) {
  const count = await this.countDocuments({ email });
  return count > 0;
};

const UserModel = Mongoose.model('user', userSchema);

module.exports = UserModel;
