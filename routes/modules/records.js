const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

//新增頁面
router.get("/new", (req, res) => {
  res.render("new");
});
////new>>
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
    .catch((error) => console.log(error));
});

//修改頁面
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log("edit page");
  return Record.findById(id)
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((error) => console.log(error));
});
//post("/edit/:id"
router.put("/:id", (req, res) => {
  console.log("edited action");
  const id = req.params.id;
  const { name, date, category, amount } = req.body;
  
  Category.findOne({ name: category })
    .lean()
    .then((categoryModel) => {
      Record.findById(id)
        .then((record) => {
          record.name = name;
          record.date = date;
          record.category = category;
          record.amount = amount;
          record.categoryIcon = categoryModel.icon;
          return record.save();
        })
        .then(() => res.redirect("/"))
        .catch((error) => console.log(error));
    });
});

//刪除頁面post("/delete/:id"
router.delete("/:id", (req, res) => {
  console.log("delete action");
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => record.remove())
    .then(res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
