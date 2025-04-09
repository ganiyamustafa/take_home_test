const joi = require('joi');

const UpdateUserPayloadSchema = joi.object({
  name: joi.string().required(),
});

module.exports = {
  UpdateUserPayloadSchema
};
