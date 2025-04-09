const ClientError = require('../../exceptions/ClientError');
const clientError = require('../../exceptions/requestError/requestClientError');
const serverError = require('../../exceptions/requestError/requestServerError');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationLoginHandler(request, h) {
    try {
      this._validator.validatePostAuthenticationPayload(request.payload);

      const { email, password } = request.payload;

      const userId = await this._usersService.verifyUserCredential(email, password);
      const accessToken = this._tokenManager.generateAccessToken({ userId });
      const refreshToken = this._tokenManager.generateRefreshToken({ userId });

      await this._authenticationsService.addRefreshToken(refreshToken);
      const response = h.response({
        status: 'success',
        message: 'Login Success',
        data: {
          accessToken,
          refreshToken,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, h);
      }
      return serverError(error, h);
    }
  }

  async postAuthenticationRegisterHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);

      const { email } = request.payload;

      await this._usersService.checkEmailIfExist(email);
      const uId = await this._usersService.addUser(request.payload);
      const accessToken = this._tokenManager.generateAccessToken({ userId });
      const refreshToken = this._tokenManager.generateRefreshToken({ userId });

      const response = h.response({
        status: 'success',
        message: 'Register Success',
        data: {
          userId: uId,
          accessToken, 
          refreshToken
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        return requestClientError(error, h);
      }

      return requestServerError(error, h);
    }
  }

  async putAuthenticationRefreshHandler(request, h) {
    try {
      this._validator.validatePutAuthenticationPayload(request.payload);
      const { refreshToken } = request.payload;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { userId } = this._tokenManager.verifyRefreshToken(refreshToken);
      const accessToken = this._tokenManager.generateAccessToken({ userId });

      return {
        status: 'success',
        message: 'Access Token Refreshed',
        data: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, h);
      }
      return serverError(error, h);
    }
  }

  async deleteAuthenticationLogoutHandler(request, h) {
    try {
      this._validator.validateDeleteAuthenticationPayload(request.payload);
      const { refreshToken } = request.payload;

      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      return {
        status: 'success',
        message: 'Logout Success',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, h);
      }
      return serverError(error, h);
    }
  }
}

module.exports = AuthenticationsHandler;
