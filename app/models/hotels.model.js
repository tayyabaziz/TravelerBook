var HelperClass = require('../helper/helper.class');

const SequelizeConnection = require('../config/database.config.js');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelModel {
    constructor() {
		this.Helper = new HelperClass();
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
			as: 'HotelImages',
            foreignKey: 'hotelId'
        });

        this.Hotels.hasMany(this.HotelFacilities);
        this.HotelFacilities.belongsTo(this.Hotels, {
			as: 'HotelFacilities',
            foreignKey: 'hotelId'
        });
    }

    getAllHotels(offset, limit, result) {
        this.Hotels.findAll({
            offset: parseInt(offset),
			limit: parseInt(limit),
			include : [this.HotelImages, this.HotelFacilities]
        }).then(hotels => {
            this.Helper.handleResult(result, hotels);
        });
    }

    getHotel(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
                this.Helper.handleResult(result, hotel);
            });
        }
        else {
            result("Error Occured", null);
        }
	}
	
	updateHotel(hotelId, hotelData, result) {
		if(!isNaN(hotelId)) {
			this.Hotels.update(
				{
					name: hotelData.name,
					address: hotelData.address,
					lat: hotelData.lat,
					lng: hotelData.lng,
					url_key: hotelData.url_key,
					createdAt: hotelData.createdAt,
					total_rating: hotelData.total_rating,
					popularfor: hotelData.popularfor,
				}, {
					returning: true,
					plain: true,
					where: {id: hotelId}
				}
			).then(hotel => {
                this.Helper.handleResult(result, hotel);
            });
		}
		else {
			result("Error Occured", null);
		}
	}

	updateHotelField(hotelId, hotelData, result) {
		if(!isNaN(hotelId)) {
			this.Hotels.update(
				hotelData, {
					returning: true,
					plain: true,
					where: {id: hotelId}
				}
			).then(hotel => {
                this.Helper.handleResult(result, hotel);
            });
		}
		else {
			result("Error Occured", null);
		}
	}

	removeHotel(hotelId, result) {
		if(!isNaN(hotelId)) {
			this.Hotels.update(
				{	
					inactive: 1,
				}, {
					returning: true,
					plain: true,
					where: {id: hotelId}
				}
			).then(hotel => {
                this.Helper.handleResult(result, hotel);
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
                this.Helper.handleResult(result, hotel_images);
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
                this.Helper.handleResult(result, hotel_facilities);
            });
        }
        else {
            result("Error Occured", null);
        }
	}
}
module.exports = HotelModel;