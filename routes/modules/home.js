const express = require('express')
const Category = require('../../models/category')
const record = require('../../models/record')
const router = express.Router()
const Record = require('../../models/record')
const compareValues = require('../../public/function')

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
          amount: 1,
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          year: { $year: "$date" },
          month: { $month: "$date" }
        }
      },
      {
        $match: {
          userId: req.user._id
        }
      }
    ])
    // 取出月份
    let monthList = Array.from(records, record => record.month)
    // 取出不重覆月份
    monthList = monthList.filter((element, index, arr) => {
      return arr.indexOf(element) === index
    })
    // 排序
    monthList = monthList.sort((a, b) => a - b)

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
  const month = req.body.month === '月份' ? { $ne: '' } : Number(req.body.month)
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
          merchant: 1,
          category: 1,
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          year: { $year: "$date" },
          month: { $month: "$date" }
        }
      },
      {
        $match: {
          userId: req.user._id,
          month: month,
          category: keyword,
        }
      }
    ])

    let monthList = Array.from(records, record => record.month)
    // 取出不重覆月份
    monthList = monthList.filter((element, index, arr) => {
      return arr.indexOf(element) === index
    })
    // 排序
    monthList = monthList.sort((a, b) => a - b)

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
