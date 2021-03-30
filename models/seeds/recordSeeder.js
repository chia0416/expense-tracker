const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  Record.create(
    {
      name: "午餐",
      categoryName: "餐飲食品",
      date: "2021/03/20",
      amount: "80",
    },
    {
      name: "捷運",
      categoryName: "交通出行",
      date: "2021/03/20",
      amount: "60",
    },
    {
      name: "電影:金剛大戰哥吉拉",
      categoryName: "休閒娛樂",
      date: "2021/03/20",
      amount: "120",
    },
    {
      name: "租金",
      categoryName: "家居物業",
      date: "2021/03/10",
      amount: "8000",
    },
    {
      name: "掉錢",
      categoryName: "其他",
      date: "2021/03/20",
      amount: "100",
    }
  );

  console.log("Done!");
});

