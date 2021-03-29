const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  Record.create(
    {
      name: "午餐",
      category: "https://fontawesome.com/icons/utensils?style=solid",
      date: "2021/03/20",
      amount: "80",
    },
    {
      name: "捷運",
      category: "https://fontawesome.com/icons/shuttle-van?style=solid",
      date: "2021/03/20",
      amount: "60",
    },
    {
      name: "電影:金剛大戰哥吉拉",
      category: "https://fontawesome.com/icons/grin-beam?style=solid",
      date: "2021/03/20",
      amount: "120",
    },
    {
      name: "租金",
      category: "https://fontawesome.com/icons/home?style=solid",
      date: "2021/03/10",
      amount: "8000",
    },
    {
      name: "掉錢",
      category: "https://fontawesome.com/icons/pen?style=solid",
      date: "2021/03/20",
      amount: "100",
    }
  );

  console.log("Done!");
});

