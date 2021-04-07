const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

// 設定首頁路由
router.get("/", (req, res) => {
  let totalAmount = 0;
  /*如果seed的日期是date的話可藉由此方法更改格式,呼叫時需使用Promise*/
  // const record = Record.aggregate([
  //   {
  //     $project: {
  //       name: 1,
  //       date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
  //       category: 1,
  //       categoryIcon: 1,
  //       amount: 1,
  //     },
  //   },
  // ]).exec();

  Record.find().lean()
      .then((records) => {
        records.forEach((item) => {
          totalAmount += item.amount;
        });
        res.render("index", { records, totalAmount });
      })
      .catch((error) => console.error(error));
  });

module.exports = router;
