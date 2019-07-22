const Sequelize = require('sequelize');
const config = require('../../config.json');

const dbConfig = config.dbConfig[config.environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: config.dbConfig.dbLoggingEnable //Console query logging
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err.message);
    process.exit();
});

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;