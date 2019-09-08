const express = require('express');

const {
    addSeat,
    getAllSeats,
    getSeat,
    updateSeat,
    deleteSeat,
    addStudent,
    deleteStudent
} = require('../controllers/Seat');

const router = express.Router();

//bind route to each request
router.get('/', getAllSeats);
router.get('/:id', getSeat);
router.post('/', addSeat);
router.put('/:id', updateSeat);
router.delete('/:id', deleteSeat);
router.post('/:code/students/:id', addStudent);
router.delete('/:code/students/:id', deleteStudent);

module.exports = router;