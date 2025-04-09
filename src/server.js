require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const authenticationRoutes = require('./api/authentications');
const AuthenticationsService = require('./service/postgre/AuthenticationsService');
const UsersService = require('./service/postgre/UsersServuce');
const AuthenticationsValidator = require('./validator/authentications');
const TokenManager = require('./tokenize/TokenManager');

const init = async () => {
  const authenticationsService = new AuthenticationsService();
  const usersService = new UsersService();

  const app = express();
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  app.use(express.json());

  authenticationRoutes(app, {authenticationsService, usersService, tokenManager: TokenManager, authenticationsValidator: AuthenticationsValidator})

  app.listen(port, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
  });
};

init();
