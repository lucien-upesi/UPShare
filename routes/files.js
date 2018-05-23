const express = require('express')
const router = express.Router()
const uploadPath = '/var/www/html/upshare/uploads/'
const multer = require('multer')
const crypto = require('crypto')
const needAuth = require('./utils/needAuth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, crypto.createHash('md5').update(Math.random().toString()).digest('hex') + file.originalname)
  }
})

const upload = multer({storage: storage})

const unauthType = ['ini']

router.use(needAuth)

router.put('/', upload.array('files'), (req, res) => {
  if (!unauthType.indexOf(req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1)) > -1) {
    console.log(req)
  } else res.send({error: 'format non valid'})
})

module.exports = router
