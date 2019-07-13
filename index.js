const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');  

const MySQLConnetion = require('./config/database.config.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./models/all.model.js')(app, MySQLConnetion);

app.get('/', (req, res) => {
	res.json({"message": "Service is OK."});
});


// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});