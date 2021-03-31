const express = require('express');
const exphbs = require('express-handlebars')
require('./config/mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
  })