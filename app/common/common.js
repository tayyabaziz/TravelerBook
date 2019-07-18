module.exports = function (res, err, rows) {
    if (!err)
        if (rows === undefined || rows.length == 0)
            res.status(404).json({"message": "No Data Found"});
        else 
            res.json(rows);
    else
        res.status(400).json({"message": "Error Occured"});
}