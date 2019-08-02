class ResourceNotFoundError extends Error {
  constructor (message) {
    super(message ? `${message} not Found` : 'Resource not found')
  }
}

class InvalidDataError extends Error {
  constructor (message) {
    super(message ? 'Invalid ' + message : 'Bad Request')
  }
}

class DatabaseError extends Error {
  constructor (message, name) {
    super(message)
    this.name = name
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthenticationError extends Error {
  constructor (message) {
    super(message ? 'Authentication Failed: ' + message : 'Authentication Failed')
  }
}

class AuthorizationError extends Error {
  constructor (message) {
    super(message ? 'Authorization Failed: ' + message : 'Authorization Failed')
  }
}

module.exports = {
  ResourceNotFoundError,
  InvalidDataError,
  DatabaseError,
  AuthenticationError,
  AuthorizationError
}
