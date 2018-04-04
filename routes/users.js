const express = require('express');
const router = express.Router();
const crud = require('./CRUD');
const db = require('../config/db');

router.get('/',  (req, res)=> {
    db.query(`SELECT user_email FROM user`, (err, results)=>{
        if (err) throw err;
        res.json(results);
    })

});

router.use(crud);

router.post('/login', (req, res, next) => {
    //handle login
});



module.exports = router;
