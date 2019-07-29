class UsersAuthKeyModel {
    constructor(Sequelize, sequelize) {
        var baseTableName = 'users_auth_key';
        var baseTableFields = {
            id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
            userId: { type: Sequelize.BIGINT, allowNull: false },
            userType: { type: Sequelize.BIGINT, allowNull: false },
            authKey: { type: Sequelize.STRING, allowNull: false },
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