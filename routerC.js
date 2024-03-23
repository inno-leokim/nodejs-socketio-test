const express = require('express');
const router = express.Router();

router.get('/index', (req, res) => {
    res.status(200).send(`<h1>C index</h1>`);
});

module.exports = router;