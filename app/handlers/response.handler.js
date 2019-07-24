class ResponseHandler {
    constructor(data, res) {
        res.status(data.status).json({status: data.status, message: data.message});

        var logString = "Status: " + data.status + ', Message: ' + "Data Return Successfully";
        if(res.logger) {
            res.logger.info(logString);
        }
        else {
            console.log(logString);
        }
        return res.end();
    }
}

module.exports = ResponseHandler;