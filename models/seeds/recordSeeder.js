if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

const RecordList = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: Date.now(),
    amount: '80',
    merchant: '美而美'
  },
  {
    name: '捷運',
    category: '交通出行',
    date: Date.now(),
    amount: '60'
  },
  {
    name: '電影:金剛大戰哥吉拉',
    category: '休閒娛樂',
    date: Date.now(),
    amount: '120'
  },
  {
    name: '租金',
    category: '家居物業',
    date: Date.now(),
    amount: '8000'
  },
  {
    name: '學費',
    category: '其他',
    date: Date.now(),
    amount: '10000',
    merchant: 'Alphacamp'
  }]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: RecordList.length },
        (_, i) => Record.create({
          name: RecordList[i].name,
          category: RecordList[i].category,
          date: RecordList[i].date,
          amount: RecordList[i].amount,
          merchant: RecordList[i].merchant,
          userId
        })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(error => console.log(error))
})
