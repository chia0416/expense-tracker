const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  console.log("Created page opened");
    Category.findOne({ name: req.body.category })
      .lean()
      .then((category) => {
        Record.create({
          name: req.body.name,
          date: req.body.date,
          category: req.body.category,
          amount: req.body.amount,
          categoryIcon: category.icon,
        });
      })
      .then(res.redirect("/"))
      .catch((error) => console.log(error))
});

module.exports = router;
