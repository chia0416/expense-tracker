const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

// 設定首頁路由
router.get("/", (req, res) => {
  let totalAmount = 0;
  return Record.find()
    .lean()
    .then((records) => {
      records.forEach((item) => {
        totalAmount += item.amount;
      });
      res.render("index", { records, totalAmount });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
