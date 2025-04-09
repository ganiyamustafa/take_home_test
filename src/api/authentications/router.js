const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications/login',
    handler: handler.authenticationLoginHandler,
  },
  {
    method: 'POST',
    path: '/authentications/register',
    handler: handler.authenticationRegisterHandler,
  },
  {
    method: 'POST',
    path: '/authentications/refresh',
    handler: handler.authenticationRefreshHandler,
  },
  {
    method: 'POST',
    path: '/authentications/logout',
    handler: handler.authenticationLogoutHandler,
  },
];

module.exports = routes;
