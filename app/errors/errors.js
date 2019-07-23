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

module.exports = {
    ResourceNotFoundError,
    InvalidDataError,
    DatabaseError    
};