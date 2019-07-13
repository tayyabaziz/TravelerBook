var log4js = require('log4js');

var date = new Date();

var hour = date.getHours();
hour = (hour < 10 ? "0" : "") + hour;
var year = date.getFullYear();
var month = date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;
var day  = date.getDate();
day = (day < 10 ? "0" : "") + day;
var LogDateTime = year+"-"+month+"-"+day;

log4js.configure({
  appenders: { log: { type: 'file', filename: 'logs/log-'+LogDateTime+'.log' } },
  categories: { default: { appenders: ['log'], level: 'debug' } }
});

var logger = log4js.getLogger('log');

module.exports = logger