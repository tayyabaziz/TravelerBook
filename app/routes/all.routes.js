const express = require('express');
const app = express();

app.use(require('./hotels.route'));
app.use(require('./rooms.route'));
app.use(require('./facilities.route'));

module.exports = app