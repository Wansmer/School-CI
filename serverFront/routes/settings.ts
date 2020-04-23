import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
const jsonParser = bodyParser.json();

import { ConfController } from '../controllers/settings';
const confController = new ConfController();

router.get<{}, ConfigurationModel>('/', confController.getSettings);

router.post<{}, CodeSuccess, ConfigurationModel>('/', jsonParser, confController.setSettings);

router.delete<{}, CodeSuccess, ConfigurationModel>('/', confController.deleteSettings);

export default router;
