class FacilitiesModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'facilities'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      facility: { type: Sequelize.STRING, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const FacilitiesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    FacilitiesModel.sync()

    return FacilitiesModel
  }
}

module.exports = FacilitiesModel
