class ResponseHandler {
  constructor (data, requestMethod, res) {
    var statusCode = requestMethod === 'POST' ? 201 : 200
    res.status(statusCode).json({ status: statusCode, message: data })

    var logString = `Status: ${statusCode}, Message: Data Return Successfully`
    if (res.logger) {
      res.logger.info(logString)
    } else {
      console.log(logString)
    }
    return res.end()
  }
}

module.exports = ResponseHandler
