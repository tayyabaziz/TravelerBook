const ErrorHandler = require('../handlers/error.handler');
const { AuthenticationError, AuthorizationError } = require('../errors/errors');

class AuthMiddleware {
	constructor() {    }

	isAuthenticated(req, res, next) {
		var check = true;
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