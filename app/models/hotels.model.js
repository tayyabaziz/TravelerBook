const SequelizeConnection = require('../config/database.config.js');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelModel {
    constructor() {
        this.Hotels = sequelize.define('hotels', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            name: { type: Sequelize.STRING, allowNull: false },
            address: { type: Sequelize.STRING },
            lat: { type: Sequelize.DOUBLE },
            lng: { type: Sequelize.DOUBLE },
            url_key: { type: Sequelize.STRING },
            createdAt: { type: Sequelize.DATE },
            total_rating: { type: Sequelize.DECIMAL },
            popularfor: { type: Sequelize.STRING },
            inactive: { type: Sequelize.INTEGER },
        }, {
            tableName: 'hotels',
            freezeTableName: true,
            timestamps: false
        });

        this.HotelImages = sequelize.define('images', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            imageUrl: { type: Sequelize.STRING, allowNull: false },
            hotelId: { type: Sequelize.BIGINT, allowNull: false },
        }, {
            tableName: 'images',
            freezeTableName: true,
            timestamps: false
        });

        this.HotelFacilities = sequelize.define('hotel_facilities', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            facilityId: { type: Sequelize.BIGINT, allowNull: false },
            hotelId: { type: Sequelize.BIGINT, allowNull: false },
        }, {
            tableName: 'hotel_facilities',
            freezeTableName: true,
            timestamps: false
        });

        
        this.Hotels.hasMany(this.HotelImages);
        this.HotelImages.belongsTo(this.Hotels, {
            foreignKey: 'hotelId'
        });

        this.Hotels.hasMany(this.HotelFacilities);
        this.HotelFacilities.belongsTo(this.Hotels, {
            foreignKey: 'hotelId'
        });
    }

    getAllHotels(offset, limit, result) {
        this.Hotels.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).then(hotels => {
            try {
                result(null, hotels);
            } catch (error) {
                result(error, null);
            }
        });
    }

    getHotel(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.Hotels.findOne({
                where: {id: hotelId}
            }).then(hotel => {
                try {
                    result(null, hotel);
                } catch (error) {
                    result(error, null);
                }
            });
        }
        else {
            result("Error Occured", null);
        }
    }

    getHotelImages(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.HotelImages.findAll({
                where: {hotelId: hotelId}
            }).then(hotel_images => {
                try {
                    result(null, hotel_images);
                } catch (error) {
                    result(error, null);
                }
            });
        }
        else {
            result("Error Occured", null);
        }
            
	}

	getHotelFacilities(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.HotelFacilities.findAll({
                where: {hotelId: hotelId}
            }).then(hotel_facilities => {
                try {
                    result(null, hotel_facilities);
                } catch (error) {
                    result(error, null);
                }
            });
        }
        else {
            result("Error Occured", null);
        }
	}
}
module.exports = HotelModel;