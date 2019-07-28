class RoomModel {
    constructor(Sequelize, sequelize) {
        var baseTableName = 'rooms';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            roomType: { type: Sequelize.STRING, allowNull: false },
            desc: { type: Sequelize.STRING },
            bed: { type: Sequelize.INTEGER },
            isBreakfastIncluded: { type: Sequelize.INTEGER },
            hotelId: { type: Sequelize.INTEGER, allowNull: false},
            price: { type: Sequelize.DECIMAL },
            discountPrice: { type: Sequelize.DECIMAL },
            noOfRooms: { type: Sequelize.INTEGER },
            noOfAdults: { type: Sequelize.INTEGER },
            noOfChilds: { type: Sequelize.INTEGER },
            maxCancelationTime: { type: Sequelize.DATE },
            inactive: { type: Sequelize.INTEGER, allowNull: false},
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        var RoomModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        RoomModel.sync();

        return RoomModel;
    }
}

module.exports = RoomModel;