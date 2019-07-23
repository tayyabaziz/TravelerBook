class RoomFacilitiesModel {
    constructor(Sequelize, sequelize) {
        var baseTableName = 'room_facilities';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            facilityId: { type: Sequelize.BIGINT, allowNull: false },
			roomId: { type: Sequelize.BIGINT, allowNull: false },
			isImportant: { type: Sequelize.BIGINT},
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };
        
        var RoomFacilitiesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        RoomFacilitiesModel.sync();

        return RoomFacilitiesModel;
    }
}

module.exports = RoomFacilitiesModel;