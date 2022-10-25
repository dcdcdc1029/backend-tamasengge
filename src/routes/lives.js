const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const liveController = require('../controllers/lives');

//get semua live music
router.get("/", liveController.getAllLive);

module.exports = router;
