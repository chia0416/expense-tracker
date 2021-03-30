const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由
router.get('/', (req, res) => {
  Record.find()
  .lean()
  .then(records => res.render('index', {records}))
  .catch(error => console.error(error))
  })

  module.exports = router