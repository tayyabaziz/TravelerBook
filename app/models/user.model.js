class UserModel {
    constructor(Sequelize, sequelize) {
        var baseTableName = 'users';
        var baseTableFields = {
            id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
            emailAddress: { type: Sequelize.STRING },
            userName: { type: Sequelize.STRING, allowNull: false, unique: true },
            userPass: { type: Sequelize.STRING, allowNull: false },
            emailAddress: { type: Sequelize.STRING },
            inactive: { type: Sequelize.INTEGER, allowNull: false },
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        var UserModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        UserModel.sync();

        return UserModel;
    }
}

module.exports = UserModel;