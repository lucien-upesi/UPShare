const express = require('express')
const router = express.Router()
const db = require('../config/db')
//

router.get('/', (req, res) => {
  db.query(`SELECT * FROM ${res.locals.table}`, (err, results) => {
    if (err) {
      res.send({error: err.message})
    } else {
      res.json(results[0])
    }
  })
})

router.put('/', (req, res) => {
  db.query(`INSERT INTO ${res.locals.table} SET ?`, req.body, (err, results) => {
    if (err) {
      res.send({error: err.message})
    } else {
      res.json({id: results.insertId.toString()})
    }
  })
})

router.post('/:id(^[\\da-z]{16}$)', (req, res) => {
  db.query(`UPDATE ${res.locals.table} SET ? WHERE ${res.locals.prefix}_id = ?`, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.send({error: err.message})
    } else {
      res.json({id: req.params.id})
    }
  })
})

router.delete('/:id', (req, res) => {
  db.query(`DELETE FROM ${res.locals.table} WHERE ${res.locals.prefix}_id = ?`, req.params.id, (err, results) => {
    if (err) {
      res.send({error: err.message})
    } else {
      res.json({id: req.params.id})
    }
  })
})

module.exports = router
