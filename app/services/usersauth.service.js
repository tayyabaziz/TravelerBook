const { UsersAuthKeyModel } = require('../models/all.models');
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class UsersAuthService {
    constructor() {
        this.UsersAuthKey = new UsersAuthKeyModel(Sequelize, sequelize);
    }

    getApiKeyUser(data) {
        return new Promise((resolve, reject) => {
            if (data.apiKey == "") {
                reject(new InvalidDataError("Api Key"));
            }
            this.UsersAuthKey.findOne({
                where: {
                    apiKey: data.apiKey
                }
            }).then(user => {
                if (user === undefined || user === null || user.length == 0)
                    reject(new ResourceNotFoundError("User"));
                else
                    resolve(user);
            }).catch(Sequelize.Error, function (err) {
                reject(new DatabaseError(err.message, err.name));
            });
        });
    }
}

module.exports = UsersAuthService;