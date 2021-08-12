const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const category = require('./modules/filter')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/users', users)
router.use('/category', category)
router.use('/records', authenticator, records)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
