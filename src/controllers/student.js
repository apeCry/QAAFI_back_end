const Student = require('../models/student');
const Seat = require('../models/seat');

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
    const student = await Student.findById(id).populate('seats');  //show all the information of seats

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

    await Seat.updateMany (
        { _id: {$in: student.seats}},
        { $pull: { students: student._id} }
    );

    return res.json(student);
}

async function addSeat(req, res) {
    const {id, code} = req.params;
    const student = await Student.findById(id);
    const seat = await Seat.findById(code);

    if (!student || !seat) {
        return res.status(404).json('student or seat not found');
    }

    student.seats.addToSet(seat._id);
    seat.students.addToSet(student._id);
    await student.save();
    await seat.save();
    return res.json(student);
}

async function deleteSeat(req, res) {
    const {id, code} = req.params;
    const student = await Student.findById(id);
    const seat = await Seat.findById(code);

    if (!student || !seat) {
        return res.status(404).json('student or seat not found');
    }

    const lengthBeforePull = student.seats.length;
    student.seats.pull(seat._id);
    const lengthAfterPull = student.seats.length;

    if (lengthBeforePull === lengthAfterPull) {
        return res.status(404).json('student does not have this seat');
    }

    await student.save();
    return res.json(student);
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  addSeat,
  deleteSeat,
};