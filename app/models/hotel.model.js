class HotelModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'hotels'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING },
      lat: { type: Sequelize.DOUBLE },
      lng: { type: Sequelize.DOUBLE },
      url_key: { type: Sequelize.STRING, allowNull: false },
      total_rating: { type: Sequelize.DECIMAL, allowNull: false, defaultValue: '0' },
      popularfor: { type: Sequelize.STRING },
      inactive: { type: Sequelize.INTEGER, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: true,
      updatedAt: false
    }

    const HotelModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    HotelModel.sync()

    return HotelModel
  }
}

module.exports = HotelModel
