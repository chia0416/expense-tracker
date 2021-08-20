const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.post('/category', async (req, res) => {
  const keyword = req.body.keyword
  try {
    // 選取資訊
    const records = await Record.aggregate([
      {
        $project: {
          userId: 1,
          id: 1,
          name: 1,
          category: 1,
          date: 1,
          amount: 1,
        }
      },
      {
        $match: {
          userId: req.user._id, 
          $or: [
            { category: keyword },
            { name: { $regex: keyword, $options: 'i' }},
          ],
         
        }
      }
    ])
    if(keyword === '全部類別'){
      return res.redirect('/')
    }
    console.log(records)
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

router.post('/date', async (req, res) => {
  const month = req.body.month
  try {
    // 選取資訊
    const records = await Record.aggregate([
      {
        $project: {
          userId: 1,
          id: 1,
          name: 1,
          category: 1,
          amount: 1,
          date:1,
          year: {$substr:["$date",0,4]},
          month: {$substr:["$date",5,2]},
        }
      },
      {
        $match: {
         month: month,
         userId: req.user._id
        }
      }
    ])
    console.log(month)
    if (month === "全部月份"){
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
