const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String, 
    required: true, 
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    min: 0,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    required: true,
  },
});

module.exports = mongoose.model("Record", recordSchema);