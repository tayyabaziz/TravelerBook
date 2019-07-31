class RoomImagesModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'room_images'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      roomId: { type: Sequelize.BIGINT, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const RoomImagesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    RoomImagesModel.sync()

    return RoomImagesModel
  }
}

module.exports = RoomImagesModel
