const express = require('express');
const router = express.Router();

const routes = (handler) => {
    router.post("/login", handler.authenticationLoginHandler)
    router.post("/register", handler.authenticationRegisterHandler)
    router.post("/refresh", handler.authenticationRefreshHandler)
    router.post("/logout", handler.authenticationLogoutHandler)

    return router
  }

module.exports = routes;
