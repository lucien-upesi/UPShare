const express = require('express')
const router = express.Router()

const checkTable = require('./utils/checkTable')
const Team = require('../model/DAO/Team')
const needAuth = require('./utils/needAuth')

router.use(needAuth)

router.get('/', (req, res) => {
  new Team().getAll().then(teams => {
    console.log(teams)
    res.json(teams)
  }).catch(e => console.log(e))
})

router.put('/', (req, res) => {
  new Team().put(req.body).then(team => res.json(team))
})

router.post('/:id', (req, res) => {
  new Team().update(req.params.id, req.body).then(team => res.json(team))
})

module.exports = router
