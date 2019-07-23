class HotelImagesModel {
    constructor(Sequelize, sequelize) {
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