const config = require('./config.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

config.appConfig.forEach(elements => {
	if(elements.available == true) {
		var routes = require('./'+elements.apiPath+'/routes/all.routes'); //importing route
		if(elements.versionNo == "default") {
			app.use('/api', routes);
		}
		else {
			app.use('/api/'+elements.versionNo, routes);
		}
	}
});

app.use(cors());

app.get('/', (req, res) => {
	res.json({"message": "Service is OK."});
});

// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});