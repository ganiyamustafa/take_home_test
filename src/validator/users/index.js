const InvariantError = require('../../exceptions/InvariantError');

const { UserPayloadSchema } = require('./schema');

const UserValidator = {
  validateUserPayload: (payload) => {
    const userValidationResult = UserPayloadSchema.validate(payload);

    if (userValidationResult.error) {
      throw new InvariantError(userValidationResult.error.message);
    }
  },
};

module.exports = UserValidator;
