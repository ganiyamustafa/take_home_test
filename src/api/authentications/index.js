const AuthenticationsHandler = require("./handler")
const routes = require("./router")

module.exports = (app, { 
  authenticationsService, usersService, tokenManager, authenticationsValidator
}) => {
  app.use("/api/v1/authentications", routes(new AuthenticationsHandler(
    authenticationsService, usersService, tokenManager, authenticationsValidator
  )))
}
