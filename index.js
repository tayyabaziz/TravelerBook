const config = require('./config.json');
var logger = require('./logger');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

config.appConfig.apiContainers.forEach(elements => {
	if(elements.available == true) {
		logger = logger(elements.apiPath);
		if(config.appConfig.apiLoggingEnable) {
			app.use(function(req, res, next) {
				var logString = "Request " + req.method + ' ' + req.url + ' || body ' + JSON.stringify(req.body) + ' || params ' + JSON.stringify(req.params) + ' || headers ' + JSON.stringify(req.headers);
				console.log(logString);
				logger.info(logString);
				if(req.method == "POST" || req.method == "PUT" || req.method == "PATCH") {
					console.log("Response "+res);
					logger.info("Response "+res);
				}
				next();
			});
				
		}
		var routes = require(elements.routesPath); //importing route
		app.use(elements.apiUrlPath, routes);
	}
});

app.use(cors());

app.get('/', (req, res) => {
	res.json({"message": "Service is OK."});
});

// listen for requests
app.listen(config.appConfig.port, () => {
	console.log("Server is listening on port "+config.appConfig.port);
});