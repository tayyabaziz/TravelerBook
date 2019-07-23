const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelImagesModel {
    constructor() {
        var baseTableName = 'images';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            imageUrl: { type: Sequelize.STRING, allowNull: false },
            hotelId: { type: Sequelize.BIGINT, allowNull: false },
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        var HotelImagesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        HotelImagesModel.sync();

        return HotelImagesModel;
    }
}

module.exports = HotelImagesModel;