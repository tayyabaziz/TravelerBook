module.exports = function (app, MySQLConnetion) {
	var rooms = new MySQLConnetion({tableName: "rooms"});
	var room_images = new MySQLConnetion({tableName: "room_images"});
	var room_facilities = new MySQLConnetion({tableName: "room_facilities"});
	app.get('/rooms', (req, res) => {
		let page = 0;
		let limit = 100;
		if(!req.query.page) {
			page = 0;
		}
		else {
			page = req.query.page;
		}

		if(!req.query.limit) {
			limit = 100;
		}
		else {
			limit = req.query.limit;
		}
		let offset = page*limit;

		rooms.find('all', {limit: [offset, limit]}, function(err, rows) {
			if (!err)
				if (!rows)
					res.status(404).json({"message": "No Data Found"});
				else 
					res.json(rows);
			else
				res.status(400).json({"message": "Error Occured"});
		});
	});

	app.get('/room/:roomId', (req, res) => {
		if(!req.params.roomId) {
			res.status(400).json({"message": "Error Occured"});
		}
		else {
			rooms.read(req.params.roomId, function(err, rows) {
				if (!err)
					if (!rows)
						res.status(404).json({"message": "No Data Found"});
					else 
						res.json(rows);
				else
					res.status(400).json({"message": "Error Occured"});
			});
		}
	});

	app.get('/room/:roomId/room_images', (req, res) => {
		if(!req.params.roomId) {
			res.status(400).json({"message": "Error Occured"});
		}
		else {
			room_images.find('all', {where: ("roomId = ?", req.params.roomId)}, function(err, rows) {
				if (!err)
					if (!rows)
						res.status(404).json({"message": "No Data Found"});
					else 
						res.json(rows);
				else
					res.status(400).json({"message": "Error Occured"});
			});
		}
	});

	app.get('/room/:roomId/room_facilities', (req, res) => {
		if(!req.params.roomId) {
			res.status(400).json({"message": "Error Occured"});
		}
		else {
			room_facilities.find('all', {where: ("roomId = ?", req.params.roomId)}, function(err, rows) {
				if (!err)
					if (!rows)
						res.status(404).json({"message": "No Data Found"});
					else 
						res.json(rows);
				else
					res.status(400).json({"message": "Error Occured"});
			});
		}
	});
}