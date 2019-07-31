class HotelFacilitiesModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'hotel_facilities'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      facilityId: { type: Sequelize.BIGINT, allowNull: false },
      hotelId: { type: Sequelize.BIGINT, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const HotelFacilitiesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    HotelFacilitiesModel.sync()

    return HotelFacilitiesModel
  }
}

module.exports = HotelFacilitiesModel
