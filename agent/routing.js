const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended: false});

const { buildHandler } = require('./controllers');

router.post('/build', jsonParser, buildHandler);

module.exports = router;
