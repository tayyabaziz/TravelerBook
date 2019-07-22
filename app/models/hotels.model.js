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

    getAllHotels(offset, limit, res) {
        this.Hotels.findAll({
            offset: parseInt(offset),
			limit: parseInt(limit),
			include : [this.HotelImages, this.HotelFacilities]
        }).then(hotels => {
            if (hotels === undefined || hotels === null || hotels.length == 0)
                return res.status(404).json({"message": "No Data Found"});
            else 
                return res.json(hotels);
        }).catch(Sequelize.Error, function (err) {
            throw Error(err.message);
        });
    }

    getHotel(hotelId, res) {
        if(!isNaN(hotelId)) {
            this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
                if (hotel === undefined || hotel === null || hotel.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else 
					return res.json(hotel);
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Hotel Id");
        }
	}
    
    createHotel(hotelData, res) {
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
			if (hotelResponse === undefined || hotelResponse === null || hotelResponse.length == 0)
				return res.status(404).json({"message": "No Data Found"});
			else 
				return res.json(hotelResponse);
        }).catch(Sequelize.Error, function (err) {
            throw Error(err.message);
        });
    }

    updateHotel(hotelId, hotelData, res) {
		if(!isNaN(hotelId)) {
            this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					hotel.name = (hotelData.name != undefined) ? hotelData.name: null;
					hotel.address = (hotelData.address != undefined) ? hotelData.address: null;
					hotel.lat = (hotelData.lat != undefined) ? hotelData.lat: null;
					hotel.lng = (hotelData.lng != undefined) ? hotelData.lng: null;
					hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key: null;
					hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor: null;
					hotel.save().then(function() {
						return res.json(hotel);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
		}
        else {
            throw Error("Incorrect Hotel Id");
        }
	}

	updateHotelField(hotelId, hotelData, res) {
		if(!isNaN(hotelId)) {
			this.Hotels.findOne({
				where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					for (const key in hotelData) {
						if (hotelData.hasOwnProperty(key)) {
							hotel[key] = (hotelData[key] != undefined) ? hotelData[key]: null;
						}
					}
					hotel.save().then(function() {
						return res.json(hotel);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
		}
        else {
            throw Error("Incorrect Hotel Id");
        }
	}

	removeHotel(hotelId, res) {
        if(!isNaN(hotelId)) {
            this.Hotels.findOne({
                where: {id: hotelId},
				include : [this.HotelImages, this.HotelFacilities]               
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					hotel.inactive = 1;
					hotel.save().then(function() {
						return res.json(hotel);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
		}
        else {
            throw Error("Incorrect Hotel Id");
        }
	}

    getHotelImages(hotelId, res) {
        if(!isNaN(hotelId)) {
            this.HotelImages.findAll({
                where: {hotelId: hotelId}
            }).then(hotel_images => {
				if (hotel_images === undefined || hotel_images === null || hotel_images.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else 
					return res.json(hotel_images);
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Hotel Id");
        }
    }
    
	getHotelFacilities(hotelId, res) {
        if(!isNaN(hotelId)) {
            this.HotelFacilities.findAll({
                where: {hotelId: hotelId}
            }).then(hotel_facilities => {
				if (hotel_facilities === undefined || hotel_facilities === null || hotel_facilities.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else 
					return res.json(hotel_facilities);
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Hotel Id");
        }
    }

    createHotelImages(hotelId, hotelExtendedData, res) {
        if(!isNaN(hotelId)) {
			this.Hotels.findOne({
                where: {id: hotelId},
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					for (let index = 0; index < hotelExtendedData.length; index++) {
						hotelExtendedData[index].hotelId = hotelId;
					}
					this.HotelImages.bulkCreate(hotelExtendedData).then((hotel_image) => {
						if (hotel_image === undefined || hotel_image === null || hotel_image.length == 0)
							return res.status(404).json({"message": "No Data Found"});
						else 
							return res.json(hotel_image);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Hotel Id");
        }
    }
    
    createHotelFacilities(hotelId, hotelExtendedData, res) {
        if(!isNaN(hotelId)) {
			this.Hotels.findOne({
                where: {id: hotelId},
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					for (let index = 0; index < hotelExtendedData.length; index++) {
						hotelExtendedData[index].hotelId = hotelId;
					}
					this.HotelFacilities.bulkCreate(hotelExtendedData).then((hotel_facility) => {
						if (hotel_facility === undefined || hotel_facility === null || hotel_facility.length == 0)
							return res.status(404).json({"message": "No Data Found"});
						else 
							return res.json(hotel_facility);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Hotel Id");
        }
    }
}
module.exports = HotelModel;