const TokenManager = require("../../tokenize/TokenManager")
const AuthenticationsValidator = require("../../validator/authentications")
const AuthenticationsHandler = require("./handler")
const routes = require("./router")

module.exports = (app, { 
  authenticationsService, usersService
}) => {
  app.use("/api/v1/authentications", routes(new AuthenticationsHandler(
    authenticationsService, usersService, TokenManager, AuthenticationsValidator
  )))
}
