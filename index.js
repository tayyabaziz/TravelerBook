const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const config = require('./config.json')
const loggerFunction = require('./logger')
const parseBool = require('parseboolean')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express() // create express app

if (parseBool(process.env.COMPRESSION_ENABLE) || config.appConfig.compression) {
  app.use(compression()) // compress all response
}

app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(cors())

if (parseBool(process.env.LOGGING_ENABLE) || config.appConfig.apiLoggingEnable) {
  var logger = loggerFunction('app') // file and console logging enabled

  app.use(function (req, res, next) {
    var logString = 'Request ' + req.method + ' ' + req.url + ' || body ' + JSON.stringify(req.body) + ' || params ' + JSON.stringify(req.params) + ' || headers ' + JSON.stringify(req.headers)
    logger.info(logString)
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      logger.info('Response ' + res)
    }
    req.logger = logger
    res.logger = logger
    next()
  }) // logging middleware
}
var routes = require('./app/routes/all.routes') // importing route
app.use('/api', routes)

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Service is OK.' })
  res.end()
})

app.all('*', function (req, res) {
  console.log(req)
  const err = new Error(`RouteError: Cannot ${req.method} ${req.originalUrl}, No HTTP resource was found that matches the request.`)
  err.statusCode = 404
  var logString = 'Status: ' + err.statusCode + ', Message: ' + err.message

  if (res.logger) {
    res.logger.error(logString)
  } else {
    console.log(logString)
  }
  res.status(err.statusCode).json({ status: err.statusCode, message: err.message })
  res.end()
})

// listen for requests
app.listen(process.env.PORT || config.appConfig.port, () => {
  console.log('Server is listening on port ' + process.env.PORT || config.appConfig.port)
})
