class UsersAuthKeyModel {
    constructor(Sequelize, sequelize) {
        var baseTableName = 'users_auth_key';
        var baseTableFields = {
            id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
            userId: { type: Sequelize.BIGINT, allowNull: false },
            userType: { type: Sequelize.INTEGER, allowNull: false },
            apiKey: { type: Sequelize.STRING, allowNull: false, unique: true },
        };

        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        var UsersAuthKeyModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        UsersAuthKeyModel.sync();

        return UsersAuthKeyModel;
    }
}

module.exports = UsersAuthKeyModel;