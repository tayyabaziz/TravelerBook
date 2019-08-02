class RoomModel {
  constructor (Sequelize, sequelize) {
    const baseTableName = 'rooms'
    const baseTableFields = {
      id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
      roomType: { type: Sequelize.STRING, allowNull: false },
      desc: { type: Sequelize.STRING },
      bed: { type: Sequelize.INTEGER },
      isBreakfastIncluded: { type: Sequelize.INTEGER },
      hotelId: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.DECIMAL },
      discountPrice: { type: Sequelize.DECIMAL },
      noOfRooms: { type: Sequelize.INTEGER },
      noOfAdults: { type: Sequelize.INTEGER },
      noOfChilds: { type: Sequelize.INTEGER },
      maxCancelationTime: { type: Sequelize.DATE },
      inactive: { type: Sequelize.INTEGER, allowNull: false }
    }
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: false
    }

    const RoomModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions)
    RoomModel.sync()

    return RoomModel
  }
}

module.exports = RoomModel
