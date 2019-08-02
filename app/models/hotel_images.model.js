class HotelImagesModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'images'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      hotelId: { type: Sequelize.BIGINT, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const HotelImagesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    HotelImagesModel.sync()

    return HotelImagesModel
  }
}

module.exports = HotelImagesModel
