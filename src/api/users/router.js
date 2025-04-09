const express = require('express');
const AuthJwt = require('../../middlewares/AuthJwt');
const router = express.Router();

const routes = (handler) => {
    router.get("/", AuthJwt, handler.getUsersHandler)
    router.get("/:id", AuthJwt, handler.getUserByIDHandler)
    router.put('/:id', AuthJwt, handler.updateUserHandler)
    router.delete('/:id', AuthJwt, handler.deleteUserHandler)

    return router
  }

module.exports = routes;
