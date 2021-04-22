const express = require("express");
const Category = require("../../models/category");

const router = express.Router();
const Record = require("../../models/record");

// 設定首頁路由
router.get("/", async (req, res) => {
  try {
    //轉為物件
    let records = await Record.aggregate([
      {
        $project: {
          id: 1,
          name: 1,
          category: 1,
          date: 1,
          amount: 1,
        },
      },
    ]);
    //比對icon並新增iconName
    let categories = await Category.find().lean();
    // let categories = await Category.aggregate([
    //   {
    //   $project: {
    //       name: 1,
    //       icon: 1,
    //     },
    //   },
    // ]);
    let i = 1
    let j = 1
    records.forEach((record , i) => {
      categories.find((item) => {
      if(item.name === record.category){
        record.iconName = item.icon
        return i = 1
      }
      console.log(`A.${i++} + ${record.iconName} + ${Date.now()}`)
      })
      console.log(`B.${j++} + ${record.iconName} + ${Date.now()}`);
      
      // record.iconName = categories.find(
      //   (item) => item.name === record.category
      // ).icon;
    });

    //算總金額
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return res.render("index", {
      categories,
      totalAmount,
      records,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
