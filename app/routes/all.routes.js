const express = require('express');

const app = express();

app.use(require('./hotels.route.js'));
app.use(require('./rooms.route.js'));

module.exports = app