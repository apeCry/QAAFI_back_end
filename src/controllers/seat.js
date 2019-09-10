const Seat = require('../models/seat');
const Student = require('../models/student');

async function addSeat(req, res) {
    const {code, description} = req.body;
    const seat = new Seat ({
        code,
        description
    })
    await seat.save();
    return  res.json(seat);
}

async function getSeat(req, res) {
    const {id: code} = req.params;
    const seat = await Seat.findById(code).populate('students');

    if (!seat) {
        return res.status(404).json('seat not found');
    }

    return res.json(seat);
}

async function getAllSeats(req, res) {
    const seats = await Seat.find().exec();
    return  res.json(seats);
}

async function updateSeat(req, res) {
    const { id: code } = req.params;
    const { description } = req.body;
    const newSeat = await Seat.findByIdAndUpdate(
        code,
        { description },
        {
        new: true // return the updated object
        // runValidators: true // run validator against new value
        }
    );
    if (!newSeat) {
        return res.status(404).json('seat not found');
    }
    return res.json(newSeat);
}

async function deleteSeat(req, res) {
    const {id: code} = req.params;
    const seat = await Seat.findByIdAndDelete(code);

    if (!seat) {
        return res.status(404).json('seat not found');
    }
    await Student.updateMany(
        {
            _id: { $in: seat.students }
        },
        {
            $pull: {
                seats: seat._id
            }
        }
    );
    return res.json(seat);
}

async function addStudent(req, res) {
    const {id, code} = req.params;

    const student = await Student.findById(id);
    const seat = await Seat.findById(code);

    if (!student || !seat) {
        return res.status(404).json('student or seat not found');
    }

    seat.students.addToSet(student._id);
    student.seats.addToSet(seat._id);
    await student.save();
    await seat.save();
    return res.json(seat);
}

async function deleteStudent(req, res) {
    const {id, code} = req.params;
    const student = await Student.findById(id);
    const seat = await Seat.findById(code);

    if (!student || !seat) {
        return res.status(404).json('student or seat not found');
    }

    const lengthBeforePull = seat.students.length;
    //console.log(lengthBeforePull);
    seat.students.pull(student._id);
    const lengthAfterPull = seat.students.length;
    //console.log(lengthAfterPull);

    if (lengthBeforePull === lengthAfterPull) {
        return res.status(404).json('seat does not contain this student');
    }

    await seat.save();
    return res.json(seat);
}


module.exports = {
  addSeat,
  getAllSeats,
  getSeat,
  updateSeat,
  deleteSeat,
  addStudent,
  deleteStudent,
};
