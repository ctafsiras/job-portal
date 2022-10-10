const express = require('express');
const { signUpController, loginController, meController } = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.get('/me', verifyToken, meController);

module.exports = router;
