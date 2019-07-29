const passport = require('passport');
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy
const ErrorHandler = require('../handlers/error.handler');
const { AuthenticationError, AuthorizationError } = require('../errors/errors');

const UsersAuthServiceClass = require('../services/usersauth.service');
const ResponseHandler = require('../handlers/response.handler');
const UsersAuthService = new UsersAuthServiceClass();


class AuthMiddleware {
    constructor() {
        passport.use(new HeaderAPIKeyStrategy(
            { header: 'Authorization', prefix: 'Api-Key ' },
            false,
            async function (apiKey, done) {
                console.log(apiKey);

                var userData = {
                    apiKey
                }
                try {
                    var data = await UsersAuthService.getApiKeyUser(userData);
                    return done(null, data);
                }
                catch (error) {
                    return done(error, null);
                }
            }
        ));
    }

    isAuthenticated(req, res, next) {
        var check = true;
        var authCheck = passport.authenticate('headerapikey', { session: false });
        console.log(authCheck);

        if (check)
            return next();
        else {
            return new ErrorHandler(new AuthenticationError(), res);
        }
    }

    isAuthorized(req, res, next) {
        var check = true;
        console.log(req.url);
        if (check)
            return next();
        else {
            return new ErrorHandler(new AuthorizationError(), res);
        }
    }
}

module.exports = AuthMiddleware;