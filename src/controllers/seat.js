const Seat = require('../models/seat');

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
    const seat = await Seat.findById(code);

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

    return res.json(seat);
}

module.exports = {
  addSeat,
  getAllSeats,
  getSeat,
  updateSeat,
  deleteSeat
};