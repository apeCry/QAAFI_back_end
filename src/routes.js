const express = require('express');
const studentRoute = require('./routes/student');
const seatRoute = require('./routes/seat');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const router = express.Router();

router.use('/students', studentRoute);
router.use('/seats', seatRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;