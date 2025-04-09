const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications/login',
    handler: handler.postAuthenticationLoginHandler,
  },
  {
    method: 'POST',
    path: '/authentications/register',
    handler: handler.postAuthenticationRegisterHandler,
  },
  {
    method: 'PUT',
    path: '/authentications/refresh',
    handler: handler.putAuthenticationRefreshHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications/logout',
    handler: handler.deleteAuthenticationLogoutHandler,
  },
];

module.exports = routes;
