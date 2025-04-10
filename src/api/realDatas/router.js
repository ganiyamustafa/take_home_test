const express = require('express');
const AuthJwt = require('../../middlewares/AuthJwt');
const router = express.Router();

const routes = (handler) => {
    router.get("/name/:name", AuthJwt, handler.getDataByName)
    router.get("/nim/:nim", AuthJwt, handler.getDataByNIM)
    router.get("/ymd/:ymd", AuthJwt, handler.getDataByYMD)

    return router
  }

module.exports = routes;
