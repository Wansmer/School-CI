import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
const jsonParser = bodyParser.json();

import { BuildController } from '../controllers/builds';
const buildController = new BuildController();

router.get<{}, BuildModel[]>('/', buildController.fetchBuildsList);

router.get<{}, 'string'>('/:buildId/logs', buildController.fetchBuildLog);

router.get<{}, BuildModel>('/:buildId', buildController.fetchBuildDetails);

router.post<{}, BuildInfo>('/:commitHash', jsonParser, buildController.sendBuildRequest);

export default router;
