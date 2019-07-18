const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

var routes = require('./app/routes/all.routes'); //importing route

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes);
app.use(cors());

app.get('/', (req, res) => {
	res.json({"message": "Service is OK."});
});

// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});