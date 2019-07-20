const Sequelize = require('sequelize');

const dbConfig = {
    host: 'localhost',
    database: 'traveler',
    user: 'root',
    password: ''
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
});

module.exports.Sequelize = Sequelize
module.exports.sequelize = sequelize