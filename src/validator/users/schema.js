const joi = require('joi');

const UserPayloadSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = { UserPayloadSchema };
