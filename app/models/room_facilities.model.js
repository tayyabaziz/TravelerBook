class RoomFacilitiesModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'room_facilities'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      facilityId: { type: Sequelize.BIGINT, allowNull: false },
      roomId: { type: Sequelize.BIGINT, allowNull: false },
      isImportant: { type: Sequelize.BIGINT }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const RoomFacilitiesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    RoomFacilitiesModel.sync()

    return RoomFacilitiesModel
  }
}

module.exports = RoomFacilitiesModel
