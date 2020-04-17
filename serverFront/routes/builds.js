const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended: false});

const { BuildController } = require('../controllers/builds');
const buildController = new BuildController();

router.get('/', buildController.fetchBuildsList);

router.get('/:buildId/logs', buildController.fetchBuildLog);

router.get('/:buildId', buildController.fetchBuildDetails);

router.post('/:commitHash', jsonParser, buildController.sendBuildRequest);

module.exports = router;
