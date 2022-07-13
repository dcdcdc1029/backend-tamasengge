const {validationResult} = require('express-validator');
const HotelPost = require('../models/hotel_model');
const path = require('path');
const fs = require('fs');

exports.getAllHotel = (req, res, next) => {
    let totalData;

    HotelPost.find()
    .countDocuments()
    .then((count) => {
        totalData = count;
        return HotelPost.find();
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

exports.getAllHotelPagination = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;

    let totalData;

    HotelPost.find()
    .countDocuments()
    .then((count) => {
        totalData = count;
        return HotelPost.find().skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
    })
    .then(result => {
        res.status(200).json({
            message: "Success get all data",
            totalData: totalData,
            currentPage: parseInt(currentPage),
            perPage: parseInt(perPage),
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
};

exports.getHotelById = (req, res, next) => {
    const id = req.params.id;
    HotelPost.findById(id)
    .then(result => {
        if(!result){
            const error = new Error('Data not found')
            error.errorStatus = 404;
            throw error;
        }

        res.status(200).json({
            message: "Success get data",
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
};

exports.createHotel = (req, res, next) => {
    const errors = validationResult(req);
    
    //validation
    if(!errors.isEmpty()){
        const err = new Error('Invalid value')
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image not uploaded')
        err.errorStatus = 422;
        throw err;
    }

    const image = req.file.path;

    //posting data to model
    const PostingHotel = new HotelPost({
        nama: req.body.nama,
        type: req.body.type,
        harga: req.body.harga,
        alamat: req.body.alamat,
        deskripsi: req.body.deskripsi,
        contact: req.body.contact,
        image: image,
        author:{
            uid: 1,
            name: "DC"
        }
    })

    PostingHotel.save()
    .then((result) => {
        res.status(201).json({
            status: 201,
            message: 'Success add hotel!',
            data: result
        });
    }).catch((err) => {
        console.log("Error [add new hotel] => ", err);
    })
};


exports.updateHotel = (req, res, next) => {
    const {id} = req.params;
    const {nama, image, type, harga, alamat, deskripsi, contact} = req.body;
    const errors = validationResult(req);

    //validasi
    if(!errors.isEmpty()){
        const err = new Error('invalid value');

        err.errorStatus = 400;
        err.data = errors.array();

        throw err;
    }
    
    //validasi file
    if(!req.file){
        const err = new Error('invalid value');

        err.errorStatus = 422;

        throw err;
    }

    HotelPost.findById(id)
    .then((post) => {
        if(!post){
            const error = new Error('Data not found')
            error.errorStatus = 404;
            throw error;
        }

        post.nama = nama;
        post.type = type;
        post.harga = harga,
        post.alamat = alamat,
        post.deskripsi = deskripsi,
        post.contact = contact,
        post.image = req.file.path;

        return post.save();
        // res.status(200).json({
        //     message: "Success get data",
        //     data: result
        // })
    })
    .then((result) => {
        res.status(200).json({
            message: 'Success add hotel!',
            data: result
        });
    })
    .catch(err => {
        next(err)
    })
};

exports.deleteHotel = (req, res, next) => {
    const {id} = req.params;
    const errors = validationResult(req);

    HotelPost.findById(id)
    .then((post) => { 
        //validasi inputan
        if(!post){
            const error = new Error('Data not found')
            error.errorStatus = 404;
            throw error;
        }

        //hapus image
        removeImage(post.image);

        //hapus dari database
        return HotelPost.findByIdAndRemove(id);
    })
    .then((result) => {
        res.status(200).json({
            message: 'Success delete hotel!',
            data: result
        });
    })
    .catch(err => {
        next(err)
    })
};

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../../', filePath)
    fs.unlink(filePath, (err) => console.log(err))
}

// const result = {
//     message: "Add Hotel Success!",
//     data:{
//         hotel_id: 1,
//         nama_hotel: req.body.nama,
//         image_hotel: "image.png",
//         type_hotel: req.body.type,
//         create_at: "02/11/2022",
//         author:{
//             uid: 1,
//             name: "DC"
//         }
//     }
// }

// res.status(201).json(result);

// next();