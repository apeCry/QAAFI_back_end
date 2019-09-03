const express = require('express');

const {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/student');

const router = express.Router();

//bind route to each request
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;