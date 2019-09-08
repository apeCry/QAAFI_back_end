const express = require('express');

const {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    addSeat,
    deleteSeat,
} = require('../controllers/student');

const router = express.Router();

//bind route to each request
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.post('/:id/seats/:code', addSeat);
router.delete('/:id/seats/:code', deleteSeat);


module.exports = router;