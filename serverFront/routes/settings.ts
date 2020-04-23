const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended: false});

const { ConfController } = require('../controllers/settings');
const confController = new ConfController();

router.get('/', confController.getSettings);

router.post('/', jsonParser, confController.setSettings);

router.delete('/', confController.deleteSettings);

export default router;
