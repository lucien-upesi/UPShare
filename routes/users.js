const express = require('express')
const router = express.Router()

const checkTable = require('./utils/checkTable')
const User = require('../model/DAO/User')
const needAuth = require('../routes/utils/needAuth')

router.use(checkTable)

router.get('/:id', (req, res) => {
  new User().get(req.params.id).then(response => {
    res.json(response)
  })
})

router.put('/', (req, res) => {
  new User().put(req.body).then(response => {
    res.json(response)
  })
})

// router.use(crud)

router.get('/byJWT/:token', (req, res) => {
  new User().getByJWT(req.params.token).then(response => res.json(response))
})

router.post('/login', (req, res) => {
  new User().login(req.body.email, req.body.password).then(response => {
    res.json(response)
  })
})

// need be logged after this
router.use(needAuth)

router.post('/changePassword', (req, res) => {
  new User().changePwd(req.body.oldpwd, req.body.pwd, req.body.repwd, res.locals.user.user_id).then(response => {
    res.json(response)
  })
})

router.post('/:id', (req, res) => {
  new User().update(req.body.pwd, res.locals.user.user_id, req.body.user).then(response => {
    res.json(response)
  }).catch( (error) => {

      res.json({error: error.message})
    })
})

module.exports = router
