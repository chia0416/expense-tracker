const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.post('/', async (req, res) => {
  const keyword = req.body.keyword
  try {
    // 選取資訊
    const records = await Record.aggregate([
      {
        $project: {
          id: 1,
          name: 1,
          category: 1,
          date: 1,
          amount: 1
        }
      },
      {
        $match: {
          $or: [
            {
              category: keyword
            },
            {
              name: { $regex: keyword, $options: 'i' }
            }
          ]
        }
      }
    ])
    if(keyword === '全部類別'){
      return res.redirect('/')
    }
    // 比對icon並新增iconName
    const categories = await Category.find().lean()
    records.forEach((record) => {
      record.iconName = categories.find(
        (item) => item.name === record.category
      ).icon
    })
    // 算總金額
    let totalAmount = 0
    records.forEach((record) => {
      totalAmount += record.amount
    })

    return res.render('index', {
      totalAmount,
      records
    })
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
