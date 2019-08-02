const { ResourceNotFoundError, InvalidDataError, DatabaseError, AuthenticationError, AuthorizationError } = require('../errors/errors')

class ErrorHandler {
  constructor (error, res) {
    if (error instanceof DatabaseError) {
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    } else if (error instanceof ResourceNotFoundError) {
      res.status(404).json({ status: 404, message: error.message })
    } else if (error instanceof InvalidDataError) {
      res.status(400).json({ status: 400, message: error.message })
    } else if (error instanceof AuthenticationError) {
      res.status(403).json({ status: 403, message: error.message })
    } else if (error instanceof AuthorizationError) {
      res.status(401).json({ status: 401, message: error.message })
    } else if (error instanceof Error) {
      res.status(error.statusCode).json({ status: error.statusCode, message: error.message })
    }

    var logString = 'Status: ' + res.statusCode + ', Message: ' + error.message
    if (res.logger) {
      res.logger.error(logString)
    } else {
      console.log(logString)
    }
    return res.end()
  }
}

module.exports = ErrorHandler
