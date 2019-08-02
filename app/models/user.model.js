class UserModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'users'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      emailAddress: { type: Sequelize.STRING },
      userName: { type: Sequelize.STRING, allowNull: false, unique: true },
      userPass: { type: Sequelize.STRING, allowNull: false },
      inactive: { type: Sequelize.INTEGER, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const UserModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    UserModel.sync()

    return UserModel
  }
}

module.exports = UserModel
