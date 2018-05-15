const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const strings = require('../../config/strings')
const User = require('../../model/DAO/User')

router.use((req, res, next) => {
  jwt.verify(req.header(strings.headerTokenName), strings.secretJWT, function (err, decoded) {
    if (err) {
      res.status(403)
      res.send('You don\'t have the permission')
    } else {
      new User().get(decoded.user).then(result => {
        res.locals.user = result
        next()
      })
    }
  })
})

module.exports = router
