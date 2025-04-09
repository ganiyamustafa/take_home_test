const ClientError = require('../../exceptions/ClientError');
const clientError = require('../../exceptions/requestError/requestClientError');
const serverError = require('../../exceptions/requestError/requestServerError');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.authenticationLoginHandler = this.authenticationLoginHandler.bind(this);
    this.authenticationRegisterHandler = this.authenticationRegisterHandler.bind(this);
    this.authenticationRefreshHandler = this.authenticationRefreshHandler.bind(this);
    this.authenticationLogoutHandler = this.authenticationLogoutHandler.bind(this);
  }

  async authenticationLoginHandler(req, res) {
    try {
      this._validator.validatePostAuthenticationPayload(req.body);

      const { email, password } = req.body;

      const userId = await this._usersService.verifyUserCredential(email, password);
      const accessToken = this._tokenManager.generateAccessToken({ userId });
      const refreshToken = this._tokenManager.generateRefreshToken({ userId });

      await this._authenticationsService.addRefreshToken(refreshToken);
      return res.send({
        status: 'success',
        message: 'Login Success',
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }
      return serverError(error, res);
    }
  }

  async authenticationRegisterHandler(req, res) {
    try {
      this._validator.validatePostAuthenticationRegisterPayload(req.body);

      const { email } = req.body;

      await this._usersService.checkEmailIfExist(email);
      const uId = await this._usersService.addUser(req.body);
      const accessToken = this._tokenManager.generateAccessToken({ uId });
      const refreshToken = this._tokenManager.generateRefreshToken({ uId });

      return res.status(201).send({
        status: 'success',
        message: 'Register Success',
        data: {
          userId: uId,
          accessToken, 
          refreshToken
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }

  async authenticationRefreshHandler(req, res) {
    try {
      this._validator.validatePutAuthenticationPayload(req.body);
      const { refreshToken } = req.body;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { userId } = this._tokenManager.verifyRefreshToken(refreshToken);
      const accessToken = this._tokenManager.generateAccessToken({ userId });

      return res.send({
        status: 'success',
        message: 'Access Token Refreshed',
        data: {
          accessToken,
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }
      return serverError(error, res);
    }
  }

  async authenticationLogoutHandler(req, res) {
    try {
      this._validator.validateDeleteAuthenticationPayload(req.body);
      const { refreshToken } = req.body;

      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      return res.send({
        status: 'success',
        message: 'Logout Success',
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }
      return serverError(error, res);
    }
  }
}

module.exports = AuthenticationsHandler;
