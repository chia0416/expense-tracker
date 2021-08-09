const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  Record.create(
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2021-03-20',
      amount: '80'
    },
    {
      name: '捷運',
      category: '交通出行',
      date: '2021-03-20',
      amount: '60'
    },
    {
      name: '電影:金剛大戰哥吉拉',
      category: '休閒娛樂',
      date: '2021-03-20',
      amount: '120'
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2021-03-10',
      amount: '8000'
    },
    {
      name: '學費',
      category: '其他',
      date: '2021-03-20',
      amount: '10000'
    }
  ).then(() => {
    console.log('recodeSeeder Done!')
    return db.close
  })
})
