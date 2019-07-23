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


class ErrorHandler {
    constructor(error, res) {
        console.log(error.message);
        if(error instanceof DatabaseError) {
            return res.status(500).json({message: error.message});
        } else if(error instanceof ResourceNotFoundError) {
            return res.status(404).json({message: error.message});
        } else if(error instanceof ResourceNotFoundError) {
            return res.status(400).json({message: error.message});
        }
    }
}

module.exports = {
    ResourceNotFoundError,
    InvalidDataError,
    DatabaseError,
    ErrorHandler
};