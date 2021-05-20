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


    records.forEach((record ) =>  {
      categories.find((item) => {
        if(item.name === record.category){
        record.iconName = item.icon
        }    
      })
    });
    
    //算總金額
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return res.render("index", {
      totalAmount,
      records,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
