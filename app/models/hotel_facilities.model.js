const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelFacilitiesModel {
    constructor() {
        var baseTableName = 'hotel_facilities';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            facilityId: { type: Sequelize.BIGINT, allowNull: false },
            hotelId: { type: Sequelize.BIGINT, allowNull: false },
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        var HotelFacilitiesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        HotelFacilitiesModel.sync();

        return HotelFacilitiesModel;
    }
}

module.exports = HotelFacilitiesModel;