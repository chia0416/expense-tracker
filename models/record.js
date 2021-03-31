const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
  },
  categoryIcon:{
    type: String,
  },
  amount: {
    type: Number,
    min: 0,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

module.exports = mongoose.model("Record", recordSchema);
