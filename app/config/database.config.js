const Sequelize = require('sequelize')
const parseBool = require('parseboolean')
const config = require('../../config.json')

const dbConfig = config.dbConfig[config.environment]

const sequelize = new Sequelize(process.env.DB_NAME || dbConfig.database, process.env.DB_USER || dbConfig.username, process.env.DB_PASS || dbConfig.password, {
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  dialect: process.env.DB_DIALECT || dbConfig.dialect,
  logging: (parseBool(process.env.DB_LOGGING) || config.dbConfig.dbLoggingEnable) ? console.log : false // Console query logging
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err.message)
  process.exit()
})

module.exports.Sequelize = Sequelize
module.exports.sequelize = sequelize
