const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelModel {
    constructor() {
        var baseTableName = 'hotels';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            name: { type: Sequelize.STRING, allowNull: false },
            address: { type: Sequelize.STRING },
            lat: { type: Sequelize.DOUBLE },
            lng: { type: Sequelize.DOUBLE },
            url_key: { type: Sequelize.STRING, allowNull: false },
            total_rating: { type: Sequelize.DECIMAL, allowNull: false, defaultValue: '0' },
            popularfor: { type: Sequelize.STRING },
            inactive: { type: Sequelize.INTEGER, allowNull: false},
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: true,
            updatedAt: false,
        };
        
        var HotelModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        HotelModel.sync();

        return HotelModel;
    }
}

module.exports = HotelModel;