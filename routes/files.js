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
    file.file_id = crypto.randomBytes(8).toString('hex')
    cb(null, file.file_id + file.originalname.substring(file.originalname.lastIndexOf('.')))
  }
})

const upload = multer({storage: storage})

const unauthType = ['ini']

router.use(needAuth)

router.put('/', upload.array('files[]'), async (req, res) => {
  const rejectedFiles = []
  const addedFiles = []
  const extras = JSON.parse(req.body.extras)
  for (let i = 0; i < req.files.length; i++) {
    let ext = req.files[i].originalname.substring(req.files[i].originalname.lastIndexOf('.') + 1)
    if (unauthType.indexOf(ext) > -1) {
      rejectedFiles.push(req.files[i])
    } else {
      let file = await new File().put({
        file_id: req.files[i].file_id,
        file_type: ext,
        owner_id: res.locals.user.user_id,
        file_name: req.files[i].originalname,
        file_folder: 0
      })
      if (file.file_id) {
        addedFiles.push(file)
        if (extras.inFolder) {
          await new File().putIntoFolder(extras.inFolder, file.file_id)
        }
      } else rejectedFiles.push(req.files[i])
    }
  }
  res.json({success: addedFiles, error: rejectedFiles})
})

router.put('/folder', (req, res) => {
  new File().put({
    owner_id: res.locals.user.user_id,
    file_name: req.body.file_name,
    file_folder: 1
  }).then(folder => {
    if (req.body.inFolder) {
      return new File().putIntoFolder(req.body.inFolder, folder.file_id)
    }
  }).then(folder => res.json(folder))
    .catch(e => res.json({error: e.toString()}))
})

router.get('/:id([a-z0-9+]{16})', (req, res) => {
  new File().get(req.params.id).then(async file => {
    if (file.file_folder) {
      const files = await new File().folderContents(req.params.id)
      res.json(files)
    } else {
      const src = `${strings.uploadPath}/${res.locals.user.user_id}/${file.file_id}.${file.file_type}`
      res.sendFile(src)
    }
  })
})

module.exports = router
