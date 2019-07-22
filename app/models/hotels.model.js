const HelperClass = require('../helper/helper.class');
const SequelizeConnection = require('../config/database.config');

const Helper = new HelperClass();
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
        
        this.Hotels = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        this.Hotels.sync();

        this.HotelImages = sequelize.define('images', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            imageUrl: { type: Sequelize.STRING, allowNull: false },
            hotelId: { type: Sequelize.BIGINT, allowNull: false },
        }, {
            tableName: 'images',
            freezeTableName: true,
            timestamps: false
        });
        this.Hotels.hasMany(this.HotelImages);
        this.HotelImages.belongsTo(this.Hotels, {
			as: 'HotelImages',
            foreignKey: 'hotelId'
        });
        this.HotelImages.sync();

        this.HotelFacilities = sequelize.define('hotel_facilities', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            facilityId: { type: Sequelize.BIGINT, allowNull: false },
            hotelId: { type: Sequelize.BIGINT, allowNull: false },
        }, {
            tableName: 'hotel_facilities',
            freezeTableName: true,
            timestamps: false
        });
        this.Hotels.hasMany(this.HotelFacilities);
        this.HotelFacilities.belongsTo(this.Hotels, {
			as: 'HotelFacilities',
            foreignKey: 'hotelId'
        });
        this.HotelFacilities.sync();
    }

    getAllHotels(offset, limit, result) {
        this.Hotels.findAll({
            offset: parseInt(offset),
			limit: parseInt(limit),
			include : [this.HotelImages, this.HotelFacilities]
        }).then(hotels => {
            Helper.handleResult(result, hotels);
        }).catch(Sequelize.Error, function (err) {
            result(err, null);
        });
    }

    getHotel(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
                Helper.handleResult(result, hotel);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
        }
        else {
            result("Incorrect Hotel Id", null);
        }
	}
    
    createHotel(hotelData, result) {
        var hotel = {};
        hotel.name = (hotelData.name != undefined) ? hotelData.name: null;
        hotel.address = (hotelData.address != undefined) ? hotelData.address: null;
        hotel.lat = (hotelData.lat != undefined) ? hotelData.lat: null;
        hotel.lng = (hotelData.lng != undefined) ? hotelData.lng: null;
        hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key: null;
        hotel.total_rating = 0;
        hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor: null;
        hotel.inactive = 0;
        hotel.createdAt = (hotelData.createdAt != undefined) ? hotelData.createdAt: null;
        hotel.images = (hotelData.images != undefined) ? hotelData.images: [];
        hotel.hotel_facilities = (hotelData.hotel_facilities != undefined) ? hotelData.hotel_facilities: [];
        
        this.Hotels.create(hotel, {
            include: [this.HotelImages, this.HotelFacilities]
        }).then((hotelResponse) => {
            result(null, hotelResponse);
        }).catch(Sequelize.Error, function (err) {
            result(err.message, null);
        });
    }

    updateHotel(hotelId, hotelData, result) {
		if(!isNaN(hotelId)) {
            this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
                hotel.name = (hotelData.name != undefined) ? hotelData.name: null;
                hotel.address = (hotelData.address != undefined) ? hotelData.address: null;
                hotel.lat = (hotelData.lat != undefined) ? hotelData.lat: null;
                hotel.lng = (hotelData.lng != undefined) ? hotelData.lng: null;
                hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key: null;
                hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor: null;
                hotel.save().then(function() {
                    result(null, hotel);
                }).catch(Sequelize.Error, function (err) {
                    result(err.message, null);
                });
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
        else {
            result("Incorrect Hotel Id", null);
        }
	}

	updateHotelField(hotelId, hotelData, result) {
		if(!isNaN(hotelId)) {
			this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
                for (const key in hotelData) {
                    if (hotelData.hasOwnProperty(key)) {
                        hotel[key] = (hotelData[key] != undefined) ? hotelData[key]: null;
                    }
                }
                hotel.save().then(function() {
                    result(null, hotel);
                }).catch(Sequelize.Error, function (err) {
                    result(err.message, null);
                });
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
        else {
            result("Incorrect Hotel Id", null);
        }
	}

	removeHotel(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.Hotels.findOne({
                where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]               
            }).then(hotel => {
                hotel.inactive = 1;
                hotel.save();
                Helper.handleResult(result, hotel);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
        else {
            result("Incorrect Hotel Id", null);
        }
	}

    getHotelImages(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.HotelImages.findAll({
                where: {hotelId: hotelId}
            }).then(hotel_images => {
                Helper.handleResult(result, hotel_images);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
        }
        else {
            result("Incorrect Hotel Id", null);
        }
    }
    
	getHotelFacilities(hotelId, result) {
        if(!isNaN(hotelId)) {
            this.HotelFacilities.findAll({
                where: {hotelId: hotelId}
            }).then(hotel_facilities => {
                Helper.handleResult(result, hotel_facilities);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
        }
        else {
            result("Incorrect Hotel Id", null);
        }
    }

    createHotelImages(hotelId, hotelExtendedData, result) {
        if(!isNaN(hotelId)) {
            for (let index = 0; index < hotelExtendedData.length; index++) {
                hotelExtendedData[index].hotelId = hotelId;
            }
            this.HotelImages.bulkCreate(hotelExtendedData).then((hotel_image) => {
                result(null, hotel_image);
            }).catch(Sequelize.Error, function (err) {
                result(err.message, null);
            });
        }
        else {
            result("Incorrect Hotel Id", null);
        }
    }
    
    createHotelFacilities(hotelId, hotelExtendedData, result) {
        if(!isNaN(hotelId)) {
            for (let index = 0; index < hotelExtendedData.length; index++) {
                hotelExtendedData[index].hotelId = hotelId;
            }
            this.HotelFacilities.bulkCreate(hotelExtendedData).then((hotel_facility) => {
                result(null, hotel_facility);
            }).catch(Sequelize.Error, function (err) {
                result(err.message, null);
            });
        }
        else {
            result("Incorrect Hotel Id", null);
        }
    }
}
module.exports = HotelModel;