const express = require('express')
const router = express.Router()

const checkTable = require('./utils/checkTable')
const User = require('../model/DAO/User')
const needAuth = require('../routes/utils/needAuth')

router.use(checkTable)

router.get('/:id([a-z0-9+]{16})/', (req, res) => {
  new User().get(req.params.id).then(response => res.json(response))
})

router.put('/', (req, res) => {
  new User().put(req.body).then(response => res.json(response))
})

// router.use(crud)

router.get('/byJWT/:token', (req, res) => {
  new User().getByJWT(req.params.token).then(response => res.json(response))
})

router.post('/login', (req, res) => {
  new User().login(req.body.email, req.body.password).then(response => res.json(response))
})

// need be logged after this
router.use(needAuth)

router.post('/changePassword', (req, res) => {
  new User().changePwd(req.body.oldpwd, req.body.pwd, req.body.repwd, res.locals.user.user_id).then(response => res.json(response)).catch(err => res.json({error: err.toString()}))
})

router.post('/:id([a-z0-9+]{16})/', (req, res) => {
  new User().update(req.body.pwd, res.locals.user.user_id, req.body.user).then(response => res.json(response)).catch(err => res.json({error: err.toString()}))
})

router.get('/teams', (req, res) => {
  new User().getTeams(res.locals.user.user_id).then(teams => res.json(teams)).catch(e => console.log(e))
})

router.post('/join', (req, res) => {
  new User().joinTeam(res.locals.user.user_id, req.body.team_id, req.body.token).then(response => res.json(response)).catch(e => res.json({error: e.toString()}))
})

module.exports = router
