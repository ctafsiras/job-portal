const express = require('express');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/signup');

module.exports = router;