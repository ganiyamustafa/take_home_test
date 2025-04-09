const ClientError = require('../../exceptions/ClientError');
const clientError = require('../../exceptions/requestError/requestClientError');
const serverError = require('../../exceptions/requestError/requestServerError');

class UsersHandler {
  constructor(usersService, tokenManager, validator) {
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.updateUserHandler = this.updateUserHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getUserByIDHandler = this.getUserByIDHandler.bind(this);
    this.deleteUserHandler = this.deleteUserHandler.bind(this);
  }

  async getUsersHandler(req, res) {
    try {
      const users = await this._usersService.getUsers(req.query);

      return res.send({
        status: 'success',
        message: 'Success Get Users',
        data: users,
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }

  async getUserByIDHandler(req, res) {
    try {
      const { id } = req.params;

      const user = await this._usersService.getUserByID(id);

      return res.send({
        status: 'success',
        message: 'Success Get User',
        data: user,
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }

  async updateUserHandler(req, res) {
    try {
      this._validator.validateUpdateUserPayload(req.body);
      const { id } = req.params;

      const uId = await this._usersService.updateUser(id, req.body);

      return res.send({
        status: 'success',
        message: 'Update Success',
        data: {
          userId: uId,
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }

  async deleteUserHandler(req, res) {
    try {
      const { id } = req.params;

      const uID = await this._usersService.deleteUser(id);

      return res.send({
        status: 'success',
        message: 'Success Delete User',
        data: {
          uID
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }
}

module.exports = UsersHandler;
