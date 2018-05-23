const express = require('express')
const router = express.Router()
const crud = require('./CRUD')

router.use(crud)

module.exports = router
