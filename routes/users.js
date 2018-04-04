const express = require('express');
const router = express.Router();
const crud = require('./CRUD');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const secretJWT = 'Y}MYW<VwzYP8G/Y2';
const headerTokenName = 'jwt-token';
const saltrounds = 11

router.get('/', (req, res) => {
    db.query(`SELECT user_email FROM user`, (err, results) => {
        if (err) throw err;
        res.json(results);
    })

});

router.put('/', (req, res) => {
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        // Store hash in your password DB.
    });

});

router.use(crud);

router.get('/byJWT/:token', (req, res) => {

    jwt.verify(req.params.token, secretJWT, function (err, decoded) {
        if (err) throw err;
        // do query
        // return user
    });


})

router.post('/login', (req, res) => {
    // do query

    bcrypt.compare(req.body.password, queryresult, (err, valid) => {
        if (valid){
            // send token
            const token = jwt.sign({user: response.id}, secretJWT, {expiresIn: '7d'});
            const date = new Date(jwt.decode(token).exp * 1000);
            date.setHours(date.getHours() + 2);

            res.send({jwt: token, expire: date.toUTCString(), user: response})
        }
        else {
            // handle login error
        }
    })
    // if true generate token below




});

// need be logged after this
router.use((req, res, next) => {
    jwt.verify(req.header(headerTokenName), secretJWT, function(err, decoded) {
        if(err){
            res.status(403)
            res.send('You don\'t have the permission');
        }
        else {
            // do query get user
            //res.locals.user = response
            next()
        }
    });

})




module.exports = router;
