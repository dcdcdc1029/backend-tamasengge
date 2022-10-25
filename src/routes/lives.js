const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const liveController = require('../controllers/live');

//get semua live music
router.get("/", liveController.getAllLive);

module.exports = router;
