const express = require('express');
const router = express.Router();
const countries = require('../public/country.json');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.get('/signin', (req, res, next)=> {
    res.render('signin', { title: 'SignIn', csrfToken: req.csrfToken()});
});

router.get('/register', (req, res, next)=> {
    res.render('register', { title: 'Register', csrfToken: req.csrfToken(), countries: countries});
});

router.get('/files', (req, res, next)=> {
    res.render('files', { title: 'Files', csrfToken: req.csrfToken()});
});

module.exports = router;
