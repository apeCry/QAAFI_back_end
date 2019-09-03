const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

// let counter = 1;
// let CountedId = {type: Number, default: () => counter++};

const schema = new mongoose.Schema({
    _id: {
      type: String,
      uppercase: true,
      alias: 'code' // virtual `code` property
    },

    description: {
      type: String,
      default: '',
      required: true
    },
    //seekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
    __v: { type: Number, select: false }
  },
  {
    timestamps: true, // show timestamp
    toJSON: {
      virtuals: true // required to show 'code' property
    },
    id: false // hide `id` virtual property
  }
);

const model = mongoose.model('Seat', schema);

module.exports = model;