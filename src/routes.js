const express = require('express');
const studentRoute = require('./routes/student');
const seatRoute = require('./routes/seat');
const router = express.Router();

router.use('/students', studentRoute);
router.use('/seats', seatRoute);

module.exports = router;