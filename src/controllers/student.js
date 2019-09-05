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

async function updateStudent(req, res) {
    const { id } = req.params;
    const { firstName, lastName, dob, email, phone } = req.body;
    const newStudent = await Student.findByIdAndUpdate(
        id,
        { firstName, lastName, dob, email, phone },
        {
        new: true // return the updated object
        // runValidators: true // run validator against new value
        }
    );
    if (!newStudent) {
        return res.status(404).json('student not found');
    }
    return res.json(newStudent);
}

async function deleteStudent(req, res) {
    const {id} = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
        return res.status(404).json('student not found');
    }

    return res.json(student);
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent
};