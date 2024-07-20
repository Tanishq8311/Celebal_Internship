const express = require('express');
const userController = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/protected', protect, userController.protectedRoute);

module.exports = router;
