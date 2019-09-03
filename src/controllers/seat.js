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

function updateSeat(req, res) {}

function deleteSeat(req, res) {}

module.exports = {
  addSeat,
  getAllSeats,
  getSeat,
  updateSeat,
  deleteSeat
};