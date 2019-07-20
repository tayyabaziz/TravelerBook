class HelperClass {
    formatResult(res, err, rows) {
        if (!err)
            if (rows === undefined || rows.length == 0)
                res.status(404).json({"message": "No Data Found"});
            else 
                res.json(rows);
        else
            res.status(400).json({"message": err});
    }

    handleResult(result, data) {
        try {
            result(null, data);
        } catch (error) {
            console.log(error);
            result(error, null);
        }
    }
}

module.exports = HelperClass; 