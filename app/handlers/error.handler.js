const {ResourceNotFoundError, InvalidDataError, DatabaseError} = require('../errors/errors');

class ErrorHandler {
    constructor(error, res) {
        if(error instanceof DatabaseError) {
            res.status(500).json({status: 500, message: "Internal Server Error"});
        } else if(error instanceof ResourceNotFoundError) {
            res.status(404).json({status: 404, message: error.message});
        } else if(error instanceof InvalidDataError) {
            res.status(400).json({status: 400, message: error.message});
        }
        
        var logString = "Status: " + res.statusCode + ', Message: ' + error.message;
        if(res.logger) {
            res.logger.error(logString);
        }
        else {
            console.log(logString);
        }
        return res.end();
    }
}

module.exports = ErrorHandler;