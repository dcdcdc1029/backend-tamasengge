const {validationResult} = require('express-validator');
const LivePost = require('../models/live_model');
const path = require('path');
const fs = require('fs');

exports.getAllLive = (req, res, next) => {
    let totalData;

    LivePost.find()
    .countDocuments()
    .then((count) => {
        totalData = count;
        return LivePost.find();
    })
    .then(result => {
        res.status(200).json({
            message: "Success get all data",
            totalData: totalData,
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
};
