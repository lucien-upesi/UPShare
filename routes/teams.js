const express = require('express')
const router = express.Router()
// const checkTable = require('./utils/checkTable')
const Team = require('../model/DAO/Team')
const User = require('../model/DAO/User')
const needAuth = require('./utils/needAuth')
const mail = require('../model/mail/mail')

router.get('/', (req, res) => {
  new Team().getAll().then(teams => res.json(teams)).catch(e => console.log(e))
})

router.use(needAuth)

router.put('/', (req, res) => {
  new Team().put(req.body, res.locals.user.user_id)
    .then(team => {
      return new User().getTeam(res.locals.user.user_id, team.team_id)
    })
    .then(team => res.json(team))
    .catch(e => console.log(e))
})

router.post('/:id([a-z0-9+]{16})', (req, res) => {
  new Team().update(req.params.id, {team_name: req.body.team_name}).then(team => res.json(team)).catch(e => console.log(e))
})
router.post('/:id([a-z0-9+]{16})/inviteMember', (req, res) => {
  new User().get(req.body.user_email)
    .then(user => new User().inviteInTeam(user.user_id, req.params.id))
    .then(token => {
      mail.message.to = req.body.user_email
      mail.message.subject = `You have been invite to join ${req.body.team_name}`
      mail.message.html = `<p>Hello,<br>${res.locals.user.user_first_name} ${res.locals.user.user_last_name} invite you to join ${req.body.team_name}<br>
        To join the team click on the following <a href="${mail.url}/invitation/${req.params.id}/${token}">LINK</a></p>`
      return mail.send()
    })
    .then(() => res.json({success: 1}))
    .catch(e => console.log(e))
})

router.delete('/:id([a-z0-9+]{16})/', (req, res) => {
  new Team().erase(req.params.id).then(id => res.json(id)).catch(e => console.log(e))
})

module.exports = router
