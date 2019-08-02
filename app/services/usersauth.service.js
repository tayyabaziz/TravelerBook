const { UsersAuthKeyModel, UserModel } = require('../models/all.models')
const { InvalidDataError, DatabaseError } = require('../errors/errors')
const SequelizeConnection = require('../config/database.config')
const Sequelize = SequelizeConnection.Sequelize
const sequelize = SequelizeConnection.sequelize

class UsersAuthService {
  constructor () {
    this.User = new UserModel(Sequelize, sequelize)
    this.UsersAuthKey = new UsersAuthKeyModel(Sequelize, sequelize)

    this.User.hasMany(this.UsersAuthKey)
    this.UsersAuthKey.belongsTo(this.User, {
      as: 'U',
      foreignKey: 'userId'
    })
  }

  getApiKeyUser (data) {
    return new Promise((resolve, reject) => {
      if (data.apiKey === '') {
        reject(new InvalidDataError('Api Key'))
      } else {
        this.User.findOne({
          where: {
            inactive: { $or: [0, null] }
          },
          include: [{
            model: this.UsersAuthKey,
            where: {
              apiKey: data.apiKey
            }
          }]
        }).then(user => {
          if (user === undefined || user === null || user.length === 0) { reject(new InvalidDataError('Api Key')) } else { resolve(user) }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      }
    })
  }
}

module.exports = UsersAuthService
