const express = require('express')
const router = express.Router()

const table = [
  {name: 'user', prefix: 'user'},
  {name: 'file', prefix: 'file'},
  {name: 'team', prefix: 'team'}
]

router.use((req, res, next) => {
  const queryTableName = req.baseUrl.substring(1, req.baseUrl.length - 1)

  for (let i = 0; i < table.length; i++) {
    if (table[i].name === queryTableName) {
      res.locals.table = table[i].name
      res.locals.prefix = table[i].prefix
      break
    }
  }

  if (res.locals.table !== undefined) {
    res.locals.body = {}

    for (let [key, value] of Object.entries(req.body)) {
      let result = res.locals.prefix + '_' + key
      res.locals.body[result] = value
    }
    next()
  } else {
    res.status(404)
    res.send('Not authorized')
  }
})

module.exports = router
