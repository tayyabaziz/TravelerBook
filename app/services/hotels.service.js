const HotelModel = require('../models/hotel.model');
const HotelImagesModel = require('../models/hotel_images.model');
const HotelFacilitiesModel = require('../models/hotel_facilities.model');
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelService {
	constructor() {
		this.Hotels = new HotelModel(Sequelize, sequelize);
		this.HotelImages = new HotelImagesModel(Sequelize, sequelize);
		this.HotelFacilities = new HotelFacilitiesModel(Sequelize, sequelize);

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

	getAllHotels(data) {
		return new Promise((resolve, reject) => {
			this.Hotels.findAll({
				where: {
					inactive: { $or: [0, null] }
				},
				offset: parseInt(data.offset),
				limit: parseInt(data.limit),
				include: [this.HotelImages, this.HotelFacilities]
			}).then(hotels => {
				if (hotels === undefined || hotels === null || hotels.length == 0)
					reject(new ResourceNotFoundError("Hotels"));
				else
					resolve(hotels);
			}).catch(Sequelize.Error, function (err) {
				reject(new DatabaseError(err.message, err.name));
			});
		});
	}

	getHotel(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.Hotels.findOne({
					where: {
						id: data.hotelId,
						inactive: { $or: [0, null] }
					},
					include: [this.HotelImages, this.HotelFacilities]
				}).then(hotel => {
					if (hotel === undefined || hotel === null || hotel.length == 0)
						reject(new ResourceNotFoundError("Hotel"));
					else
						resolve(hotel);
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	createHotel(data) {
		return new Promise((resolve, reject) => {
			this.Hotels.create(data.hotelData, {
				include: [this.HotelImages, this.HotelFacilities]
			}).then((hotel) => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					reject(new ResourceNotFoundError("Hotel"));
				else
					resolve(hotel);
			}).catch(Sequelize.Error, function (err) {
				reject(new DatabaseError(err.message, err.name));
			});
		});
	}

	updateHotel(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.Hotels.findOne({
					where: {
						id: data.hotelId,
						inactive: { $or: [0, null] }
					},
					include: [this.HotelImages, this.HotelFacilities]
				}).then(hotel => {
					if (hotel === undefined || hotel === null || hotel.length == 0)
						reject(new ResourceNotFoundError("Hotel"));
					else {
						for (const key in data.hotelData) {
							if (data.hotelData.hasOwnProperty(key)) {
								hotel[key] = data.hotelData[key];
							}
						}
						hotel.save().then(function () {
							resolve(hotel);
						}).catch(Sequelize.Error, function (err) {
							reject(new DatabaseError(err.message, err.name));
						});
					}
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	updateHotelField(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.Hotels.findOne({
					where: {
						id: data.hotelId,
						inactive: { $or: [0, null] }
					},
					include: [this.HotelImages, this.HotelFacilities]
				}).then(hotel => {
					if (hotel === undefined || hotel === null || hotel.length == 0)
						reject(new ResourceNotFoundError("Hotel"));
					else {
						for (const key in data.hotelData) {
							if (data.hotelData.hasOwnProperty(key)) {
								hotel[key] = data.hotelData[key];
							}
						}
						hotel.save().then(function () {
							resolve(hotel);
						}).catch(Sequelize.Error, function (err) {
							reject(new DatabaseError(err.message, err.name));
						});
					}
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	removeHotel(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.Hotels.findOne({
					where: {
						id: data.hotelId,
						inactive: { $or: [0, null] }
					},
					include: [this.HotelImages, this.HotelFacilities]
				}).then(hotel => {
					if (hotel === undefined || hotel === null || hotel.length == 0)
						reject(new ResourceNotFoundError("Hotel"));
					else {
						hotel.inactive = 1;
						hotel.save().then(function () {
							resolve(hotel);
						}).catch(Sequelize.Error, function (err) {
							reject(new DatabaseError(err.message, err.name));
						});
					}
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	getHotelImages(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.HotelImages.findAll({
					where: {
						hotelId: data.hotelId,
						inactive: { $or: [0, null] }
					}
				}).then(hotel_images => {
					if (hotel_images === undefined || hotel_images === null || hotel_images.length == 0)
						reject(new ResourceNotFoundError("Hotel images"));
					else
						resolve(hotel_images);
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	getHotelFacilities(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.HotelFacilities.findAll({
					where: {
						hotelId: data.hotelId,
						inactive: { $or: [0, null] }
					}
				}).then(hotel_facilities => {
					if (hotel_facilities === undefined || hotel_facilities === null || hotel_facilities.length == 0)
						reject(new ResourceNotFoundError("Hotel facilities"));
					else
						resolve(hotel_facilities);
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	createHotelImages(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.Hotels.findOne({
					where: {
						id: data.hotelId,
						inactive: { $or: [0, null] }
					},
				}).then(hotel => {
					if (hotel === undefined || hotel === null || hotel.length == 0)
						reject(new ResourceNotFoundError("Hotel"));
					else {
						for (let index = 0; index < data.hotelExtendedData.length; index++) {
							data.hotelExtendedData[index].hotelId = data.hotelId;
						}
						this.HotelImages.bulkCreate(data.hotelExtendedData).then((hotel_image) => {
							resolve(hotel_image);
						}).catch(Sequelize.Error, function (err) {
							reject(new DatabaseError(err.message, err.name));
						});
					}
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}

	createHotelFacilities(data) {
		return new Promise((resolve, reject) => {
			if (!isNaN(data.hotelId)) {
				this.Hotels.findOne({
					where: { id: data.hotelId },
				}).then(hotel => {
					if (hotel === undefined || hotel === null || hotel.length == 0)
						reject(new ResourceNotFoundError("Hotel"));
					else {
						for (let index = 0; index < data.hotelExtendedData.length; index++) {
							data.hotelExtendedData[index].hotelId = data.hotelId;
						}
						this.HotelFacilities.bulkCreate(data.hotelExtendedData).then((hotel_facility) => {
							resolve(hotel_facility);
						}).catch(Sequelize.Error, function (err) {
							reject(new DatabaseError(err.message, err.name));
						});
					}
				}).catch(Sequelize.Error, function (err) {
					reject(new DatabaseError(err.message, err.name));
				});
			}
			else {
				reject(new InvalidDataError("Hotel Id"));
			}
		});
	}
}

module.exports = HotelService;