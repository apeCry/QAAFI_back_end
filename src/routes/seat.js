const express = require('express');

const {
    addSeat,
    getAllSeats,
    getSeat,
    updateSeat,
    deleteSeat
} = require('../controllers/Seat');

const router = express.Router();

//bind route to each request
router.get('/', getAllSeats);
router.get('/:id', getSeat);
router.post('/', addSeat);
router.put('/:id', updateSeat);
router.delete('/:id', deleteSeat);

module.exports = router;