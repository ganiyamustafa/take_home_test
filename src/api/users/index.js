const UsersHandler = require('./handler')
const routes = require('./router')

module.exports = (app, { 
  usersService, tokenManager, usersValidator
}) => {
  app.use('/api/v1/users', routes(new UsersHandler(
    usersService, tokenManager, usersValidator
  )))
}
