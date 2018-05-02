const express = require('express')
const router = express.Router()
const countries = require('../public/country.json')
const db = require('../config/db')

/* GET home page. */
router.get('/', (req, res) => {
  res.send('home')
})

router.get('/signin', (req, res, next) => {
  res.render('user/signin', { title: 'Sign In', csrfToken: req.csrfToken()})
})

router.get('/register', (req, res, next) => {
  res.render('user/register', { title: 'Register', csrfToken: req.csrfToken(), countries: countries})
})

router.get('/account', (req, res, next) => {
  res.render('user/account', { title: 'Account', csrfToken: req.csrfToken(), countries: countries})
})

router.get('/files', (req, res, next) => {
  res.render('main_view/main', { title: 'Files', csrfToken: req.csrfToken()})
})

router.get('/groups', (req, res, next) => {
  res.render('main_view/main', { title: 'Groups', csrfToken: req.csrfToken()})
})

router.get('/help', (req, res, next) => {
  res.render('main_view/main', { title: 'Help', csrfToken: req.csrfToken()})
})

router.get('/sandbox/:view', (req, res, next) => {
  res.render('sandbox/' + req.params.view, { title: req.params.view, csrfToken: req.csrfToken()})
})

router.get('/get', function (req, res, next) {
  res.send('got it')
})

router.post('/post', function (req, res, next) {
  console.log(req.body)

  res.send('posted')
})

router.get('/init', (req, res) => {
  for (let item of Object.entries(countries)) {
    // console.log(item[1].Code)
    db.query('INSERT INTO country SET ?', {ctry_id: item[1].Code, ctry_name: item[1].Name}, (err, result) => {
      if (err) throw err
    })
  }
  res.send('success')
})

// router.get('/modal', (req, res, next)=>{
//
// });

module.exports = router
