const express = require('express')
const Category = require('../../models/category')
const Month = require('../../models/month')

const router = express.Router()
const Record = require('../../models/record')

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
          year: {$substr:["$date",0,4]},
          month: {$substr:["$date",5,2]},
        },
      },
      {
        $match: {
        userId: req.user._id,
        }
      }, 
    ])
    //比對月份
    let monthList = []
    const monthData = await Month.find().lean()
    records.forEach((record,index) => {
      monthData.find((item) => {
       if ( item.nameInAlpha === record.month ){
         monthList.push(item)
       }
      })
    })
    monthList = [...new Set(monthList)] 
    console.log('------',monthList)
  
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

module.exports = router
