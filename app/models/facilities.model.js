class FacilitiesModel {
    constructor(Sequelize, sequelize) {
        var baseTableName = 'facilities';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            facility: { type: Sequelize.STRING, allowNull: false },
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        var FacilitiesModel = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        FacilitiesModel.sync();

        return FacilitiesModel;
    }
}

module.exports = FacilitiesModel;