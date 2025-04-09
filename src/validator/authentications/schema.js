const joi = require('joi');

const PostAuthenticationsPayloadSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const PostAuthenticationRegistersPayloadSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const PutAuthenticationsPayloadSchema = joi.object({
  refreshToken: joi.string().required(),
});

const DeleteAuthenticationsPayloadSchema = joi.object({
  refreshToken: joi.string().required(),
});

module.exports = {
  PostAuthenticationsPayloadSchema,
  PostAuthenticationRegistersPayloadSchema,
  PutAuthenticationsPayloadSchema,
  DeleteAuthenticationsPayloadSchema,
};
