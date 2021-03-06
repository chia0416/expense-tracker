const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

/// /new>>
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  Record.create({
    name,
    category,
    date,
    amount,
    merchant,
    userId
  })
    .then(() => {
      res.redirect('/')
    })
    .catch((e) => console.log(e))
})

// 修改頁面
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => console.log(error))
})

// post("/edit/:id"
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, category, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 刪除頁面post("/delete/:id"
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
