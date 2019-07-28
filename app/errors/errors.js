class ResourceNotFoundError extends Error {
    constructor(message) {
        super(`${message} not Found`);
        this.data = { message };
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidDataError extends Error {
    constructor(message) {
        super(`Invalid ${message}`);
        this.data = { message };
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class DatabaseError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
        Error.captureStackTrace(this, this.constructor);
    }
}


class AuthenticationError extends Error {
    constructor() {
        super("Authentication Failed");
    }
}


class AuthorizationError extends Error {
    constructor() {
        super("Authorization Failed");
    }
}

module.exports = {
    ResourceNotFoundError,
    InvalidDataError,
    DatabaseError,
    AuthenticationError,
    AuthorizationError
};