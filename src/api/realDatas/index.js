const RealDatasHandler = require('./handler')
const routes = require('./router')

module.exports = (app, { 
  realDatasService
}) => {
  app.use('/api/v1/real-datas', routes(new RealDatasHandler(
    realDatasService
  )))
}
