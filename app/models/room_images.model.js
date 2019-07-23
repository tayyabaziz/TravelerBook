const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class RoomImagesModel {
    constructor() {
        var baseTableName = 'room_images';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            imageUrl: { type: Sequelize.STRING, allowNull: false },
            roomId: { type: Sequelize.BIGINT, allowNull: false },
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };
        
        var RoomImagesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        RoomImagesModel.sync();

        return RoomImagesModel;
    }
}

module.exports = RoomImagesModel;