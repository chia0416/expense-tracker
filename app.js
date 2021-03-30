const express = require('express');
const exphbs = require('express-handlebars')
require('./config/mongoose')

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
  })

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
  })