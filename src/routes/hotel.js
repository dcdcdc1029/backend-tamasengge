const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const hotelController = require('../controllers/hote'); //err sini

//tambah data hotel
router.post("/", [
    body('nama').notEmpty().withMessage('nama tidak boleh kosong!'),
    body('type').notEmpty().withMessage('type tidak boleh kosong!'),
    body('type').isInt({min: 1, max: 5}).withMessage('type harus angka 1-5!'),
    body('harga').notEmpty().withMessage('harga tidak boleh kosong!'),
    body('harga').isInt().withMessage('harga harus angka!'),
    body('alamat').notEmpty().withMessage('alamat tidak boleh kosong!'),
    body('deskripsi').notEmpty().withMessage('deskripsi tidak boleh kosong!'),
    body('contact').notEmpty().withMessage('contact tidak boleh kosong!'),
    body('contact').isInt().withMessage('contact harus angka!')
], hotelController.createHotel);

//get semua hotel
router.get("/", hotelController.getAllHotel);

//get hotel pake pagination
router.get("/pagination", hotelController.getAllHotelPagination);

//get hotel berdasarkan id
router.get("/:id", hotelController.getHotelById);

//ubah data
router.put("/:id", [
    body('nama').notEmpty().withMessage('nama tidak boleh kosong!'),
    body('type').notEmpty().withMessage('type tidak boleh kosong!'),
    body('type').isInt({min: 1, max: 5}).withMessage('type harus angka 1-5!'),
    body('harga').notEmpty().withMessage('harga tidak boleh kosong!'),
    body('harga').isInt().withMessage('harga harus angka!'),
    body('alamat').notEmpty().withMessage('alamat tidak boleh kosong!'),
    body('deskripsi').notEmpty().withMessage('deskripsi tidak boleh kosong!'),
    body('contact').notEmpty().withMessage('contact tidak boleh kosong!'),
    body('contact').isInt().withMessage('contact harus angka!')
], hotelController.updateHotel);

//delete hotel
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
