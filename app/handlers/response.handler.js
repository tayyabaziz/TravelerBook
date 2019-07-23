class ResponseHandler {
    constructor(data, res) {
        res.status(data.status).json({status: data.status, message: data.message.get({plain: true })});
        return console.log({status: res.statusCode, message: data.message.get({plain: true })});
    }
}

module.exports = ResponseHandler;