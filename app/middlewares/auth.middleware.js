const passport = require('passport')
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy
const ErrorHandler = require('../handlers/error.handler')
const { AuthenticationError, AuthorizationError } = require('../errors/errors')
const UsersAuthServiceClass = require('../services/usersauth.service')
const UsersAuthService = new UsersAuthServiceClass()
const HelperClass = require('../helpers/helper.class')
const Helper = new HelperClass()

class AuthMiddleware {
  constructor () {
    passport.use(new HeaderAPIKeyStrategy(
      { header: 'ApiKey', prefix: '' },
      false,
      async function (apiKey, done) {
        var userData = {
          apiKey
        }
        try {
          var data = await UsersAuthService.getApiKeyUser(userData)
          return done(null, data)
        } catch (error) {
          return done(error, null)
        }
      }
    ))
  }

  isAuthenticated (req, res, next) {
    if (!req.headers.apikey) {
      return new ErrorHandler(new AuthenticationError('Please provide correct Api Key.'), res)
    }
    if (!req.headers.username) {
      return new ErrorHandler(new AuthenticationError('Please provide correct User Name.'), res)
    }
    if (!req.headers.userpass) {
      return new ErrorHandler(new AuthenticationError('Please provide correct Password.'), res)
    }
    passport.authenticate('headerapikey', { session: false }, function (err, user, info) {
      if (err) {
        return new ErrorHandler(new AuthenticationError(err.message), res)
      }
      if (!user) {
        return new ErrorHandler(new AuthenticationError(), res)
      } else {
        const userpass = Helper.hash(req.headers.userpass)
        if (user.userName === req.headers.username && user.userPass === userpass) {
          user.userPass = ''
          return next()
        } else {
          return new ErrorHandler(new AuthenticationError('Invalid Api Key'), res)
        }
      }
    })(req, res, next)
  }

  isAuthorized (req, res, next) {
    var check = true
    console.log(req.url)
    if (check) {
      return next()
    } else {
      return new ErrorHandler(new AuthorizationError(), res)
    }
  }
}

module.exports = AuthMiddleware
