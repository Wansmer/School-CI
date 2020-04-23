import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import { BuildController } from '../controllers/builds';
const buildController = new BuildController();

router.get('/', buildController.fetchBuildsList);

router.get('/:buildId/logs', buildController.fetchBuildLog);

router.get('/:buildId', buildController.fetchBuildDetails);

router.post('/:commitHash', jsonParser, buildController.sendBuildRequest);

export default router;
