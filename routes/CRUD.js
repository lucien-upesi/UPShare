const express = require('express');
const router = express.Router();
const db = require('../config/db');
//
router.use((req, res, next)=>{
    res.locals.table = req.baseUrl.substring(1, req.baseUrl.length-1);
    next()
});

router.get('/',  (req, res)=> {
    db.query(`SELECT * FROM ${res.locals.table}`, (err, results)=>{
        if (err) throw err;
        res.json(results);
    })

});

router.put('/', (req, res)=>{
    db.query(`INSERT INTO ${res.locals.table} SET ?`, req.body, (error, results)=> {
        if (error) throw error;
        res.json({id: results.insertId.toString()});
    });
});

router.post('/:id', (req, res)=>{
    db.query(`UPDATE ${res.locals.table} SET ? WHERE ${res.locals.table}_id = ?`, [req.body, req.params.id], (err, results)=>{
        if (err) throw err;
        res.json({id: results.insertId.toString()})
    } )
});

router.delete('/:id', (req, res)=>{
    db.query(`DELETE FROM ${res.locals.table} WHERE ${res.locals.table}_id = ?`, req.params.id, (err, results)=>{
        if (err) throw err;
        res.json({id: results.insertId.toString()})
    } )
});

module.exports = router;
