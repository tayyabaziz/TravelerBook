const mysql = require('mysql');
const mysqlModel = require('mysql-model');

const dbConfig = {
    host: 'localhost',
    database: 'musafir',
    user: 'root',
    password: ''
};

const MySQLConnetion = mysqlModel.createConnection({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database : dbConfig.database 
});


module.exports = MySQLConnetion