const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthSchema = new Schema({
  nameInChinese: String,
  nameInAlpha: String
})

module.exports = mongoose.model('Month', monthSchema)
