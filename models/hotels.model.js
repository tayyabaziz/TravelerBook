module.exports = function (app, MySQLConnetion) {
	var hotels = new MySQLConnetion({tableName: "hotels"});
	var hotel_images = new MySQLConnetion({tableName: "images"});
	var hotel_facilities = new MySQLConnetion({tableName: "hotel_facilities"});
	app.get('/hotels', (req, res) => {
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

		hotels.find('all', {limit: [offset, limit]}, function(err, rows) {
			if (!err)
				res.json(rows);
			else
				res.status(400).json({"message": "Error Occured"});
		});
	});

	app.get('/hotel/:hotelId', (req, res) => {
		if(!req.params.hotelId) {
			res.status(400).json({"message": "Error Occured"});
		}
		else {
			hotels.read(req.params.hotelId, function(err, rows) {
				if (!err)
					res.json(rows);
				else
					res.status(400).json({"message": "Error Occured"});
			});
		}
	});

	app.get('/hotel/:hotelId/hotel_images', (req, res) => {
		if(!req.params.hotelId) {
			res.status(400).json({"message": "Error Occured"});
		}
		else {
			hotel_images.find('all', {where: "hotelId = "+req.params.hotelId}, function(err, rows) {
				if (!err)
					res.json(rows);
				else
					res.status(400).json({"message": "Error Occured"});
			});
		}
	});

	app.get('/hotel/:hotelId/hotel_facilities', (req, res) => {
		if(!req.params.hotelId) {
			res.status(400).json({"message": "Error Occured"});
		}
		else {
			hotel_facilities.find('all', {where: "hotelId = "+req.params.hotelId}, function(err, rows) {
				if (!err)
					res.json(rows);
				else
					res.status(400).json({"message": "Error Occured"});
			});
		}
	});
}