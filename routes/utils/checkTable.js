const express = require('express');
const router = express.Router();

const table = [
    'contains',
    'country',
    'file',
    'grade',
    'grade_team_user',
    'team',
    'team_file',
    'user'
];

router.use((req, res, next)=>{

    const queryTableName = req.baseUrl.substring(1, req.baseUrl.length-1);

    for (let i = 0; i < table.length; i++) {
        if (table[i] === queryTableName) {
            res.locals.table = queryTableName;
            break
        }
    }

    if (res.locals.table !== undefined) {

        res.locals.body = {};

        console.log(res.locals.table);
        for (let [key, value] of Object.entries(req.body)) {

            let result = res.locals.table + "_" + key;
            res.locals.body[result] = value;
        }
        console.log(res.locals.body);
        next()
    } else {
        res.status(404);
        res.send('Dégage');
    }
});

module.exports = router;