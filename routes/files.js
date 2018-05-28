const express = require('express')
const router = express.Router()
const multer = require('multer')
const crypto = require('crypto')
const needAuth = require('./utils/needAuth')
const File = require('../model/DAO/File')
const strings = require('../config/strings')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = JSON.parse(req.body.extras).id
    const ownerPath = `${strings.uploadPath}/${id}/`
    fs.mkdir(ownerPath, 0o777, (err) => {
      if (err) {
        if (err.code === 'EEXIST') cb(null, ownerPath)
        else console.log(err)
      } else cb(null, ownerPath)
    })
  },
  filename: function (req, file, cb) {
    cb(null, crypto.createHash('md5').update(Math.random().toString()).digest('hex') + file.originalname)
  }
})

const upload = multer({storage: storage})

const unauthType = ['ini']

router.use(needAuth)

router.put('/', upload.array('files[]'), (req, res) => {
  const rejectedFiles = []
  for (let i = 0; i < req.files.length; i++) {
    let ext = req.files[i].originalname.lastIndexOf('.') + 1
    if (unauthType.indexOf(req.files[i].originalname.substring(ext)) > -1) {
      rejectedFiles.push(req.files[i])
    } else {
      // new File().put({
      //   file_type: ext,
      //   owner_id: res.locals.user.user_id,
      //   file_folder: 0,
      //   file_deleted: 0
      // })
    }
  }
  if (rejectedFiles.length > 0) {
    res.json({rejectedFiles: rejectedFiles.length, files: rejectedFiles})
  } else res.json({success: 1})
})

module.exports = router
