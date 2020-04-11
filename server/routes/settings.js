const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cp = require('child_process');
const jsonParser = bodyParser.json({extended: false});

const { Conf } = require('../api/conf/conf');
const conf = new Conf();

const { ConfController } = require('../controllers/settings');
const confController = new ConfController();

router.get('/', confController.getSettings);

router.post('/', jsonParser, confController.setSettings);

router.delete('/', confController.deleteSettings);

module.exports = router;
