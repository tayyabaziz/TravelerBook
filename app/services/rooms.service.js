const RoomModel = require('../models/room.model');
const RoomImagesModel = require('../models/room_images.model');
const RoomFacilitiesModel = require('../models/room_facilities.model');
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class RoomService {
    constructor() {
        this.Rooms = new RoomModel(Sequelize, sequelize);
        this.RoomImages = new RoomImagesModel(Sequelize, sequelize);
        this.RoomFacilities = new RoomFacilitiesModel(Sequelize, sequelize);

        this.Rooms.hasMany(this.RoomImages);
        this.RoomImages.belongsTo(this.Rooms, {
            as: 'RoomImages',
            foreignKey: 'roomId'
        });

        this.Rooms.hasMany(this.RoomFacilities);
        this.RoomFacilities.belongsTo(this.Rooms, {
            as: 'RoomFacilities',
            foreignKey: 'roomId'
        });
    }

    getAllRooms(data) {
        return new Promise((resolve, reject) => {
            this.Rooms.findAll({
                offset: parseInt(data.offset),
                limit: parseInt(data.limit),
                where: {
                    inactive: { $or: [0, null] }
                },
                include: [this.RoomImages, this.RoomFacilities]
            }).then(rooms => {
                if (rooms === undefined || rooms.length == 0)
                    reject(new ResourceNotFoundError("Rooms"));
                else
                    resolve(rooms);
            }).catch(Sequelize.Error, function (err) {
                reject(new DatabaseError(err.message, err.name));
            });
        });
    }

    getRoom(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.Rooms.findOne({
                    where: {
                        id: data.roomId,
                        inactive: { $or: [0, null] }
                    },
                    include: [this.RoomImages, this.RoomFacilities]
                }).then(room => {
                    if (room === undefined || room == null || room.length == 0)
                        reject(new ResourceNotFoundError("Room"));
                    else
                        resolve(room);
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    createRoom(data) {
        return new Promise((resolve, reject) => {
            this.Rooms.create(data.roomData, {
                include: [this.RoomImages, this.RoomFacilities]
            }).then((room) => {
                if (room === undefined || room == null || room.length == 0)
                    reject(new ResourceNotFoundError("Room"));
                else
                    resolve(room);
            }).catch(Sequelize.Error, function (err) {
                reject(new DatabaseError(err.message, err.name));
            });
        });
    }

    updateRoom(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.Rooms.findOne({
                    where: {
                        id: data.roomId,
                        inactive: { $or: [0, null] }
                    },
                    include: [this.RoomImages, this.RoomFacilities]
                }).then(room => {
                    if (room === undefined || room == null || room.length == 0)
                        reject(new ResourceNotFoundError("Room"));
                    else {
                        for (const key in data.roomData) {
                            if (data.roomData.hasOwnProperty(key)) {
                                room[key] = data.roomData[key];
                            }
                        }
                        room.save().then(function () {
                            resolve(room);
                        }).catch(Sequelize.Error, function (err) {
                            reject(new DatabaseError(err.message, err.name));
                        });
                    }
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    updateRoomField(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.Rooms.findOne({
                    where: {
                        id: data.roomId,
                        inactive: { $or: [0, null] }
                    },
                    include: [this.RoomImages, this.RoomFacilities]
                }).then(room => {
                    if (room === undefined || room == null || room.length == 0)
                        reject(new ResourceNotFoundError("Room"));
                    else {
                        for (const key in data.roomData) {
                            if (data.roomData.hasOwnProperty(key)) {
                                room[key] = data.roomData[key];
                            }
                        }
                        room.save().then(function () {
                            resolve(room);
                        }).catch(Sequelize.Error, function (err) {
                            reject(new DatabaseError(err.message, err.name));
                        });
                    }
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    removeRoom(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.Rooms.findOne({
                    where: {
                        id: data.roomId,
                        inactive: { $or: [0, null] }
                    },
                    include: [this.roomImages, this.roomFacilities]
                }).then(room => {
                    if (room === undefined || room == null || room.length == 0)
                        reject(new ResourceNotFoundError("Room"));
                    else {
                        room.inactive = 1;
                        room.save().then(function () {
                            resolve(room);
                        }).catch(Sequelize.Error, function (err) {
                            reject(new DatabaseError(err.message, err.name));
                        });
                    }
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    getRoomImages(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.RoomImages.findAll({
                    where: {
                        roomId: data.roomId,
                        inactive: { $or: [0, null] }
                    }
                }).then(room_images => {
                    if (room_images === undefined || room_images == null || room_images.length == 0)
                        reject(new ResourceNotFoundError("Room images"));
                    else
                        resolve(room_images);
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    getRoomFacilities(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.RoomFacilities.findAll({
                    where: {
                        roomId: data.roomId,
                        inactive: { $or: [0, null] }
                    }
                }).then(room_facilities => {
                    if (room_facilities === undefined || room_facilities == null || room_facilities.length == 0)
                        reject(new ResourceNotFoundError("Room facilities"));
                    else
                        resolve(room_facilities);
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    createRoomImages(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.Rooms.findOne({
                    where: {
                        id: data.roomId,
                        inactive: { $or: [0, null] }
                    },
                }).then(room => {
                    if (room === undefined || room === null || room.length == 0)
                        reject(new ResourceNotFoundError("Room"));
                    else {
                        for (let index = 0; index < data.roomExtendedData.length; index++) {
                            data.roomExtendedData[index].roomId = data.roomId;
                        }
                        this.RoomImages.bulkCreate(data.roomExtendedData).then((room_image) => {
                            resolve(room_image);
                        }).catch(Sequelize.Error, function (err) {
                            reject(new DatabaseError(err.message, err.name));
                        });
                    }
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }

    createRoomFacilities(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.roomId)) {
                this.Rooms.findOne({
                    where: {
                        id: data.roomId,
                        inactive: { $or: [0, null] }
                    },
                }).then(room => {
                    if (room === undefined || room === null || room.length == 0)
                        reject(new ResourceNotFoundError("Room"));
                    else {
                        for (let index = 0; index < data.roomExtendedData.length; index++) {
                            data.roomExtendedData[index].roomId = data.roomId;
                        }
                        this.RoomFacilities.bulkCreate(data.roomExtendedData).then((room_facility) => {
                            resolve(room_facility);
                        }).catch(Sequelize.Error, function (err) {
                            reject(new DatabaseError(err.message, err.name));
                        });
                    }
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Room Id"));
            }
        });
    }
}

module.exports = RoomService;