const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended: false});

const { notifyAgent, notifyBuildResult } = require('./controllers');

router.post('/notify-agent', jsonParser, notifyAgent);

router.post('/notify-build-result', jsonParser, notifyBuildResult);

module.exports = router;
