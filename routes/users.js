const express = require('express')
const router = express.Router()
const crud = require('./CRUD')
const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const checkTable = require('./utils/checkTable')

const secretJWT = 'Y}MYW<VwzYP8G/Y2'
const headerTokenName = 'jwt-token'
const saltrounds = 11

router.use(checkTable)

router.get('/', (req, res) => {
  db.query(`SELECT user_email, user_id, user_last_name, user_first_name, user_birthday, user_ctry FROM ${res.locals.table}`, (err, results) => {
    if (err) {
      res.send(err.message)
    } else {
      res.json(results[0])
    }
  })
})

router.put('/', (req, res) => {
  bcrypt.hash(res.locals.body[res.locals.prefix + '_password'], saltrounds, (err, hash) => {
    if (err) {
      res.send(err.message)
    } else {
      res.locals.body[res.locals.prefix + '_password'] = hash
      db.query(`INSERT INTO ${res.locals.table} SET ?`, res.locals.body, (err, result) => {
        if (err) {
          res.send({error: err.message})
        } else {
          console.log(result)
          res.json({id: result.insertId.toString()})
        }
      })
    }
  })
})

router.use(crud)

router.get('/byJWT/:token', (req, res) => {
  jwt.verify(req.params.token, secretJWT, function (err, decoded) {
    if (err) {
      res.send(err.message)
    } else {
      db.query(`SELECT user_email, user_id, user_last_name, user_first_name, user_birthday, user_ctry FROM ${res.locals.table} WHERE user_id = ?`, [decoded.user], (err, results) => {
        if (err) {
          res.send(err.message)
        } else {
          res.json(results[0])
        }
      })
    }
    // do query
    // return user
  })
})

router.post('/login', (req, res) => {
  console.log(req.body)
  db.query(`SELECT user_id as id, user_password as password FROM ${res.locals.table} WHERE user_email = ?`, [req.body.email], (err, result) => {
    if (err) {
      res.send(err.message)
    } else {
      bcrypt.compare(req.body.password, result[0].password, (err, valid) => {
        if (err) {
          res.send(err.message)
        } else {
          if (valid) {

            db.query(`SELECT user_id as id, user_email as email, user_birthday as birthday, user_first_name as firstName, user_last_name as lastName, user_ctry as ctry FROM ${res.locals.table} WHERE user_email = ?`, [req.body.email], (err, result) => {
              if(err) {
                res.send(err.message)
              } else {
                  const token = jwt.sign({user: result[0].id}, secretJWT, {expiresIn: '7d'})
                  const date = new Date(jwt.decode(token).exp * 1000)
                  date.setHours(date.getHours() + 2)

                  res.send({jwt: token, expire: date.toUTCString(), user: result[0]})
              }
            })
          } else {
            res.send({error: 'invalid password'})
          }
        }
      })
    }
  })
})

// need be logged after this
router.use((req, res, next) => {
  jwt.verify(req.header(headerTokenName), secretJWT, function (err, decoded) {
    if (err) {
      res.status(403)
      res.send('You don\'t have the permission')
    } else {
      // do query get user
      // res.locals.user = response
      next()
    }
  })
})

module.exports = router
