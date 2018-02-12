const express = require('express');
const router = express.Router();
const countries = require('../public/country.json');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'UpShare' });
});

router.get('/signin', (req, res, next)=> {
    res.render('user/signin', { title: 'SignIn', csrfToken: req.csrfToken()});
});

router.get('/register', (req, res, next)=> {
    res.render('user/register', { title: 'Register', csrfToken: req.csrfToken(), countries: countries});
});

router.get('/account', (req, res, next)=> {
    res.render('user/account', { title: 'Account', csrfToken: req.csrfToken(), countries: countries});
});

router.get('/files', (req, res, next)=> {
    res.render('main_view/layout_main', { title: 'Files', csrfToken: req.csrfToken()});
});

router.get('/groups', (req, res, next)=> {
    res.render('main_view/layout_main', { title: 'Groups', csrfToken: req.csrfToken()});
});

router.get('/help', (req, res, next)=> {
    res.render('main_view/layout_main', { title: 'Help', csrfToken: req.csrfToken()});
});

module.exports = router;
