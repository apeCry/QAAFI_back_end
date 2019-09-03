const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    //minlength: 2
  },
  lastName: {
    type: String,
    required: true
  },
  dob:{
    type:Date,
    required:true
  },
  email: {
    type: String,
    required: true,
    // validate: {
    //   validator: email => !Joi.validate(email, Joi.string().email()).error,
    //   msg: 'Invalid email format'
    // }
  },
  phone:{
    type: String,
    required:true
  },
});

const model = mongoose.model('Student', schema);

module.exports = model;