const express = require('express');
const app = express();


const AuthMiddlewareClass = require('../middlewares/auth.middleware');
const AuthMiddleware = new AuthMiddlewareClass();

app.use(AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, require('./hotels.route'));
app.use(AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, require('./rooms.route'));
app.use(AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, require('./facilities.route'));

module.exports = app