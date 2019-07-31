const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config.json')
const loggerFunction = require('./logger')

// create express app
const app = express()

if (config.appConfig.compression) {
  // compress all response
  const compression = require('compression')
  app.use(compression())
}

// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

config.appConfig.apiContainers.forEach(elements => {
  if (elements.available) {
    if (config.appConfig.apiLoggingEnable) {
      var logger = loggerFunction(elements.apiPath)

      app.use(function (req, res, next) {
        var logString = 'Request ' + req.method + ' ' + req.url + ' || body ' + JSON.stringify(req.body) + ' || params ' + JSON.stringify(req.params) + ' || headers ' + JSON.stringify(req.headers)
        logger.info(logString)
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          logger.info('Response ' + res)
        }
        req.logger = logger
        res.logger = logger
        next()
      })
    }
    var routes = require(elements.routesPath) // importing route
    app.use(elements.apiUrlPath, routes)
  }
})

app.use(cors())

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Service is OK.' })
  res.end()
})

// app.all("*", function (error, req, res, next) {
//     console.log(req)
//     let err = new Error(`RouteError: Cannot ${req.method} ${req.originalUrl}, No HTTP resource was found that matches the request.`)
//     err.statusCode = 404
//     var logString = 'Status: ' + err.statusCode + ', Message: ' + err.message

//     if (res.logger) {
//         res.logger.error(logString)
//     }
//     else {
//         console.log(logString)
//     }
//     res.status(err.statusCode).json({ status: err.statusCode, message: err.message })
//     res.end()
// })

// listen for requests
app.listen(config.appConfig.port, () => {
  console.log('Server is listening on port ' + config.appConfig.port)
})
