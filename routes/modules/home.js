const express = require('express')
const Category = require('../../models/category')
const Month = require('../../models/month')
const router = express.Router()
const Record = require('../../models/record')
const compareValues = require('../../public/function')

let monthList = []

router.get('/', async (req, res) => {
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
          year: { $substr: ['$date', 0, 4] },
          month: { $substr: ['$date', 5, 2] }
        }
      },
      {
        $match: {
          userId: req.user._id
        }
      }
    ])
    // 比對月份
    const monthData = await Month.find().lean()
    monthList = [] // 清除資料以防重新PUSH
    records.forEach((record) => {
      monthData.find((item) => {
        if (item.nameInAlpha === record.month) {
          monthList.push(item)
        }
      }
      )
    })
    monthList = [...new Set(monthList)].sort(compareValues('nameInAlpha'))

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
      records,
      monthList
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/', async (req, res) => {
  const keyword = req.body.categories === '類別' ? { $ne: '' } : req.body.categories
  const month = req.body.month === '月份' ? { $ne: '' } : req.body.month
  console.log('keyword:', keyword, typeof (keyword), '----month', month)
  try {
    // 全部資訊
    const records = await Record.aggregate([
      {
        $project: {
          userId: 1,
          id: 1,
          name: 1,
          date: 1,
          amount: 1,
          year: { $substr: ['$date', 0, 4] },
          month: { $substr: ['$date', 5, 2] },
          category: 1
        }
      },
      {
        $match: {
          userId: req.user._id,
          month: month,
          category: keyword
        }
      }
    ])

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
      records,
      monthList,
      keyword
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
