require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const authenticationRoutes = require('./api/authentications');
const userRoutes = require('./api/users')
const realDataRoutes = require('./api/realDatas')

const AuthenticationsService = require('./service/AuthenticationsService');
const UsersService = require('./service/UsersService');
const RealDatasService = require('./service/RealDatasService');

const AuthenticationsValidator = require('./validator/authentications');
const UsersValidator = require('./validator/users');
const TokenManager = require('./tokenize/TokenManager');

const init = async () => {
  const authenticationsService = new AuthenticationsService();
  const usersService = new UsersService();
  const realDatasService = new RealDatasService();

  const app = express();
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  app.use(express.json());

  authenticationRoutes(app, { authenticationsService, usersService, tokenManager: TokenManager, authenticationsValidator: AuthenticationsValidator })
  userRoutes(app, { usersService,tokenManager: TokenManager, usersValidator: UsersValidator })
  realDataRoutes(app, { realDatasService })

  app.listen(port, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
  });
};

init();
