const Student = require('../models/student');

async function addStudent(req, res) {
    const {firstName, lastName, dob, email, phone} = req.body;
    const student = new Student ({
        firstName,
        lastName,
        dob,
        email,
        phone
    });
    await student.save();
    return  res.json(student);
}

async function getStudent(req, res) {
    const {id} = req.params;
    const student = await Student.findById(id);

    if (!student) {
        return res.status(404).json('student not found');
    }

    return res.json(student);
}

async function getAllStudents(req, res) {
    const students = await Student.find().exec();
    return  res.json(students);
}

function updateStudent(req, res) {}

function deleteStudent(req, res) {}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent
};