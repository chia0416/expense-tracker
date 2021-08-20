if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Month = require('../month')

db.once('open', () => {
  Month.create(
    {
      nameInChinese: '一月',
      nameInAlpha: '01'
    },
     {
      nameInChinese: '二月',
      nameInAlpha: '02'
    },
    {
      nameInChinese: '三月',
      nameInAlpha: '03'
    },
    {
      nameInChinese: '四月',
      nameInAlpha: '04'
    },
    {
      nameInChinese: '五月',
      nameInAlpha: '05'
    },
    {
      nameInChinese: '六月',
      nameInAlpha: '06'
    },
    {
      nameInChinese: '七月',
      nameInAlpha: '07'
    },
    {
      nameInChinese: '八月',
      nameInAlpha: '08'
    },
    {
      nameInChinese: '九月',
      nameInAlpha: '09'
    },
    {
      nameInChinese: '十月',
      nameInAlpha: '10'
    },
    {
      nameInChinese: '十一月',
      nameInAlpha: '11'
    },
    {
      nameInChinese: '十二月',
      nameInAlpha: '12'
    },    
  ).then(() => {
    console.log('Month done!')
    return db.close()
  })
})
