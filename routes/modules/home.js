const express = require('express')
const Category = require('../../models/category')

const router = express.Router()
const Record = require('../../models/record')

// 設定首頁路由
router.get('/', async (req, res) => {
  const userId = req.user._id
  const records = Record.find({ userId }).lean()
  const categories = Category.find().lean()

  Promise.all([records, categories])
    .then(results => {
      const [records, categories] = results
      records.forEach(record => {
        categories.find(category => {
          if (category.name === record.category) {
            record.iconName = category.icon
          }
        })
      })
      let totalAmount = 0
      records.forEach((record) => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(e => console.log(e))
})

module.exports = router
