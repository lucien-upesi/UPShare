const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
    req.session.user = req.body.email;
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
    res.send(req.body);
});

router.post('/register', (req, res, next)=>{
   res.send(req.body);
});

module.exports = router;
