const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.post("/", (req, res) => {
  const keyword = req.body.keyword;

  let totalAmount = 0;
  console.log(req.body);
  Record.find({
    $or: [
      {
        category: keyword,
      },
      {
        name: { $regex: keyword, $options: "i" }
      },
    ]
  })
    .lean()
    .then((records) => {
      records.forEach((record) => (totalAmount += record.amount));
      res.render("index", { records, totalAmount });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
